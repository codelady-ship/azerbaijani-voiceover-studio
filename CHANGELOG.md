# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [1.1.0] - 2026-11-10

### Added
- **Plan compatibility** section. Works on the Free plan with no web search or scheduling. Lite path on tight limits: one engine block and one chunk per message.
- Evals PC-1 to PC-3 and VO-15.

### Fixed
- Acronym letter names: notes that the official names are fe, ke, se (F, K, S), while speakers often say ef, ka, es. Doubtful forms are marked `?`.

## [1.0.0] - 2026-11-09

Research-driven features. See `docs/research.md`.

### Added
- **Azerbaijani normalisation:**
  - cardinals; ordinals with vowel harmony; case suffixes moved from digits to words
  - decimals; percent as *faiz*
  - money: manat/qəpik and foreign currencies
  - dates, time and phone-number groups
  - units, weekday and other abbreviations; acronyms read as a word or spelled with letter names
  - brand respelling; emoji, symbol and link handling
- **Letter restoration:**
  - covers ASCII, Turkish-keyboard and Russian-keyboard typing, plus Cyrillic → Latin
  - a mandatory changes list, with `?` for doubtful words; names are never changed silently
  - Turkish text detected, and a translation offered
- **Measured default style (Codelady/Nora):**
  - measured from the reference Reel with ffmpeg: 1.9 words/s, pauses 0.4 s at sentence ends and 0.17 s at commas, rising hook question, −17.3 LUFS
  - describes delivery only, no cloning
- **10 original voice presets** (5 female, 5 male) in `templates/voice-presets.md`. Each preset has:
  - age feel, pace, pauses, pitch/energy and intonation
  - a Gemini style prompt, ElevenLabs tags with a stock voice, and Azure prosody values
  - a sample line
- **Engine blocks** with 3 phone steps each:
  - Gemini TTS (AI Studio)
  - ElevenLabs v3
  - Azure SSML (Banu/Babek), tuned against robotic sound
  - Narakeet as the no-account fallback
- **Per-engine free limits and commercial-use rules**, checked 2026-11-09.
- **Timing:**
  - Reel word budgets (seconds × words/s)
  - cut versions and scene timings
  - long texts split into chunks under each engine's limit
- **Listening checklist** with a fix for each problem (`templates/quality-checklist.md`).
- **Special requests:**
  - "send MP3": the skill can't make audio, so it gives the steps
  - celebrity or blogger voice: refused, with the closest preset or consented own-voice cloning offered instead
  - Azure "robotic": tuned SSML
  - AI disclosure line for social, ad and client use
- **Orthoepy and lively speech** (`templates/orthoepy-and-liveliness.md`, SKILL.md section), sourced from the official 2021 *orfoepiya normaları*: stress and unstressed suffixes, yes/no vs wh-question intonation, final q/k, double consonants, long vowels, assimilations; rhythm and per-engine liveliness techniques; unverified items marked.
- `examples/`: 30 s Reel with numbers (female), café ad typed without diacritics (male, commercial), Cyrillic lesson split into chunks.
- `docs/research.md`, `tests/evals.md` (21 cases), `README.md` in English with an Azerbaijani section.

### Fixed (blind evals, run 1)
- Paste blocks contain only engine input; the steps sit outside the block, so no URL or digits get pasted into the TTS box.
- Colons and labels are removed from the TTS text, and a final self-check scans for digits, symbols and emoji.
- When both voices are requested: one block per voice, each with its own style line.
- A budget line with calm and energetic ranges is always printed; scene timings no longer count pauses twice.
- Complaints about k or q state both norms.
- Clarified: default preset by purpose, reply language for text-only messages, names kept and flagged, when the commercial line is required, the colon after the style line.

### Fixed (blind evals, runs 2–4)
- Long sentences are split only at an existing comma or conjunction. No words are added or dropped, and suffixes are kept.
- k/q pronunciation complaints always get the full fix ladder: voice/engine → Azure phoneme → respell one word as a last resort.
- Answers with no text show a labelled sample instead of an invented voiceover; partial long texts are prepared as chunk 1 and the rest is requested.
- Clarified: default preset by purpose (including Reels); the closest preset for a clone request is chosen by the user's own genre; the Gemini voice list is completed; commercial-line triggers are aligned; the disclosure is written in the audience's language.
- Blind eval result: 21/21 (run 5, fresh executor reading only SKILL.md, separate grader).

## [0.1.0] - 2026-11-09

### Added
- Scaffold: `SKILL.md` (basic normalisation, voice choice, one engine block), MIT license, `scripts/build-agensi-zip.ps1`.
