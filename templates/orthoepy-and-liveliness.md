# Azerbaijani orthoepy, intonation and liveliness for TTS

Main source: **"Azərbaycan dilinin orfoepiya normaları"**, approved by Cabinet of Ministers Decision No. 175 of 18 June 2021 (cited below as **ON §**). Labels:
- **[V]**: verified in ON or another credible source (see `docs/research.md`).
- **[?]**: unsure or no credible source. Use these as listening hints only.

**Ground rule for TTS:** keep the **standard spelling** in the voiceover text, because engines are trained on it and subtitles must match it. Use the rules below to **listen** for errors. Respell a single word only as a last-resort fix, and only in the TTS text, never in the subtitles.

## 1. Stress (vurğu)

- **[V] Mostly on the last syllable, and it moves when suffixes are added** (ON §6.1): kitáb → kitablár → kitablarımdán. This holds for about 72 % of dictionary words (Vəliyeva 2024), so it is "mostly", not "always".
- **[V] Loanwords keep the source stress** (ON §6.2): fáktor, qálstuk, fantáziya. Adapted loans move it to the end: qəzét.
- **[V] Vocative moves stress earlier** (ON §6.5): Vətə́n → Və́tən!, Azərbaycán → Azə́rbaycan!
- **[V] Stress changes the meaning** (ON §6.3): mǘtləq (adverb, "certainly") vs mütlə́q (adjective); nə́hayət ("finally", modal word) vs nəhayə́t (noun, "end").
- **[V] Unstressed suffixes.** Stress stays on the syllable before them:
  - negative **-ma/-mə** (ON §6.4.5): oxúmadı, bílmədi, gə́lmə. Exception: future-negative forms are stressed: oxumáram, bilmə́rəm.
  - question particle **-mı/-mi/-mu/-mü** (§6.4.6): oxudúnmu?
  - predicative and person endings **-dır, -am, -san, -ıq, -lar** (§6.4.3): azáddır, azádam. Exception: they are stressed in the conditional and simple past: oxudunúz, oxusaníz.
  - **idi/-dı, imiş/-mış, isə/-sa** attached (§6.4.4): oxuyacáqdı; **-kən**: oxuyárkən.
  - **-ca/-cə** and adverbial **-la** (§6.4.2): qəhrəmáncasına; comitative **-la** (§6.4.6): atámla.
  - **-gil**, surname endings **-ov/-yev** (§6.4.1): Ağáyev.
- **[?] Adverbs and question words with early stress** (sonra, indi, bəlkə, hələ, niyə, necə, haçan): commonly heard, but no credible source was found. If an engine stresses them oddly, test both readings and keep the more natural one.

## 2. Intonation

- **[V] Yes/no questions:** formed with -mı, or in speech without it by **raising the final intonation and slightly lengthening the last vowel**. The form without -mı is far more common colloquially (Yoshimura & Guliyeva 2023). Because -mı is unstressed, the stressed syllable is the one before it. **[?]** No acoustic source gives the exact position of the pitch peak. Our measured Reel voice rises on the final syllable (about +5 semitones).
- **[V] Wh-questions** (nə, kim, harada, niyə): the end is "not so rising", and the **question word is pronounced strongly** (same source). So don't force a final rise. Stress the question word instead.
- Statements fall at the full stop. Sentence starts are higher (measured).

**For TTS:** prefer short yes/no questions ending in "?". For wh-questions, put the question word early and keep the sentence short.

## 3. Orthoepy hints (what a correct reading sounds like)

