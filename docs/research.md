# Research summary

Condensed copy of the project research (2026-11-09). Must-have features map to `SKILL.md` sections and to `tests/evals.md` cases VO-1 to VO-21.

Researched 2026-11-09 (web research, official pages where possible, plus ffmpeg measurement of our own reference file). Nothing was signed up for, bought or published. **[unverified]** marks claims without an official or first-hand source.

## 1. Customer problems

Who has the problem: Azerbaijani Reels/TikTok creators, SMM managers, small businesses (cafés, salons, shops), teachers and course makers, and students doing presentations.

- **Few engines read Azerbaijani at all, and each has caveats.**
  - ElevenLabs supports it only on Eleven v3 and v4. Multilingual v2 and Flash don't, and those are the defaults many tutorials use.
  - Gemini-TTS lists az-AZ as "Preview".
  - Azure has exactly **two** voices (Banu F, Babek M). The owner found Banu "robotic".
  - Narakeet has two voices, Latin script only.
  - Turkish voices (XTTS, Chatterbox, CapCut-style voices) give a Turkish accent: ə, ı, q and x come out wrong. We found no CapCut page listing Azerbaijani **[unverified that it's absent]**.
- **The text is the main cause of "robotic" output.**
  - Digits are read in the wrong language or format. There's an analogous Turkish case where "3+1" was read in English because an English-centric normaliser overrode the locale (Vapi community). Microsoft documents dates read in the wrong order without a format hint.
  - Emoji and symbols get read aloud or skipped.
  - English brand spellings are read letter-by-letter in Azerbaijani.
- **Missing Azerbaijani letters.** People type on Russian or Turkish keyboards, or in plain ASCII (e for ə, s/sh for ş, c/ch for ç).
  - Academic papers confirm several competing transliteration variants online and no standard ASCII mapping for "ə" (ict.az conference paper).
  - A 2025 *Filologiya məsələləri* paper names breaches of literary-language norms on social media as a main current problem.
  - Older users and Russian-sector schools still write in Cyrillic.
  - When ə is typed as e, every engine pronounces e, which changes the sound and sometimes the word.
- **Known engine bugs:** Microsoft Q&A reports that az-AZ-BabekNeural sometimes says s/q for ş/ğ.
- **Few male voices:** Azure has one; Gemini voices are multilingual, not Azerbaijani-specific.
- **Cost:** voice actors in Baku advertise "Peşəkar səsləndirmə" at "razılaşma yolu ilə" (price on request, lalafo). No published per-minute price was found **[unverified]**. Paid AI plans need a foreign card, which many local users don't have.
- **Commercial confusion:** ElevenLabs Free looks free but is non-commercial with required attribution. People still use it for client ads.
- **Direct complaint threads** (Reddit, forums) about robotic Azerbaijani TTS: none found. Azerbaijani TTS research (ICNLSP 2024) names "not robotic" as its main goal, which implies the pain exists **[weak evidence]**.

## 2. Competitors and gaps

| Product | What it does | What it lacks for Azerbaijani |
|---|---|---|
| Agensi "AI Voiceover Studio – script to MP3, 32 languages" ($5) | Script to MP3; engine not named | No normalisation, no diacritics, languages not listed. **Name is similar to ours**, so differentiate with "Azerbaijani" in the name |
| Agensi "AI Voiceover Scripter" ($5) | Phonetic guides, breath marks, pacing for ElevenLabs/Play.ht | No AZ, no number rules, no word budgets, no QA checklist |
| skills.sh phrazzld "voiceover", clawic-speak, tts-script-writer, document-to-narration, eins78 text-to-speech | English-centric number/acronym expansion, narration prep | No Azerbaijani rules, no diacritic restoration, no Cyrillic, no engine-specific AZ blocks |
| num2words (`lang='az'`), aznum2words, num2azerbaijani, money-to-azerbaijani-words | Number → words | Code libraries, not usable in chat; no ordinals, dates, phones or abbreviations |
| kamaalg/aztext (MIT) | ASCII → diacritics (dictionary), number → words, AZ vs Turkish detection | No Cyrillic transliteration, ordinals, dates, money or abbreviations; Python only |
| ttsfree, SpeechGen, Fliki, json2video | Wrap Azure Banu/Babek or Gemini | No text prep, paid for commercial use |

**Must-have features competitors lack (all built into v1.0.0):**
1. Diacritic restoration with a change list and `?` for doubtful words. Covers ASCII, Turkish keyboard and Russian keyboard input. Names are never silently changed.
2. Cyrillic → Latin conversion.
3. Azerbaijani normaliser for cardinals, ordinals with vowel harmony, case suffixes after digits, decimals, faiz, manat/qəpik and other currencies, dates, time, phone groups, units, weekday abbreviations, acronym reading (word vs letter names) and brand respelling.
4. Engine-specific paste blocks: Gemini style line, ElevenLabs v3 tags and "…" pauses, Azure SSML prosody/breaks for Banu/Babek, each with 3 phone steps.
5. Measured default style (Codelady/Nora) plus 10 original presets (5 F / 5 M) with prompts for each engine.
6. Reel word budgets and scene timings from a measured pace; chunking of long texts under per-engine limits.
7. Azerbaijani listening checklist (ə/e, ı/i, q/k, x/h, stress, numbers, brands, pauses, question rise, loudness) with a fix per item.
8. Honest commercial-use rules per free tier, an AI disclosure line, and a no-cloning rule.
9. Free, versus $5 English-centric competitors.

## 3. Free engines for Azerbaijani (checked 2026-11-09)

| Engine | AZ | Voices | Per request | Free | Commercial on free | Notes |
|---|---|---|---|---|---|---|
| **Gemini TTS** (AI Studio; 3.8 Flash/Flash-Lite TTS, 3.1/2.5 Flash TTS) | Yes: "North Azerbaijani" on 3.8 model pages; az-AZ "Preview" on Cloud docs | F: Sulafat (warm), Kore, Aoede, Despina, Leda, Vindemiatrix, Gacrux … M: Charon (informative), Orus (firm), Achird (friendly), Puck (upbeat), Algieba … | 8,192 input tokens; Cloud 4,000 bytes | Free of charge on the free tier (2.5 Pro TTS isn't); RPD unpublished, about 10/day reported **[3P]** | Not forbidden; free-tier data used to improve Google products | SynthID watermark (3.1+, assumed for 3.8 **[unverified]**); style prompts; tag syntax differs between API docs (`<short pause>`) and Cloud docs (`[short pause]`) **[UI behaviour unverified]**; 3.8 also offers voice cloning, which the skill doesn't use |
| **ElevenLabs** | v3, v3 Conversational, v4, v4 Turbo; not Multilingual v2 / Flash v2.5 | Library voices, no curated AZ list **[unverified which suit AZ]** | v3 5,000 chars, v4 10,000 | 10,000 credits/month; v4 on Free **[conflicting]** | **No**: attribution "elevenlabs.io" in the title, non-commercial | Tags: [laughs] [whispers] [sighs] [exhales] [sarcastic] [curious] [excited] [crying] [mischievously] [strong X accent]; no `<break>` on v3/v4; Starter ≈ $6/month adds commercial use and Instant Voice Cloning |
| **Azure Speech F0** | Yes | Banu (F), Babek (M) | Audio Content Creation 20,000 chars/file | 500,000 chars/month | Yes | Card + phone check for sign-up (Azure for Students: no card); full SSML; Babek ş/ğ bug **[3P, MS Q&A]** |
| Edge Read Aloud / edge-tts | Same voices | — | — | No quota | Unlicensed endpoint | 403 errors reported; drafts only |
| Narakeet | Latin only | Zemfira (F), Tofiq (M) | 1,000 chars/file on trial | ~20 free files **[vendor page, not AZ-specific]** | Trial rights **[unverified]** | No sign-up |
| TTSMaker | **[AZ unverified]** | — | 3,000 chars | 20,000 chars/week **[3P]** | Claims free commercial **[3P]** | Site returned 403 |
| Meta MMS `mms-tts-azj-script_latin` | Yes | 1 | — | Open | **CC-BY-NC** (non-commercial) | Needs Python/GPU; no quality data |
| Piper, Coqui XTTS-v2, Fish Audio, OpenAI | No AZ (XTTS has Turkish only); OpenAI has no free API | | | | | |

**Ranking for the skill:** 1) Gemini (free, no card, style control, natural); 2) ElevenLabs v3 (likely the most natural, but non-commercial on Free); 3) Azure Banu/Babek with tuned SSML (commercial-safe, consistent, formal; last resort per the owner). Fallback with no account: Narakeet.

