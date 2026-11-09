# Voice presets (1–10)

Ten **original** delivery styles for Azerbaijani Reels, ads, lessons and stories: 5 female and 5 male. None is based on, named after or imitating a real person, blogger or actor. A preset describes delivery (pace, pauses, melody, energy). Use it with any voice the engine offers. Preset 1 is the measured Codelady/Nora profile, which describes that delivery only and does not copy the voice.

Engine notes:
- **Gemini** = Google AI Studio → Speech generation.
- **ElevenLabs** = Eleven v3. ElevenLabs Free is non-commercial and needs attribution. Stock voices change over time, so test 2–3 voices. Azerbaijani quality varies by voice.
- **Azure** = Speech Studio, Audio Content Creation. Only `az-AZ-BanuNeural` (F) and `az-AZ-BabekNeural` (M) exist, so presets differ by prosody only.
- Pace is in words per second and includes pauses. The word budget is seconds × pace.

| # | Name | Gender | Age feel | Pace | Best for |
|---|---|---|---|---|---|
| 1 | Səmimi Bələdçi (Codelady/Nora) | Qadın | 25–35 | 1.9 | Explainer Reels, tips, product intros |
| 2 | Enerjili Reel Aparıcısı | Qadın | 20–28 | 2.3 | Trends, giveaways, fast hooks |
| 3 | Sakit Müəllimə | Qadın | 30–45 | 1.6 | Lessons, tutorials, e-learning |
| 4 | Yumşaq Lifestyle | Qadın | 22–32 | 1.7 | Beauty, cafés, travel, daily vlogs |
| 5 | Zərif Lüks Reklam | Qadın | 28–40 | 1.5 | Jewellery, fashion, premium brands |
| 6 | İsti Nağılçı | Kişi | 45–60 | 1.4 | Stories, tales, history, documentary |
| 7 | Ciddi Xəbər Diktoru | Kişi | 30–45 | 1.9 | News, announcements, facts |
| 8 | Dərin Premium Brend | Kişi | 30–45 | 1.5 | Cars, real estate, banks, tech launches |
| 9 | Motivasiya Natiqi | Kişi | 28–40 | 2.0 (varied) | Motivation, sport, courses, coaching |
| 10 | Zarafatcıl Gənc Vloqer | Kişi | 18–28 | 2.4 | Humour, street interviews, memes, food |

---

## 1. Səmimi Bələdçi (Codelady/Nora, measured) — qadın

- **Age feel:** 25–35.
- **Pace:** 1.9 words/s (measured).
- **Pauses:** 0.36–0.44 s at sentence end, 0.11–0.20 s at commas, a 0.2 s breath inside a long hook.
- **Pitch/energy:** medium-high, about an octave of range. Warm and confident, with a slight smile.
- **Intonation:** statements start high and fall at the full stop. Yes/no hooks rise on the last syllable (about +5 semitones). One-word commands ("Dayan.") are short and falling. The CTA word is lightly framed by pauses.
- **Best for:** explainer Reels, tips, product and service intros, educational promos.
- **Gemini** (Sulafat, or Kore): `Azerbaijani with a native Baku accent (not Turkish). Warm, confident, friendly explainer with a slight smile. Brisk but clear pace, about 110–115 words per minute. Short pause after commas, clear pause after each sentence. Yes/no questions rise at the end; wh-questions stress the question word. Short commands are firm and falling.`
- **ElevenLabs** (Matilda or Sarah): `[curious]` on the hook question and `[excited]` on the payoff line. Use "…" sparingly. Stability: Natural. Speed: 1.0.
- **Azure Banu:** `rate="+5%" pitch="+4%"` on the hook, `+3% / 0%` on the body. `<break time="400ms"/>` after sentences, `180ms` at commas. `pitch="+12%"` on the last word of a question.
- **Sample:** "Təqaüdə seçildiyin barədə mesaj gəlib? Dayan. Əvvəlcə rəsmi saytı yoxla."

## 2. Enerjili Reel Aparıcısı — qadın

- **Age feel:** 20–28.
- **Pace:** 2.3 words/s.
- **Pauses:** 0.25 s at sentence end, 0.1 s at commas. Almost no pause before the hook payoff.
- **Pitch/energy:** high and bright, with big jumps. Loud and upbeat.
- **Intonation:** exclamations peak on the key word, and questions rise sharply. Emphasise numbers and "pulsuz/endirim".
- **Best for:** trends, giveaways, sales, launches, "3 tips in 15 seconds".
- **Gemini** (Laomedeia, or Zephyr/Puck-style energy with a female voice): `Azerbaijani, native Baku accent. Very energetic, upbeat young female Reel host, big smile, fast pace about 135–140 words per minute, punchy short sentences, excited emphasis on numbers and offers, quick pauses.`
- **ElevenLabs** (Jessica or Laura): `[excited]` at the start, `[laughs]` at most once. Stability: Creative. Speed: 1.1.
- **Azure Banu:** `rate="+15%" pitch="+8%"`. `<break time="250ms"/>` after sentences, `100ms` at commas.
- **Sample:** "Bu həftə hər şey otuz faiz endirimlə! Tələs, cəmi üç gün qalıb!"

