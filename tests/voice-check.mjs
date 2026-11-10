#!/usr/bin/env node
// Voice reviewer: makes a sample for every preset (and the other-gender voice with --both),
// then checks each file and writes report.md next to the samples.
//
//   node tests/voice-check.mjs --out voice-check            (needs GEMINI_API_KEY)
//   --both         also the other-gender voice of every preset (20 samples)
//   --check-only   re-check the WAV files already in --out, no new TTS requests
// The checker retries HTTP 429/503 with backoff and waits between requests (free-tier limits).
//
// Automatic checks per sample:
//   1. Audio exists, 24 kHz mono, not silent, not clipped, under 1 s of dead air at either end.
//   2. Pace: words per minute within 35 % of the preset's target.
//   3. Words: Gemini transcribes the audio; at least 90 % of the script's words must be heard
//      (letters folded, so a transcript without ə still counts).
//   4. Diction (AI judge, advisory): Gemini listens and scores Azerbaijani announcer diction 1-5
//      and lists words said with a Turkish accent or wrong orthoepy. A score under 4 is a warning.
// The judge is a model, not a person: the owner still listens to every sample before release.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PRESETS, textToWav, voiceFor } from '../scripts/tts.mjs';

// Orthoepy traps: final q/k, long vowels, double consonants, ə/ı/ğ/x, a question.
const SCRIPT =
  'Qonaq gəldi, çörək və duz gətirdi. Saat on ikidə ləzzətli plov yedik. ' +
  'Amma bu sözün mənası dərindir. Ağ dağların başında qış uzun çəkir. ' +
  'Sabah bizə gələcəksən?';
const STT_MODEL = process.env.GEMINI_STT_MODEL || 'gemini-3.8-flash';
const BASE = 'https://generativelanguage.googleapis.com/v1beta/models/';

const fold = (s) => s.toLowerCase()
  .replace(/ə/g, 'e').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
  .replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ç/g, 'c')
  .replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);

function wordRecall(expected, heard) {
  const pool = fold(heard);
  const want = fold(expected);
  let hit = 0;
  for (const w of want) {
    const i = pool.indexOf(w);
    if (i >= 0) { hit++; pool.splice(i, 1); }
  }
  return hit / want.length;
}

function analyse(wav, rate) {
  const pcm = new Int16Array(wav.buffer, wav.byteOffset + 44, (wav.length - 44) / 2);
  const win = Math.round(rate * 0.02);
  const loud = [];
  let peak = 0, sum = 0, clipped = 0;
  for (let i = 0; i < pcm.length; i++) {
    const v = Math.abs(pcm[i]);
    peak = Math.max(peak, v); sum += v * v;
    if (v >= 32700) clipped++;
  }
  for (let i = 0; i + win <= pcm.length; i += win) {
    let s = 0;
    for (let j = i; j < i + win; j++) s += pcm[j] * pcm[j];
    loud.push(Math.sqrt(s / win) > 500);
  }
  const first = loud.indexOf(true), last = loud.lastIndexOf(true);
  return {
    seconds: pcm.length / rate,
    rmsDb: 20 * Math.log10(Math.sqrt(sum / pcm.length) / 32768),
    peakDb: 20 * Math.log10(peak / 32768 || 1e-9),
    clipped,
    leadS: first < 0 ? Infinity : (first * win) / rate,
    tailS: last < 0 ? Infinity : ((loud.length - 1 - last) * win) / rate,
    speechS: first < 0 ? 0 : ((last - first + 1) * win) / rate
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const GAP_MS = Number(process.env.VOICE_CHECK_GAP_MS || 7000);

async function ask(key, wav, prompt) {
  for (let attempt = 0; attempt < 5; attempt++) {
    await sleep(attempt ? GAP_MS * 2 ** attempt : GAP_MS);
    let res;
    try {
      res = await fetch(`${BASE}${STT_MODEL}:generateContent`, {
        signal: AbortSignal.timeout(90000),
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'audio/wav', data: wav.toString('base64') } }] }] })
      });
    } catch (e) { console.error(`STT ${STT_MODEL}: ${e.message}, retry`); continue; }
    if (res.status === 429 || res.status >= 500) { console.error(`STT ${STT_MODEL}: HTTP ${res.status}, retry`); continue; }
    if (!res.ok) { console.error(`STT ${STT_MODEL}: HTTP ${res.status}`); return null; }
    const data = await res.json().catch(() => ({}));
    return data?.candidates?.[0]?.content?.parts?.map((x) => x.text || '').join(' ').trim() || null;
  }
  return null;
}