## 4. Codelady/Nora style measurement

- **Source:** `marketing/reels/r1/voice/vo-az-nora.mp3`, 19.72 s, 128 kbps.
- **Text:** "Təqaüdə seçildiyin barədə mesaj gəlib və iyirmi dörd saata yüz əlli dollar ödəməlisən? Dayan. Stipendium Hungaricum kimi proqramlarda müraciət pulsuzdur. Mesajı pulsuz Scam Checker-ə yapışdır: hökm, qırmızı bayraqlar və rəsmi link bir neçə saniyəyə. Şərhə SCAM yaz." That is 37 words, about 88 syllables and 265 characters.
- **Tools:** ffmpeg-static `silencedetect` (−35 dB and −40 dB, d = 0.1 s), `ebur128`, `astats`; Node autocorrelation pitch tracker (40 ms window, 10 ms hop, 90–400 Hz).

**Pace and loudness**

| Metric | Value |
|---|---|
| Pace (incl. pauses) | 1.88 words/s (≈ 113 wpm), ≈ 4.5 syllables/s, ≈ 13.4 characters/s |
| Articulation (speech only, ≈ 16.3 s) | ≈ 2.27 words/s, ≈ 5.3 syllables/s |
| Integrated loudness | −17.3 LUFS |
| Loudness range | 3.4 LU |
| True peak | −1.3 dBFS |
| RMS | −17.2 dB |