## 3. Sakit Müəllimə — qadın

- **Age feel:** 30–45.
- **Pace:** 1.6 words/s.
- **Pauses:** 0.5–0.6 s at sentence end, 0.2–0.25 s at commas. A longer pause (about 0.8 s) between steps.
- **Pitch/energy:** medium and steady. Calm, patient, encouraging.
- **Intonation:** clear falling endings. Key terms are said slowly with light stress. Questions rise gently, as if checking understanding.
- **Best for:** lessons, tutorials, e-learning, instructions, university and course content.
- **Gemini** (Vindemiatrix, or Achernar): `Azerbaijani, native Baku accent. Calm, patient, friendly female teacher. Moderate pace about 95 words per minute, clear articulation, longer pause between steps, gentle stress on key terms.`
- **ElevenLabs** (Sarah or Alice): no tags, or `[curious]` before a question. Stability: Robust. Speed: 0.95.
- **Azure Banu:** `rate="-5%" pitch="0%"`. `<break time="550ms"/>` after sentences, `220ms` at commas, `800ms` between steps.
- **Sample:** "Birinci addım: faylı açın. İndi isə diqqətlə baxın, düymə yuxarıdadır."

## 4. Yumşaq Lifestyle — qadın

- **Age feel:** 22–32.
- **Pace:** 1.7 words/s.
- **Pauses:** 0.45 s at sentence end, 0.2 s at commas. Relaxed, slightly airy.
- **Pitch/energy:** medium-low and soft, close to the mic, intimate. Low-to-medium energy.
- **Intonation:** gentle, rounded falls. Questions rise softly. Sensory words ("ətirli", "isti", "yumşaq") are lightly stretched.
- **Best for:** beauty, skincare, cafés, travel, home, morning-routine vlogs.
- **Gemini** (Despina, or Callirrhoe): `Azerbaijani, native Baku accent. Soft, cosy, intimate female lifestyle voice, as if speaking close to the microphone. Relaxed pace about 100 words per minute, gentle pauses, warm and dreamy.`
- **ElevenLabs** (Lily or Matilda): `[whispers]` only for one intimate line. "…" for soft pauses. Stability: Natural. Speed: 0.95.
- **Azure Banu:** `rate="-3%" pitch="-2%" volume="-10%"`. `<break time="450ms"/>`.
- **Sample:** "Səhər qəhvəsi, yumşaq işıq… və bir az özünə vaxt."

## 5. Zərif Lüks Reklam — qadın

- **Age feel:** 28–40.
- **Pace:** 1.5 words/s.
- **Pauses:** 0.6–0.8 s at sentence end. Short phrases, often one or two words per sentence.
- **Pitch/energy:** medium-low and controlled. Elegant, polished, quiet confidence.
- **Intonation:** slow falling endings. The brand name is said last and alone. No sharp rises, and questions are rare and soft.
- **Best for:** jewellery, fashion, perfume, hotels, premium salons.
- **Gemini** (Gacrux, or Kore): `Azerbaijani, native Baku accent. Elegant, sophisticated luxury-ad female voice. Slow, controlled pace about 90 words per minute, long pauses between short phrases, calm confidence, refined and smooth.`
- **ElevenLabs** (Alice or Lily): no tags, with "…" between phrases. Stability: Robust. Speed: 0.9.
- **Azure Banu:** `rate="-12%" pitch="-4%"`. `<break time="700ms"/>` between phrases.
- **Sample:** "Zəriflik. Sadəlik. Və sənə layiq olan parıltı."

## 6. İsti Nağılçı — kişi

- **Age feel:** 45–60.
- **Pace:** 1.4 words/s.
- **Pauses:** 0.6–0.8 s at sentence end, 0.25 s at commas. A dramatic pause (about 1 s) before a twist.
- **Pitch/energy:** low-medium, rich and warm. Calm with emotional colour.
- **Intonation:** wide storytelling melody. Questions rise mysteriously. Character lines change tone slightly.
- **Best for:** tales, stories, history, documentary, Novruz and holiday content.
- **Gemini** (Charon, or Algenib): `Azerbaijani, native Baku accent. Warm, wise male storyteller in his fifties. Slow pace about 85 words per minute, rich low voice, long pauses before important moments, gentle emotion, like telling a tale to children.`
- **ElevenLabs** (George or Bill): `[curious]` before a mystery and `[sighs]` once. "…" before twists. Stability: Natural. Speed: 0.9.
- **Azure Babek:** `rate="-10%" pitch="-4%"`. `<break time="700ms"/>` after sentences, `1000ms` before a twist.
- **Sample:** "Biri vardı, biri yoxdu… Uzaq bir kənddə bir qoca bağban yaşayırdı."

## 7. Ciddi Xəbər Diktoru — kişi

