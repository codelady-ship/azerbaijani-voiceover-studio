#!/usr/bin/env node
// Azerbaijani Voiceover Studio: text -> audio file (WAV, or MP3 when ffmpeg is on PATH).
//
// Engine: Gemini TTS (Google AI Studio API, free tier). No dependencies, Node 18+.
// Key: GEMINI_API_KEY from the environment (or --key-file <path>). Never printed.
//
//   node scripts/tts.mjs --preset 1 --text "Salam, necəsən?" --out salam.wav
//   node scripts/tts.mjs --preset 7 --gender f --file metn.txt --out xeber.mp3
//   node scripts/tts.mjs --list
//
// The text should already be TTS-ready (SKILL.md: digits as words, ə/ş/ç restored).
// Long texts are split at sentence ends into chunks under --chunk characters and joined
// with a short pause, all in the same voice and style line.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { extname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Announcer-grade diction for every preset (orthoepy norms, Cabinet decision 175, 2021).
export const DICTION =
  'Speak Azerbaijani with a native Baku accent and professional announcer diction, never a Turkish accent. ' +
  'Follow standard Azerbaijani orthoepy: pronounce ə, ı, ö, ü, ğ, q and x the Azerbaijani way; ' +
  'word-final q sounds close to [x] (qonaq as qonax) and word-final k is soft (çörək); ' +
  'keep double consonants long (amma, ləzzət) and the long vowels of loanwords (saat, məna); ' +
  'stress mostly the last syllable. Every word clear and complete, no swallowed endings. ' +
  'Natural and human, like a real speaker, not like reading aloud.';

// Ids, names, gender and voices follow SKILL.md "Voice presets" and templates/voice-presets.md.
export const PRESETS = {
  1: { name: 'Aysel', label: 'səmimi bələdçi', g: 'f', voice: 'Sulafat', alt: 'Achird', wpm: 114,
    style: 'Warm, confident, friendly explainer with a slight smile. Brisk but clear. Short pause after commas, clear pause after each sentence. Yes/no questions rise at the end; wh-questions stress the question word. Short commands are firm and falling.' },
  2: { name: 'Lalə', label: 'enerjili Reel', g: 'f', voice: 'Laomedeia', alt: 'Puck', wpm: 138,
    style: 'Very energetic, upbeat young Reel host with a big smile. Fast, punchy short sentences, excited emphasis on numbers and offers, quick pauses.' },
  3: { name: 'Elvin', label: 'sakit müəllim', g: 'm', voice: 'Sadaltager', alt: 'Vindemiatrix', wpm: 96,
    style: 'Calm, patient, friendly teacher. Moderate pace, very clear articulation, longer pause between steps, gentle stress on key terms.' },
  4: { name: 'Nərmin', label: 'yumşaq lifestyle', g: 'f', voice: 'Despina', alt: 'Umbriel', wpm: 102,
    style: 'Soft, cosy, intimate lifestyle voice, as if close to the microphone. Relaxed pace, gentle pauses, warm and dreamy.' },
  5: { name: 'Günay', label: 'zərif lüks reklam', g: 'f', voice: 'Gacrux', alt: 'Algieba', wpm: 90,
    style: 'Elegant, sophisticated luxury-ad voice. Slow, controlled, long pauses between short phrases, calm confidence, refined and smooth.' },
  6: { name: 'Ayla', label: 'nağıl səsləndirmə', g: 'f', voice: 'Vindemiatrix', alt: 'Charon', wpm: 85,
    style: 'Warm, wise storyteller. Slow pace, rich gentle voice, long pauses before important moments, gentle emotion, like telling a tale to children.' },
  7: { name: 'Tural', label: 'xəbər diktoru', g: 'm', voice: 'Charon', alt: 'Kore', wpm: 114,
    style: 'Professional news anchor. Neutral, authoritative, crisp diction, steady pace, even intonation, clear stress on numbers and names.' },
  8: { name: 'Orxan', label: 'premium brend', g: 'm', voice: 'Algieba', alt: 'Achernar', wpm: 90,
    style: 'Deep, resonant premium brand voice. Slow, confident pace, weighty pauses between short phrases, calm power.' },
  9: { name: 'Rauf', label: 'motivasiya', g: 'm', voice: 'Orus', alt: 'Leda', wpm: 120,
    style: 'Passionate motivational speaker. Starts calm and builds energy, strong emphasis on key words, a short dramatic pause before the final line.' },
  10: { name: 'Ceyhun', label: 'zarafatcıl vloq', g: 'm', voice: 'Puck', alt: 'Autonoe', wpm: 145,
    style: 'Playful, funny young vlogger, casual and colloquial. Fast, lively ups and downs, a short comic pause before the punchline.' }
};

