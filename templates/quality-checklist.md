# Listening checklist (Azerbaijani voiceover)

Listen once with eyes closed, then once reading the text. Tick each line. For every problem, use the fix on the right, then regenerate **only that sentence or chunk**.

| # | Listen for | Fix |
|---|---|---|
| 1 | **ə read as e** (mən → "men", gəl → "gel") | Check the text really has ə (not e). Add to the style line: "Azerbaijani pronunciation, not Turkish; ə is an open front vowel like in 'cat'." Try another voice of the same engine. |
| 2 | **ı read as i** (qız → "qiz") | Check ı vs i in the text (Turkish keyboards swap them). Same style line. |
| 3 | **q read as k** (qız → "kız") or **x read as h** (xoş → "hoş") | Turkish accent. Add: "Use Azerbaijani q (like Azerbaijani 'qız') and x (like German 'ach')." Change voice. If it persists, switch engine (Azure Babek/Banu always use az-AZ phonemes). |
| 4 | **Turkish-sounding melody** | Remove Turkish words (için → üçün, özel → xüsusi, indirim → endirim). Style line: "native Baku Azerbaijani accent". |
| 5 | **Numbers in another language or as digits** | The text still contains digits or symbols. Normalise again (cheat sheet) so no digits remain. |
| 6 | **Stress on the wrong syllable** | Most Azerbaijani words stress the last syllable. For a misread word: respell it, split it with a hyphen, or rephrase. Negative verbs stress the syllable before -ma/-mə (gəlmə, getmə): rephrase if misread. |
| 7 | **Brand or foreign name misread** | Use the Azerbaijani respelling (Ayfon, Vatsap) or drop the name. |
| 8 | **Pauses too long or missing** | Sentence end ≈ 0.4 s, comma ≈ 0.15–0.2 s (Codelady/Nora profile). Too long: join short sentences with a comma. Missing: add a comma or full stop; Gemini `[short pause]`; ElevenLabs "…" or a dash; Azure `<break time="400ms"/>`. |
| 9 | **Question sounds like a statement** | End with "?" and keep the question short. Gemini style line: "rising intonation on the final word of questions". ElevenLabs: put [curious] before it. Azure: `<prosody pitch="+8%">` on the last word. |
| 10 | **Too fast or too slow** | Target ≈ 1.9 words/s (≈ 114 words/min) incl. pauses. Gemini: "speak at a moderate, brisk pace". Azure: `rate="-5%"` … `"+10%"`. ElevenLabs: speed slider 0.9–1.1. |
| 11 | **Flat, robotic delivery** | Shorter sentences, one idea each. Add emotion in the style line ("warm, confident, slight smile"). On Azure, vary `pitch` per sentence (+3% hook, −2% explanation). |
| 12 | **Clicks, breaths, cut-off ending** | Regenerate the chunk. Leave a full stop at the end of every chunk. |
| 13 | **Loudness** | For Reels aim ≈ −14 to −16 LUFS; the Codelady reference is −17.3 LUFS with a true peak of −1.3 dBFS. In CapCut raise volume to 110–130 % if it sounds quiet next to music. |

**Pass:** every line ticked. Write down the voice name and settings that worked so the next video sounds the same.