- **Age feel:** 30–45.
- **Pace:** 1.9 words/s.
- **Pauses:** 0.4 s at sentence end and 0.15 s at commas. Very even.
- **Pitch/energy:** medium and authoritative. Neutral, crisp diction.
- **Intonation:** even declination and clear falls. Numbers and names are stressed. Questions are rare, with a neutral rise.
- **Best for:** news, announcements, facts, corporate updates, event info.
- **Gemini** (Charon, or Rasalgethi): `Azerbaijani, native Baku accent. Professional male news anchor. Neutral, authoritative, crisp diction, steady pace about 115 words per minute, even intonation, clear stress on numbers and names.`
- **ElevenLabs** (Daniel or Eric): no tags. Stability: Robust. Speed: 1.0.
- **Azure Babek:** `rate="0%" pitch="-2%"`. `<break time="400ms"/>` after sentences, `150ms` at commas.
- **Sample:** "Bu gün Bakıda yeni metro stansiyası açıldı. Stansiya gündə on min sərnişinə xidmət edəcək."

## 8. Dərin Premium Brend — kişi

- **Age feel:** 30–45.
- **Pace:** 1.5 words/s.
- **Pauses:** 0.6 s at sentence end. Short, weighty phrases.
- **Pitch/energy:** low and resonant. Confident, premium, unhurried.
- **Intonation:** strong falls. The brand or product name is said alone at the end. No questions, or one low rhetorical question.
- **Best for:** cars, real estate, banks, tech launches, premium services.
- **Gemini** (Algieba, or Orus): `Azerbaijani, native Baku accent. Deep, resonant, premium male brand voice. Slow, confident pace about 90 words per minute, weighty pauses between short phrases, calm power.`
- **ElevenLabs** (Brian or Callum): no tags, with "…" before the brand name. Stability: Robust. Speed: 0.9.
- **Azure Babek:** `rate="-10%" pitch="-8%"`. `<break time="600ms"/>`.
- **Sample:** "Gücü hiss et. Rahatlığı yaşa. Yeni nəsil — artıq Bakıda."

## 9. Motivasiya Natiqi — kişi

- **Age feel:** 28–40.
- **Pace:** 2.0 words/s on average, building from 1.7 to 2.3.
- **Pauses:** 0.5 s before the key line, 0.15 s at commas. A short silence before the final sentence.
- **Pitch/energy:** medium-high and rising through the script. Passionate, driving.
- **Intonation:** builds up. The key word is stressed (CAPS in ElevenLabs). Rhetorical questions rise, then the answer falls firmly.
- **Best for:** motivation, sport, coaching, course launches, New Year content.
- **Gemini** (Orus, or Alnilam): `Azerbaijani, native Baku accent. Passionate motivational male speaker. Starts calm and builds energy, pace rising from about 100 to 140 words per minute, strong emphasis on key words, short dramatic pause before the final line.`
- **ElevenLabs** (Roger or Liam): `[excited]` on the final line, with CAPS for one key word. Stability: Creative. Speed: 1.05.
- **Azure Babek:** first part `rate="+0%" pitch="+0%"`, final part `rate="+12%" pitch="+6%"`. `<break time="500ms"/>` before the key line.
- **Sample:** "Hər gün bir addım. Yorulursan? Normaldır. Amma dayanma!"

## 10. Zarafatcıl Gənc Vloqer — kişi

- **Age feel:** 18–28.
- **Pace:** 2.4 words/s.
- **Pauses:** 0.2–0.3 s, plus a comic pause (about 0.6 s) before the punchline.
- **Pitch/energy:** medium-high, playful and casual. Very lively.
- **Intonation:** exaggerated rises and falls. Ironic stress, with a deadpan punchline. Colloquial forms are fine (gedəcəm, bilirsən).
- **Best for:** humour, street interviews, memes, food reviews, casual vlogs.
- **Gemini** (Puck, or Zubenelgenubi): `Azerbaijani, native Baku accent, casual and colloquial. Playful, funny young male vlogger. Fast pace about 145 words per minute, lively ups and downs, a short comic pause before the punchline.`
- **ElevenLabs** (Will or Charlie): `[laughs]` once and `[sarcastic]` on the punchline. Stability: Creative. Speed: 1.1.
- **Azure Babek:** `rate="+15%" pitch="+5%"`. `<break time="600ms"/>` before the punchline.
- **Sample:** "Dedim pəhriz edəcəm… sonra qutab gördüm. Pəhriz sabaha qaldı."

---

**Picking:** ask "Hansı stil? 1–10 seç (default: 1)". For a voice of the other gender, keep the same pace and pause pattern and choose a voice of the requested gender (Gemini F: Sulafat / M: Charon; Azure Banu / Babek).

**Not allowed:** presets named after, or tuned to sound like, a real person (blogger, actor, singer, politician). Use the closest preset instead. For a real voice, the only route is cloning **your own** voice or that of a person who gave consent, on a service that allows it (e.g. ElevenLabs Starter Instant Voice Cloning, paid, which includes a consent step).
