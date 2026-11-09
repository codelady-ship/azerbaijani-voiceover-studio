# Engine blocks (copy, fill, paste)

Checked 2026-11-09. Free tiers change, so re-check the engine's pricing and terms page before commercial use.

## 1. Gemini TTS — Google AI Studio (free, no card)

**Steps (phone works too):**
1. Open aistudio.google.com and choose **Generate speech** (Speech generation).
2. Pick a voice. Female: **Sulafat** (warm), Kore, Aoede. Male: **Charon** (informative), Orus (firm), Achird (friendly). Paste the block.
3. Press **Run**, listen, then download.

```
<STYLE LINE from the preset>:
<TTS-ready Azerbaijani text>
```

- Keep each request to **≤ 2,000 characters**. Make one request per chunk.
- Pauses come from punctuation. Bracket tags such as `[short pause]` are documented for the API, but some UI versions read them aloud, so test them first.
- **Commercial use:** the terms don't forbid it, and you are responsible for how you use the output. Free-tier inputs and outputs may be used to improve Google products. The audio carries an inaudible SynthID watermark. Azerbaijani support is marked "preview" in Google Cloud docs.
- The free tier has a low daily request limit, which Google doesn't publish. If you hit it, try again the next day.

## 2. ElevenLabs — Eleven v3 (free 10,000 credits/month ≈ 10 min)

**Steps:**
1. Open elevenlabs.io → **Text to Speech** → Model: **Eleven v3** (Azerbaijani isn't supported on Multilingual v2 or Flash).
2. Pick a voice and set Stability to **Natural**. Female: Matilda, Sarah, Jessica, Lily, Alice. Male: Brian, George, Daniel, Roger, Will. These are suggestions, so test 2–3 voices.
3. Paste the block, press **Generate**, then download.

```
[curious] <hook question>?
<sentence> … <sentence>
[excited] <payoff / CTA>
```

- Tags go in English square brackets before the line: `[excited] [curious] [whispers] [sighs] [laughs] [sarcastic]`. Add `[strong Azerbaijani accent]` if the voice drifts towards Turkish. Use 1–3 tags per Reel.
- For pauses, use "…" or a dash. There is **no `<break>` on v3**. CAPS add emphasis.
- Keep each request to **≤ 4,500 characters** (the v3 limit is 5,000).
- **Commercial use: NO on Free.** Free output is non-commercial and must credit "elevenlabs.io" in the title. Commercial use needs Starter (≈ $6/month), which also adds Instant Voice Cloning of **your own** or a consenting person's voice.

## 3. Azure Speech — Audio Content Creation (F0 free: 500,000 characters/month)

Use this when you need commercial-safe audio and the same voice every time. It sounds more formal than the others, so always tune it.

**Steps:**
1. Open speech.microsoft.com → **Audio Content Creation**. This needs a free F0 Speech resource. Azure sign-up asks for a card and a phone check; Azure for Students doesn't need a card.
2. Create a **new file**, switch to the **SSML** view and paste the block.
3. Press **Play**, then **Export** the audio.

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="az-AZ">
  <voice name="az-AZ-BanuNeural">
    <prosody rate="+5%" pitch="+4%">Hook sualı <prosody pitch="+12%">sonuncu sözü</prosody>?</prosody>
    <break time="400ms"/>
    <prosody rate="+3%" pitch="+0%">İzah cümləsi, vergüllə<break time="180ms"/> və sonluqla.</prosody>
    <break time="400ms"/>
    <prosody rate="+0%" pitch="-2%">Çağırış cümləsi.</prosody>
  </voice>
</speak>
```

- For a male voice, use `az-AZ-BabekNeural` with pitch 0 to −3 %. Babek is reported to sometimes say s or q in place of ş or ğ, so listen for it.
- Take the prosody and break values from the chosen preset (`voice-presets.md`).
- Keep each paste to **≤ 5,000 characters**. The file limit is 20,000.
- **Commercial use: yes**, under standard Azure terms.

## Fallback (no account): Narakeet

Voices: Zemfira (F) and Tofiq (M). Latin script only. Free trial files can be up to 1,000 characters. **The trial's commercial rights are unverified**, so check narakeet.com before using it for ads.

## Don't use for published work

- **Edge Read Aloud / edge-tts:** same voices as Azure, but an unofficial endpoint with no commercial licence. Use it for drafts only.
- **Turkish voices** (XTTS, Chatterbox, Turkish voices in any app): they give a Turkish accent on Azerbaijani text.
