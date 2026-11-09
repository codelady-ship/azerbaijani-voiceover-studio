# Azerbaijani Voiceover Studio

> Write Azerbaijani text and get a voiceover script that free text-to-speech engines read naturally, with male and female voices, correct ç ş ə ğ ı ö ü, and no robotic number reading.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Claude Skill](https://img.shields.io/badge/Claude-Skill-D97757.svg)](SKILL.md)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](CHANGELOG.md)
[![Price: Free](https://img.shields.io/badge/price-free-brightgreen.svg)](#pricing)

> **Compatibility:** works in any agent that reads `SKILL.md`. No web access or code execution needed. The skill does **not** create audio. It prepares the text and settings, and you generate the audio for free in Google AI Studio, ElevenLabs or Azure.

---

## Why it exists

Most "robotic" Azerbaijani AI voiceovers are caused by the **text**, not the voice:

- **Digits and symbols:** "24 saat", "$150", "30%", "18:30" and phone numbers get read in the wrong language or format.
- **Missing letters:** people type on Russian or Turkish keyboards ("men", "cox", "sexs"). The engine then says *e* for *ə* and *s* for *ş*.
- **Old script and foreign spellings:** Cyrillic text, English brand names and emoji confuse the engine.
- **Few engines read Azerbaijani at all:**
  - ElevenLabs only on v3/v4.
  - Gemini TTS in preview.
  - Azure with just two voices.
  - Turkish voices give a Turkish accent.
- **Free tiers hide their commercial rules:** ElevenLabs Free, for example, can't be used for client ads.

No existing voiceover skill handles Azerbaijani. The ones on skill marketplaces are English-centric.

## Features

- **Azerbaijani normalisation.** Numbers, ordinals (with vowel harmony), dates, time, money (manat/qəpik, $, €), percent (*faiz*), decimals, phone numbers, units, abbreviations and acronyms all become words. Brands are respelled (iPhone → Ayfon) and emoji removed.
- **Letter restoration.** Text typed without ə ş ç ğ ı ö ü, typed on a Turkish keyboard, or written in Cyrillic is converted to correct Latin Azerbaijani. A **list of every change** is included, and doubtful words (especially names) are marked `?`.
- **10 original voice presets (5 female, 5 male).** They cover warm explainer, energetic Reel host, calm teacher, soft lifestyle, luxury ad, storyteller, news anchor, deep brand voice, motivational speaker and humorous vlogger. Each one has a Gemini style prompt, ElevenLabs tags with a suggested stock voice, and Azure prosody values.
- **Measured default style.** Preset 1 is measured from a real Reel voiceover:
  - pace of 1.9 words/s
  - 0.4 s sentence pauses and 0.17 s comma pauses
  - a rising hook question
  - −17 LUFS loudness

  It describes the delivery. It does not clone the voice.
- **Ready-to-paste blocks** for the best free engines, each with 3 phone-friendly steps:
  - Gemini TTS (Google AI Studio)
  - ElevenLabs v3
  - Azure SSML (az-AZ-BanuNeural / BabekNeural)
- **Reel timing.** A word budget for 15, 30 or 60 seconds, a cut version if your script is too long, and scene timings per line.
- **Long texts** are split into chunks under each engine's limit, with a duration for every chunk.
- **Orthoepy-aware.** Stress, question intonation and correct readings (final q/k, long vowels, double consonants) follow the official 2021 Azerbaijani orthoepy norms, with tips per engine to make the voice sound lively.
- **Listening checklist** with a fix for each problem: ə/e, ı/i, q/k, x/h, wrong stress, misread brands, unnatural pauses, flat questions, pace, loudness.
- **Honest rules.**
  - It says which free tiers forbid commercial use.
  - It refuses to clone real people's voices without consent.
  - It adds an AI-voice disclosure line for social posts.
- **Phone mode** answers in your language, Azerbaijani by default.

## What it never does

- **Never claims to make audio.** You generate the MP3 yourself, for free.
- **Never clones or imitates a real person's voice** (celebrity, blogger, client) without consent. It offers the closest preset, or legal cloning of your own voice.
- **Never says a free tier allows commercial use** unless that engine's terms do.

## Example

**Input:** `Kafemiz ucun reklam: "Cay + 2 qutab cemi 4,50 AZN. Sifaris: 055 987 65 43"`

**Output (shortened):**

```text
Çay və iki qutab, cəmi dörd manat əlli qəpik. Sifariş: sıfır əlli beş, doqquz yüz səksən yeddi, altmış beş, qırx üç.
```

Changes: Cay → Çay · cemi → cəmi · + → və · 4,50 AZN → dörd manat əlli qəpik · Sifaris → Sifariş. The output then gives a Gemini block (voice Puck/Charon), an Azure SSML block, the commercial-use note and the AI disclosure line. See [`examples/`](examples/) for three full worked examples.

## Pricing

**Free, and it will stay free.** It's a standalone skill with no paid tier, no gated features and no checkout link. It's for video makers, SMM specialists, teachers, small businesses and anyone in Azerbaijan who needs a voiceover.

Issues and pull requests are welcome, especially new abbreviations, pronunciation fixes and engine updates.

## Installation

### Claude Code

```bash
git clone https://github.com/codelady-ship/azerbaijani-voiceover-studio.git
cp -r azerbaijani-voiceover-studio ~/.claude/skills/azerbaijani-voiceover-studio
```

### Claude app (web, desktop, iOS, Android): works on the Free plan

Per Anthropic's help centre (checked 2026-11-09): "Skills are available for users on Free, Pro, Max, Ultra, Team, and Enterprise plans" and they require code execution to be on ([support.claude.com/en/articles/12512198](https://support.claude.com/en/articles/12512198)). Claude Code needs a paid subscription or an API/Console account.

1. Turn on **Code execution** under **Settings > Capabilities** (skills need it).
2. On this GitHub page, tap **Code → Download ZIP**. The ZIP must contain the skill folder at its root, with `SKILL.md` inside it. Maintainers can build the clean package with `./scripts/build-agensi-zip.ps1`.
3. Go to **Customize > Skills**, click **+**, choose **Upload a skill**, and upload the zip.
4. Turn the skill on and start a chat: "Bu mətni səsləndirməyə hazırla: …"

### Other agents

`SKILL.md` is plain Markdown with YAML front matter. Any agent that reads skill files or accepts a system prompt can use it.

### Packaging for Agensi

```powershell
./scripts/build-agensi-zip.ps1
```

This writes `dist/azerbaijani-voiceover-studio.zip`, which contains only `SKILL.md`, `templates/`, `examples/` and `CHANGELOG.md`.

## Repository layout

| Path | Purpose |
|---|---|
| `SKILL.md` | The skill |
| `templates/` | Voice presets, orthoepy and liveliness rules, normalisation cheat sheet, engine blocks, style profiles, split template, listening checklist |
| `examples/` | Three worked examples in Azerbaijani |
| `docs/research.md` | Customer problems, competitors, engines, measurement |
| `tests/evals.md` | 21 eval cases |
| `scripts/build-agensi-zip.ps1` | Builds the upload package |

## Limitations

- Engine limits and terms change. They were checked on 2026-11-09, so re-check them before commercial use.
- Gemini's Azerbaijani support is marked preview, and its free daily limit is unpublished.
- Which ElevenLabs stock voices sound best in Azerbaijani varies, so test 2–3.
- Normalisation follows standard literary Azerbaijani. Regional or colloquial forms are kept only when you write them.
- Not a substitute for a professional voice actor on high-stakes work.

---

## Azərbaycanca

**Azerbaijani Voiceover Studio** pulsuz Claude skill-idir. Azərbaycanca mətnini yazırsan, o da onu süni intellekt səsinin təbii oxuyacağı formaya salır.

- **Mətnin düzəldilməsi:** rəqəmləri, tarixləri, pulu, faizi, saatı və telefon nömrələrini sözlə yazır.
- **Hərflərin bərpası:** ə ş ç ğ ı ö ü olmadan və ya kirillə yazılmış mətni düzəldir və nəyi dəyişdiyini göstərir.
- **10 hazır səs stili:** 5 qadın və 5 kişi. Heç biri real insanın səsi deyil.
- **Hazır bloklar:** Google AI Studio (Gemini), ElevenLabs və Azure üçün kopyala-yapışdır bloku, 3 addımlıq təlimatla.
- **Reel vaxtı:** 15, 30 və 60 saniyəlik Reel üçün söz limiti və səhnə vaxtları verir.
- **Dinləmə siyahısı:** səsi yoxlamaq üçün siyahı və hər problemin həlli.
- **Kommersiya qaydaları:** pulsuz planın reklamda istifadəyə icazə verib-vermədiyini açıq deyir.

Skill səs faylı yaratmır. Səsi sən 1 dəqiqəyə pulsuz yaradırsan. Real insanın (məşhurun, blogerin) səsini icazəsiz kopyalamır.

**Başlamaq üçün:** "Bu mətni qadın səsi ilə 30 saniyəlik Reel üçün hazırla: …"

## License

MIT, see [LICENSE](LICENSE).
