# Script split / scene timing template

Use for Reels (scene timings) and for long texts (chunks within the engine limit).

## Reel / short video

```
Hədəf: <N> s · Temp: <words/s> söz/s · Büdcə: <N × words/s> söz · Mətn: <X> söz (≈ <X ÷ words/s> s)

| Vaxt | Səhnə | Mətn (TTS üçün) | Söz |
|---|---|---|---|
| 0–3 s | Hook | ... | 6 |
| 3–8 s | Problem | ... | 9 |
| ... | ... | ... | ... |
| son 3 s | CTA | ... | 5 |
```

Seconds per line = words ÷ words/s + pause after the line (0.4 s full stop, 0.2 s comma). Round to 0.5 s.

## Long text (chunks)

```
Hissə 1/<n> · <words> söz · ≈ <min:sec>
<text, ends at a sentence or paragraph end>

Hissə 2/<n> · ...
```

- Cut only at a full stop, preferably at a paragraph end.
- Every chunk stays under the engine limit (see SKILL.md) with ≈ 10 % margin.
- Same voice, same style line, same settings for every chunk. Name files `01.mp3`, `02.mp3` … and join them in CapCut or any editor.
- Total time = total words ÷ words/s.
