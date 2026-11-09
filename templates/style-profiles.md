# Style profiles

A style profile **describes** how a voiceover should be delivered (pace, pauses, melody, energy). It is not a voice clone: use it with any voice the engine offers.

## Default: Codelady / Nora (measured)

Measured on 2026-11-09 from a 19.7 s Azerbaijani promo Reel line (37 words, ≈ 88 syllables), using ffmpeg (`silencedetect` at −35/−40 dB, `ebur128`) and an autocorrelation pitch estimate. The reference voice is a synthetic library preset; only its delivery is described here, never copied.

| Feature | Value | What it means |
|---|---|---|
| Pace (incl. pauses) | **1.9 words/s** (≈ 114 words/min), 4.5 syllables/s, ≈ 13 characters/s | Brisk but clear |
| Articulation (speech only) | 2.3 words/s, ≈ 5.3 syllables/s | Words are not stretched; the pauses do the work |
| Sentence-end pause | **0.36–0.44 s** (mean 0.40 s) | Clear full stops |
| Comma / list pause | **0.11–0.20 s** (mean 0.17 s) | Light, keeps momentum |
| Breath inside a long sentence | ≈ 0.19 s at the clause boundary (after ≈ 5 words) | Long hooks are split into two breath groups |
| Call to action | Key word framed by ≈ 0.16 s micro-pauses ("Şərhə · SCAM · yaz.") | The CTA word stands out |
| Pitch range | median ≈ 190 Hz, p10–p90 ≈ 125–265 Hz (about one octave) | Expressive, not monotone |
| Statement melody | Starts high (≈ 220–290 Hz), falls to ≈ 120 Hz at the full stop | Confident, finished sentences |
| Yes/no question | Low before the end, then a **rise on the final syllable** (≈ 117 → 160 Hz, ≈ +5 semitones) | Hook sounds like a real question |
| One-word command ("Dayan.") | Short, falling (≈ 180 → 125 Hz), followed by 0.4 s | Firm stop |
| Loudness | −17.3 LUFS integrated, LRA 3.4 LU, true peak −1.3 dBFS | Steady, compressed, social-ready |
| Overall feel | Warm, confident, friendly explainer with a slight smile; punchy short sentences | — |

Pitch figures are estimates (± octave errors are possible); pace, pauses and loudness are direct measurements.

**Style line (paste into the engine):**
> Read in Azerbaijani with a native Baku accent. Warm, confident, friendly explainer with a slight smile. Brisk but clear pace, about 110–115 words per minute. Short pause after commas, a clear pause after each sentence. Yes/no questions rise at the end; wh-questions stress the question word. Short commands are firm and falling. Slow down slightly and stress the call-to-action word.

**Word budget:** seconds × 1.9 = words (15 s ≈ 28, 20 s ≈ 38, 30 s ≈ 57, 45 s ≈ 85, 60 s ≈ 114). Keep 0.5 s free at the start and end.

## Other tones

| Tone (AZ) | Words/s | Sentence pause | Style line core |
|---|---|---|---|
| Reklam (ad) | 2.0–2.2 | 0.3 s | Energetic, bright, persuasive; stress the offer and the price |
| Enerjili Reel | 2.2–2.4 | 0.25 s | Fast, upbeat, excited; punchy hook |
| Xəbər (news) | 1.8–2.0 | 0.4 s | Neutral, clear, authoritative; even melody |
| Sakit izah (calm explainer / lesson) | 1.5–1.7 | 0.5–0.6 s | Calm, patient, friendly teacher; clear endings |
| Nağıl (story / tale) | 1.3–1.6 | 0.6–0.8 s | Gentle, warm, storyteller; vary emotion by character |

These other tones are starting points (not measured). For 10 ready presets (5 female, 5 male) with engine prompts, see `voice-presets.md`.

**Age feel:** gənc (young, 20–30: brighter, faster), orta yaş (30–45: warm, steady), yaşlı (50+: slower, deeper, calm). Pick a voice whose description matches and add the age to the style line.