async function main() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) { console.error('GEMINI_API_KEY yoxdur.'); process.exit(2); }
  const argv = process.argv.slice(2);
  const outDir = argv[argv.indexOf('--out') + 1] && argv.includes('--out') ? argv[argv.indexOf('--out') + 1] : 'voice-check';
  const both = argv.includes('--both');
  const checkOnly = argv.includes('--check-only');
  mkdirSync(outDir, { recursive: true });
  const words = SCRIPT.split(/\s+/).length;
  const rows = [];
  let failed = 0;

  for (const [idStr, p] of Object.entries(PRESETS)) {
    const id = Number(idStr);
    const genders = both ? [p.g, p.g === 'f' ? 'm' : 'f'] : [p.g];
    for (const g of genders) {
      const voice = voiceFor(id, g);
      const file = join(outDir, `${String(id).padStart(2, '0')}-${p.name}-${voice}.wav`);
      const row = { id, name: p.name, label: p.label, voice, file, problems: [], warnings: [] };
      try {
        let r;
        if (checkOnly) {
          if (!existsSync(file)) throw new Error('fayl yoxdur: ' + file);
          const wav = readFileSync(file);
          r = { wav, rate: wav.readUInt32LE(24), models: ['(mövcud fayl)'] };
        } else {
          r = await textToWav(SCRIPT, { id, gender: g, key });
          writeFileSync(file, r.wav);
        }
        row.model = r.models.join(',');
        const a = analyse(r.wav, r.rate);
        Object.assign(row, a);
        if (a.speechS < 2) row.problems.push('səs demək olar ki yoxdur');
        if (a.clipped > 50) row.problems.push(`kəsilmə (clipping) ${a.clipped} nümunə`);
        if (a.leadS > 1 || a.tailS > 1.5) row.warnings.push(`əvvəl/sonda sükut ${a.leadS.toFixed(1)}/${a.tailS.toFixed(1)} s`);
        row.wpm = (words / a.speechS) * 60;
        const dev = Math.abs(row.wpm - p.wpm) / p.wpm;
        if (dev > 0.35) row.problems.push(`temp ${Math.round(row.wpm)} söz/dəq, hədəf ${p.wpm}`);
        else if (dev > 0.2) row.warnings.push(`temp ${Math.round(row.wpm)} söz/dəq, hədəf ${p.wpm}`);

        const heard = await ask(key, r.wav, 'Transcribe this Azerbaijani speech verbatim in Azerbaijani Latin script. Write numbers as words. Output only the transcript.');
        row.transcript = heard || '';
        row.recall = heard ? wordRecall(SCRIPT, heard) : null;
        if (row.recall === null) row.warnings.push('transkripsiya alınmadı');
        else if (row.recall < 0.9) row.problems.push(`sözlərin ${Math.round(row.recall * 100)}%-i eşidildi`);
        if (heard && fold(heard).length > words * 1.25) row.problems.push(`artıq söz oxundu: ${fold(heard).length} söz, mətndə ${words}`);

        const judge = await ask(key, r.wav,
          'You are a strict Azerbaijani radio announcer coach. Listen to this Azerbaijani recording. ' +
          'Reply in JSON only: {"diction": 1-5, "natural": 1-5, "turkish_accent": true|false, "bad_words": ["word: problem"]}. ' +
          'Diction follows standard Azerbaijani orthoepy (final q close to [x], soft final k, long double consonants, ə not e).');
        try {
          const j = JSON.parse((judge || '').replace(/^[^{]*/, '').replace(/[^}]*$/, ''));
          row.judge = j;
          if (j.diction < 4) row.warnings.push(`diksiya ${j.diction}/5`);
          if (j.natural < 4) row.warnings.push(`təbiilik ${j.natural}/5`);
          if (j.turkish_accent) row.warnings.push('türk aksenti eşidilir');
        } catch { row.warnings.push('AI rəyi oxunmadı'); }
      } catch (e) {
        row.problems.push(e.message);
      }
      if (row.problems.length) failed++;
      rows.push(row);
      console.log(`${row.problems.length ? 'XƏTA ' : row.warnings.length ? 'DİQQƏT' : 'OK   '} ${id} ${p.name} (${voice}) ${[...row.problems, ...row.warnings].join('; ')}`);
    }
  }

  const md = [
    '# Səs yoxlaması', '',
    `Mətn: "${SCRIPT}"`, '',
    '| # | Ad | Səs | Model | Saniyə | Söz/dəq (hədəf) | Eşidilən sözlər | Diksiya / təbiilik (AI) | Nəticə |',
    '|---|---|---|---|---|---|---|---|---|',
    ...rows.map((r) => `| ${r.id} | ${r.name} (${r.label}) | ${r.voice} | ${r.model || '-'} | ${r.seconds ? r.seconds.toFixed(1) : '-'} | ${r.wpm ? Math.round(r.wpm) : '-'} (${PRESETS[r.id].wpm}) | ${r.recall != null ? Math.round(r.recall * 100) + '%' : '-'} | ${r.judge ? `${r.judge.diction}/5, ${r.judge.natural}/5` : '-'} | ${r.problems.length ? 'XƏTA: ' + r.problems.join('; ') : r.warnings.length ? 'Diqqət: ' + r.warnings.join('; ') : 'OK'} |`),
    '', '## Səhv tələffüz olunan sözlər (AI rəyi)', '',
    ...rows.filter((r) => r.judge?.bad_words?.length).map((r) => `- ${r.id} ${r.name}: ${r.judge.bad_words.join('; ')}`),
    '', '## Transkripsiyalar', '',
    ...rows.map((r) => `- ${r.id} ${r.name}: ${r.transcript || '-'}`),
    '', 'AI rəyi köməkçidir: buraxılışdan əvvəl hər nümunəni insan qulağı ilə dinləyin.'
  ].join('\n');
  writeFileSync(join(outDir, 'report.md'), md);
  console.log(`\n${rows.length - failed}/${rows.length} keçdi. Hesabat: ${join(outDir, 'report.md')}`);
  process.exit(failed ? 1 : 0);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