const MODELS = (process.env.GEMINI_TTS_MODELS ||
  'gemini-3.8-flash-tts,gemini-3.8-flash-lite-tts,gemini-3.1-flash-tts-preview,gemini-2.5-pro-preview-tts,gemini-2.5-flash-preview-tts')
  .split(',').map((s) => s.trim()).filter(Boolean);
const BASE = 'https://generativelanguage.googleapis.com/v1beta/models/';

export function styleLine(id, { speed = 1, emphasis = [] } = {}) {
  const p = PRESETS[id];
  let s = `${DICTION} ${p.style} Pace about ${Math.round(p.wpm * speed)} words per minute.`;
  if (emphasis.length) s += ` Emphasise: ${emphasis.slice(0, 6).join(', ')}.`;
  return s;
}

/** Voice for a preset; the other gender keeps the preset's style and switches the voice. */
export function voiceFor(id, gender) {
  const p = PRESETS[id];
  return !gender || gender === p.g ? p.voice : p.alt;
}

/** Split at sentence ends into chunks of at most `max` characters. */
export function chunk(text, max = 1800) {
  const sentences = text.replace(/\s+/g, ' ').trim().match(/[^.!?…]+[.!?…]*\s*/g) || [];
  const out = [];
  let cur = '';
  for (const s of sentences) {
    if (cur && (cur + s).length > max) { out.push(cur.trim()); cur = ''; }
    cur += s;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

async function post(model, key, body) {
  return fetch(`${BASE}${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify(body)
  });
}

/**
 * Gemini TTS prompt: notes and transcript in separate sections, so the model speaks only the
 * transcript. (A plain style line in front of the text was sometimes read aloud.)
 */
export function prompt(text, id, opts = {}) {
  return [
    'Synthesize speech for the TRANSCRIPT section only. Never read the notes aloud. ' +
      'Read the transcript exactly once, from the first word to the last, then stop. Do not repeat any part of it.',
    '',
    "### DIRECTOR'S NOTES",
    styleLine(id, opts),
    '',
    '### TRANSCRIPT',
    text
  ].join('\n');
}

/** Expected length in seconds for a text at the preset's pace. */
export function expectedSeconds(text, id, speed = 1) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return (words / (PRESETS[id].wpm * speed)) * 60;
}

/**
 * One chunk -> { pcm: Buffer (16-bit LE mono), rate, model }.
 * Guard: audio far longer than the text needs means the engine spoke extra words; retry, then fail.
 */
export async function synthesize(text, opts) {
  // A repeated read doubles the length; normal slow delivery stays well under 1.6x.
  const limit = expectedSeconds(text, opts.id, opts.speed || 1) * 1.6 + 2;
  let last;
  for (let attempt = 0; attempt < 3; attempt++) {
    last = await synthesizeOnce(text, opts);
    const seconds = last.pcm.length / 2 / last.rate;
    if (seconds <= limit) return last;
    if (opts.onRetry) opts.onRetry(seconds, limit);
  }
  throw new Error(`Audio is ${Math.round(last.pcm.length / 2 / last.rate)} s, expected under ${Math.round(limit)} s: the engine read extra text. Try again or use another preset.`);
}

async function synthesizeOnce(text, { id, gender, key, speed, emphasis, models = MODELS }) {
  const body = {
    contents: [{ parts: [{ text: prompt(text, id, { speed, emphasis }) }] }],
    generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceFor(id, gender) } } } }
  };
  const errors = [];
  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const res = await post(model, key, body);
      if (res.ok) {
        const data = await res.json();
        const part = data?.candidates?.[0]?.content?.parts?.find((x) => x.inlineData);
        if (!part) { errors.push(`${model}: no audio in response`); break; }
        const mime = part.inlineData.mimeType || '';
        const raw = Buffer.from(part.inlineData.data, 'base64');
        if (/wav/i.test(mime)) return { ...wavToPcm(raw), model };
        const rate = Number((/rate=(\d+)/.exec(mime) || [])[1] || 24000);
        return { pcm: raw.subarray(0, raw.length - (raw.length % 2)), rate, model };
      }
      const status = res.status;
      await res.text().catch(() => '');
      errors.push(`${model}: HTTP ${status}`);
      if (status === 400 || status === 401 || status === 403) {
        if (status !== 400) throw new Error(`Gemini refused the key (HTTP ${status}). Check GEMINI_API_KEY.`);
        break;
      }
      if (status === 404) break;
      if (status === 429 || status >= 500) { await new Promise((r) => setTimeout(r, 2000 * (attempt + 1))); continue; }
      break;
    }
  }
  throw new Error(`No audio from Gemini. Tried: ${errors.join('; ')}. On HTTP 429 the free daily limit is used up: try again tomorrow or later today.`);
}

function wavToPcm(buf) {
  let off = 12, rate = buf.readUInt32LE(24);
  while (off < buf.length - 8) {
    const id = buf.toString('ascii', off, off + 4), size = buf.readUInt32LE(off + 4);
    if (id === 'data') return { pcm: buf.subarray(off + 8, off + 8 + size), rate };
    off += 8 + size;
  }
  throw new Error('WAV without data chunk');
}

export function pcmToWav(pcm, rate) {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVE', 8);
  h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(rate, 24); h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

/** Full text -> WAV buffer, chunked and joined with `gapMs` of silence. */
export async function textToWav(text, opts) {
  const parts = chunk(text, opts.chunk || 1800);
  const pcms = [];
  let rate = 24000;
  const used = new Set();
  for (const [i, c] of parts.entries()) {
    const r = await synthesize(c, opts);
    rate = r.rate; used.add(r.model);
    if (i) pcms.push(Buffer.alloc(Math.round((rate * (opts.gapMs ?? 350)) / 1000) * 2));
    pcms.push(r.pcm);
    if (opts.onChunk) opts.onChunk(i + 1, parts.length, r.model);
  }
  return { wav: pcmToWav(Buffer.concat(pcms), rate), rate, chunks: parts.length, models: [...used] };
}

function args(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (!k.startsWith('--')) continue;
    const name = k.slice(2);
    const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    a[name] = v;
  }
  return a;
}

async function main() {
  const a = args(process.argv.slice(2));
  if (a.list) {
    for (const [id, p] of Object.entries(PRESETS)) console.log(`${id}. ${p.name} (${p.label}) ${p.g === 'f' ? 'qadın' : 'kişi'} · Gemini ${p.voice}, digər cins: ${p.alt}`);
    console.log('Adlar uydurma üslub adlarıdır, real insanların səsi deyil.');
    return;
  }
  const id = Number(a.preset || 1);
  if (!PRESETS[id]) throw new Error('--preset 1-10 olmalıdır');
  const text = a.file ? readFileSync(a.file, 'utf8') : typeof a.text === 'string' ? a.text : '';
  if (!text.trim()) throw new Error('Mətn yoxdur: --text "..." və ya --file metn.txt');
  if (/\d/.test(text)) console.error('Xəbərdarlıq: mətndə rəqəm var. Əvvəlcə rəqəmləri sözlə yazın (SKILL.md, Normalisation).');
  const key = a['key-file'] ? readFileSync(a['key-file'], 'utf8').trim() : process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY yoxdur. Pulsuz açar: https://aistudio.google.com/apikey (README, "Səs faylı").');
  const out = a.out || `seslendirme-${id}.wav`;
  const gender = a.gender === 'f' || a.gender === 'm' ? a.gender : undefined;
  const r = await textToWav(text, {
    id, gender, key,
    speed: a.speed ? Number(a.speed) : 1,
    emphasis: typeof a.emphasis === 'string' ? a.emphasis.split(',').map((s) => s.trim()) : [],
    onChunk: (i, n, m) => console.error(`hissə ${i}/${n} hazırdır (${m})`),
    onRetry: (sec, lim) => console.error(`səs çox uzundur (${Math.round(sec)} s, gözlənilən ${Math.round(lim)} s-dən az), yenidən cəhd`)
  });
  const wavPath = extname(out).toLowerCase() === '.mp3' ? out.replace(/\.mp3$/i, '.wav') : out;
  writeFileSync(wavPath, r.wav);
  let final = wavPath;
  if (extname(out).toLowerCase() === '.mp3') {
    const ff = spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', wavPath, '-codec:a', 'libmp3lame', '-b:a', '192k', out]);
    if (ff.status === 0 && existsSync(out)) final = out;
    else console.error('ffmpeg tapılmadı və ya xəta verdi: WAV saxlanıldı.');
  }
  const seconds = (r.wav.length - 44) / 2 / r.rate;
  const p = PRESETS[id];
  console.log(JSON.stringify({ file: final, seconds: Math.round(seconds * 10) / 10, preset: `${id} ${p.name} (${p.label})`, voice: voiceFor(id, gender), chunks: r.chunks, models: r.models }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((e) => { console.error(e.message); process.exit(1); });
}