| Spelling | Norm | Example | Source |
|---|---|---|---|
| final **q** (native word, 2+ syllables) | [x] | qonaq [qonax], otaq [otax]; before a vowel suffix ğ: otağa | [V] ON §3.11 |
| final **k** (native word, 2+ syllables) | [x'] (soft, "voiceless y") | çiçək [çiçəx'], çörək [çörəx']; before a vowel → [y]: çiçəyin, çiçək ətri [çiçəy ətri] | [V] ON §3.12 (note: **"çörəy" alone is not the norm**) |
| one-syllable native words; Arabic/Persian loans | k stays [k] | tək, türk, bərk; mübarək, əmlak | [V] ON §3.12 |
| loanword final q | [k'] | haqq [hak'], şərq [şərk'] | [V] ON §3.11 |
| suffixes -lıq / -lik / -acaq / -ərək | [-lıx] / [-lix'] / [-acax] / [-ərəx'] | yaxşılıq [yaxşılıx] | [V] ON §4.8–4.9 |
| double consonants | long, as written; kk/pp/tt → second voiced; qq → [k'q]; -iyyat → single y | amma, ləzzət; səkkiz [səkgiz], əlbəttə [əlbətdə]; diqqət [dik'qət]; ədəbiyyat [ədəbiyat] | [V] ON §3.2–3.6 |
| -dır / -sınız in speech | [-dı] / [-sız] | yaxşıdır [yaxşıdı], gəlirsiniz [gəlirsiz] | [V] ON §4.1–4.2 |
| final b, c, d, g | devoiced | ağac [ağaç], kənd [kənt] | [V] ON §3.10 |
| -lar/-lı after t, z, n | assimilated | atlar [atdar], qızlar [qızdar], oğlanlar [oğlannar] | [V] ON §4.6 |
| -dan after m/n; ilə / -la | [-nan] | məndən [mənnən], telefonla [telefonnan] | [V] ON §4.3–4.4 |
| n before b/m | [m] | şənbə [şəmbə] | [V] ON §3.8 |
| a/ə before a y-suffix | raised | başlayır [başlıyır], almayacaq [almıyacax] | [V] ON §4.5 |
| Arabic long vowels | long | saat [sa:t], məna [mə:na], təbii [təbi:] | [V] ON §2.2–2.3 |
| gəlsin → [gəssin] | — | not in the norm | [?] |

**Typical engine errors:**
- Final k read as a hard Turkish [k] (çörek) or with no softening.
- Final q read as [g] or [k].
- Long vowels in saat or məna shortened.
- Double consonants shortened.

**Fixes, in order:**
1. Try another voice or engine.
2. On Azure, use `<phoneme alphabet="ipa" ph="...">` for that one word.
3. Last resort: respell that one word in the TTS text only, e.g. "saat" → "sa-at".

## 4. Natural spoken rhythm

- One idea per sentence, about 6–12 words. Split long sentences at a comma.
- **[?] Colloquial connectors** (amma, yəni, bax, axı, deməli, onda, belə ki) make speech sound lively. No style guide was found, so use them in moderation (at most one per 2–3 sentences) and only where they fit the meaning. Never add them to formal or news text.
- **Emphasis plan:** mark one key word per sentence (the number, the offer, the action), and tell the engine about it (below). Don't stress more than one word per sentence.
- Use the engine's natural pauses rather than many breaks. Put a full stop where a speaker would breathe.

## 5. Liveliness per engine

**Gemini (style line):**
- Name the role and the feeling ("friendly explainer with a slight smile").
- Give the pace in words per minute.
- Add: "Azerbaijani with a native Baku accent (not Turkish)", "natural conversational rhythm", "questions with -mı and yes/no questions rise at the end; wh-questions stress the question word", "emphasise: <word1>, <word2>".
- Avoid "robotic", "read clearly", or anything that sounds like reading aloud.

**ElevenLabs v3:**
- Put 1–3 tags per Reel before a line: [excited], [curious] (for questions), [laughs], [sighs], [whispers], [sarcastic].
- Use CAPS for **one** emphasised word.
- Use "…" or a dash for pauses (no `<break>`).
- Add `[strong Azerbaijani accent]` at the start if the voice drifts to Turkish.
- Set Stability to Natural or Creative for more life (Robust is flatter).

**Azure SSML (Banu/Babek):**
- Neural az-AZ voices have no speaking styles, and `<emphasis>` may be ignored **[?]**. Create liveliness instead with per-sentence `<prosody>`:
  - hook pitch +4 to +8 %, rate +5 %
  - explanation 0 %
  - key word `<prosody pitch="+10%" rate="-5%">word</prosody>`
  - ending −2 %
- Use `<break time="400ms"/>` after sentences and 150–200 ms at commas.
- Raise pitch on the last syllable of yes/no questions with `<prosody pitch="+12%">`.