**Pauses (−35 dB)**

| Where | Length |
|---|---|
| Breath inside the opening question | 0.19 s at 2.36 s |
| After "?" | 0.40 s |
| After "Dayan." | 0.41 s |
| After "pulsuzdur." | 0.44 s |
| After the colon | 0.38 s |
| List commas | 0.18 s, 0.20 s, 0.11 s |
| After "saniyəyə." | 0.37 s |
| Around the CTA word ("Şərhə · SCAM · yaz") | 0.16 s, 0.17 s |

Sentence ends average 0.40 s; commas average 0.17 s.

**Pitch (estimate, octave errors possible)**

| Feature | Value |
|---|---|
| Median | ≈ 188 Hz |
| p10–p90 | ≈ 126–267 Hz |
| Sentence starts | ≈ 220–310 Hz |
| Statement ends | ≈ 120 Hz |
| Question end | 116–118 Hz rising to 160 Hz on the final syllable (≈ +5 semitones) |
| "Dayan." | ≈ 180 → 123 Hz |

The profile describes delivery only. The voice is a library preset (ElevenLabs family via Higgsfield). Cloning it is not allowed and wasn't attempted.

## 5. Azerbaijani normalisation facts

- **Numbers:** cardinals from omniglot; ordinals' vowel harmony from Wiktionary "-inci"; num2words supports `az`.
- **Stress:** mostly final and shifts with suffixes (BQU paper). Negative -ma/-mə pre-stress is well attested for Turkish; Azerbaijani sources conflict **[partly unverified]**.
- **Unverified (own knowledge):**
  - Decimal reading "iki tam onda beş".
  - "faiz" preferred over "yüzdə".
  - Phone-group reading.
  - The acronym letter-name convention.

## 6. Orthoepy and intonation (sources for `templates/orthoepy-and-liveliness.md`)

- **ON**: *Azərbaycan dilinin orfoepiya normaları*, Cabinet of Ministers Decision No. 175, 18 June 2021. https://nk.gov.az/uploads/doc/docs/old/39d505897d2486a4e586e85076392522.pdf
  - **Stress:**
    - final, and moves with suffixes (§6.1)
    - loanwords keep their stress (§6.2)
    - stress can change the meaning (§6.3)
    - unstressed suffixes (§6.4.1–6.4.6): -ma/-mə (except future negative), -mı, -dır and the person endings (except in the conditional and the simple past), idi/imiş/isə, -kən, -ca, -la, -gil, -ov/-yev
    - vocative (§6.5)
  - **Final q/k:**
    - q → [x] in native polysyllables (§3.11)
    - k → [x'] in native polysyllables (§3.12); the norm writes "çörək [çörəx]"; [y] appears only before a vowel
    - monosyllables and Arabic/Persian loans keep k
  - **Consonants:**
    - doubles pronounced long; kk/pp/tt → second consonant voiced; qq → [k'q]; -iyyat → single y (§3.2–3.6)
    - final b/c/d/g devoiced (§3.10)
    - n before b/m → [m] (§3.8)
  - **Suffixes:** -dır → [-dı] (§4.1), -sınız → [-sız] (§4.2), -la/ilə/-dan → [-nan] (§4.3–4.4, 4.10), l-suffix assimilation (§4.6), -lıq/-lik etc. (§4.8–4.9)
  - **Vowels:** Arabic long vowels (§2.2–2.3); a/ə raised before a y-suffix (§4.5)
- **Stress statistics:** G. Vəliyeva, *Filologiya məsələləri* 2024 no. 1 (72.1 % final stress in a 3,000-word sample). https://filologiyameseleleri.com/pdf/2024/n1/243.pdf
- **Questions:** Yoshimura & Guliyeva, *Azerbaijani Grammar Textbook*, ILCAA / Tokyo University of Foreign Studies, 2023, pp. 3, 19–20. https://publication.aa-ken.jp/azerbaijani_grammar_textbook_ilc2022.pdf
  - Yes/no questions take -mı, or have no particle and a raised final intonation with a slightly lengthened last vowel. The form without -mı is far more common in speech.
  - Wh-questions are "not so rising", and the question word is pronounced strongly.
  - Place names and loanwords have their own fixed stress.
- **Supporting:**
  - az.wikipedia "Vurğu" (unstressed -ma, -mı, -la, -sa): https://az.wikipedia.org/wiki/Vurğu
  - az.wikibooks "Fonetik norma" (final k → x'): https://az.wikibooks.org/wiki/Azərbaycan_dili/Fonetik_norma
- **Unverified:**
  - early stress on sonra, indi, bəlkə, hələ, niyə, necə (blogs only)
  - the exact pitch-peak position in yes/no questions (Axundov 1998 is not online)
  - gəlsin → [gəssin]
  - style guidance on colloquial connectors (no prescriptive source; Aslanova 2025 covers discourse markers descriptively)
  - Azure `<emphasis>` support for az-AZ voices
- **Correction to the owner's brief:**
  - "çörək ~ çörəy" is not the norm: standalone it is [çörəx'], and [y] appears only before a vowel (çörəyi).
  - "-mı rises on the particle": the particle is unstressed. The source only says the end of the question rises, so the skill says "rise at the end".

## Sources

- https://elevenlabs.io/docs/help-center/other/what-languages-do-you-support
- https://elevenlabs.io/docs/overview/models
- https://elevenlabs.io/pricing
- https://elevenlabs.io/docs/best-practices/prompting/eleven-v3
- https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform
- https://docs.cloud.google.com/text-to-speech/docs/gemini-tts
- https://aistudio.google.com/docs/speech-generation
- https://aistudio.google.com/docs/pricing
- https://ai.google.dev/gemini-api/terms
- https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-tts
- https://discuss.ai.google.dev/t/gemini-lies-about-free-tier-quota-limits-sudden-resource-exhausted-blockers-on-tts-models/177531
- https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-audio-content-creation
- https://azure.microsoft.com/pricing/purchase-options/azure-account
- https://learn.microsoft.com/en-us/answers/questions/5965298/tts-voice-model-az-az-babekneural-male-sometimes-c
- https://github.com/rany2/edge-tts/issues/458
- https://www.narakeet.com/languages/azerbaijani-text-to-speech-az/
- https://pro.ttsmaker.com/pricing
- https://huggingface.co/facebook/mms-tts-azj-script_latin
- https://vapi.ai/community/m/1447889126128091186
- https://ict.az/uploads/konfrans/ana_dili/24_Milli_transliterasiya_sisteminin_formalashmasi_meseleleri.pdf
- https://filologiyameseleleri.com/pdf/2025/n10/202-206%20%20Arzu%20Mirzeyeva.pdf
- https://aclanthology.org/2024.icnlsp-1.44.pdf
- https://www.agensi.io/skills/ai-voiceover-studio-script-to-mp3-32-languages
- https://www.agensi.io/skills/ai-voiceover-scripter
- https://skills.sh/phrazzld/claude-config/voiceover
- https://www.skillsdirectory.com/skills/clawic-speak
- https://pypi.org/project/num2words
- https://huggingface.co/kamaalg/aztext
- https://omniglot.com/language/numbers/azeri.htm
- https://en.wiktionary.org/wiki/-inci
- https://bqu.edu.az/storage/840832eb-4c4b-40bc-8654-2a302bad0a1c.pdf
- Earlier notes: `research/free-ai-video-voice-tools.md`
