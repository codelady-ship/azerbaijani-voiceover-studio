# Azerbaijani TTS normalisation cheat sheet

Use this to turn written Azerbaijani into text a TTS engine reads correctly. Rule: **no digits, symbols or emoji left** in the final voiceover text.

## Numbers (cardinal)

| 0 sıfır | 1 bir | 2 iki | 3 üç | 4 dörd | 5 beş | 6 altı | 7 yeddi | 8 səkkiz | 9 doqquz |
|---|---|---|---|---|---|---|---|---|---|
| 10 on | 20 iyirmi | 30 otuz | 40 qırx | 50 əlli | 60 altmış | 70 yetmiş | 80 səksən | 90 doxsan | 100 yüz |

- 1 000 = **min** (not "bir min"), 100 = **yüz** (not "bir yüz"), 1 000 000 = bir milyon, 1 000 000 000 = bir milyard.
- Write the parts in order: 1 299 → min iki yüz doxsan doqquz; 2026 → iki min iyirmi altı; 15 400 → on beş min dörd yüz.
- Thousands separators: a space or a dot (1 299 / 1.299) means thousands; a comma inside a number is a decimal.

## Ordinals and suffixes

- Ordinal suffix follows the **last vowel** of the number word: -ıncı / -inci / -uncu / -üncü after a consonant; -ncı / -nci / -ncu / -ncü after a vowel.
  birinci, ikinci, üçüncü, dördüncü, beşinci, altıncı, yeddinci, səkkizinci, doqquzuncu, onuncu, iyirminci, otuzuncu, qırxıncı, əllinci, yüzüncü, mininci. Compound: only the last word changes (otuz dördüncü, iki min iyirmi altıncı).
- Written forms: 1-ci, 2-ci, 3-cü, 4-cü, 6-cı, 9-cu, 2026-cı → read as the ordinal word.
- Case suffix after a digit (5-də, 10-dan, 24-ə): attach it to the number word with vowel harmony: beşdə, ondan, iyirmi dördə.

## Decimals, percent, fractions

- 2,5 → iki tam onda beş (casual: iki yarım). 3,75 → üç tam yüzdə yetmiş beş. 0,5 → sıfır tam onda beş (casual: yarım).
- 30% → **otuz faiz** (Azerbaijani standard; "yüzdə otuz" sounds Turkish).
- ½ yarım, ¼ dörddə bir, ¾ dörddə üç.

## Money

| Written | Read |
|---|---|
| 150 AZN / 150 ₼ / 150 manat | yüz əlli manat |
| 12,50 AZN | on iki manat əlli qəpik |
| $150 / 150 USD | yüz əlli dollar |
| €90 | doxsan avro |
| £20 | iyirmi funt sterlinq |
| 500 ₽ | beş yüz rubl |
| 100 ₺ | yüz türk lirəsi |

## Dates and time

- Months: yanvar, fevral, mart, aprel, may, iyun, iyul, avqust, sentyabr, oktyabr, noyabr, dekabr.
- 15 dekabr 2026 → on beş dekabr iki min iyirmi altı. "2026-cı il" → iki min iyirmi altıncı il. Spoken alternative: dekabrın on beşi.
- 15.12.2026 → on beş dekabr iki min iyirmi altı (DD.MM.YYYY; ask if the order is unclear).
- 1990-cı illər → min doqquz yüz doxsanıncı illər.
- 18:30 → saat on səkkiz otuz; "18:30-da" → saat on səkkiz otuzda. 09:05 → saat doqquz sıfır beş. Casual alternative only if the user writes casually (yeddinin yarısı).
- 9:00–18:00 → saat doqquzdan on səkkizə qədər.

## Phone numbers

- Read in the written groups, comma between groups: 050 123 45 67 → sıfır əlli, yüz iyirmi üç, qırx beş, altmış yeddi.
- +994 → artı doqquz yüz doxsan dörd. Leading zeros are spoken: 055 → sıfır əlli beş; 05 → sıfır beş.
- Short numbers: *1234 → ulduz min iki yüz otuz dörd; 112 → yüz on iki.

## Units and abbreviations

| Written | Read |
|---|---|
| km, m, sm, mm | kilometr, metr, santimetr, millimetr |
| kq, q, t | kiloqram, qram, ton |
| l, ml | litr, millilitr |
| °C | dərəcə (selsi) |
| və s. / və b. | və sairə / və başqaları |
| məs. | məsələn |
| küç. / pr. / r-nu | küçəsi / prospekti / rayonu |
| b.e., ç.a., ç., c.a., c., ş., b. | bazar ertəsi, çərşənbə axşamı, çərşənbə, cümə axşamı, cümə, şənbə, bazar |
| e.ə. / b.e. (era) | eramızdan əvvəl / bizim era (check context: b.e. can also be "bazar ertəsi") |
| № / No. | nömrə |
| AZN | manat |

**Acronyms:**
- **Read as a word** when people say it that way: ASAN, ADA, DİM, NATO, UNESCO.
- **Spell with letter names** when people spell it: BDU → be-de-u, ADNSU → a-de-en-es-u, ABŞ → a-be-şe, DSMF → de-es-em-ef. If unsure, ask, or expand to the full name once.
- Letter names: a, be, ce, çe, de, e, ə, ef, ge, ğe, he, xe, ı, i, je, ka, qe, el, em, en, o, ö, pe, er, es, şe, te, u, ü, ve, ye, ze.

## Foreign names and brands

TTS engines read Azerbaijani letter by letter, so English spelling often sounds wrong. Offer an Azerbaijani respelling and list it in the changes list:
iPhone → Ayfon · WhatsApp → Vatsap · Instagram → İnstaqram · YouTube → Yutub · Google → Qugl · TikTok → Tiktok · Scam Checker → Skem Çeker · Claude → Klod · email → imeyl · online → onlayn.
Some engines (Gemini, ElevenLabs) may read the English spelling correctly; keep the original if the user prefers and test it.

## Emoji, symbols, URLs

- Remove emoji. If an emoji carries meaning (🔥 = "hot deal"), say it in words or drop it.
- "&" → və, "+" → artı (or "üstəgəl" in maths), "/" → "bölü" in maths, "slash" in URLs, "#" → heşteq.
- URLs and e-mails: don't read them in full; say "linki bioda tapın" or spell the short domain (codelady nöqtə az).

## Restoring Azerbaijani letters

Typical swaps when typed without Azerbaijani letters:

| Typed | Correct | Examples |
|---|---|---|
| e | ə | men → mən, ve → və, seher → səhər, gozel → gözəl |
| s / sh | ş | sexs → şəxs, danisaq → danışaq, shirket → şirkət |
| c / ch | ç | cox → çox, chox → çox |
| g / gh | ğ | dag → dağ, yagish → yağış |
| i | ı | qiz → qız, yaxsi → yaxşı, haqqinda → haqqında |
| o / u | ö / ü | gormek → görmək, gun → gün |
| k (Turkish keyboard) | q | kiz → qız, kardaş → qardaş (only if the text is otherwise Azerbaijani) |
| ä / a' | ə | män → mən |

**Cyrillic (old Azerbaijani alphabet):** а a · б b · в v · г q · ғ ğ · д d · е e · ә ə · ж j · з z · и i · ы ı · ј y · к k · ҝ g · л l · м m · н n · о o · ө ö · п p · р r · с s · т t · у u · ү ü · ф f · х x · һ h · ч ç · ҹ c · ш ş.
Russian-keyboard approximations: э/е → e or ə, й → y, ю → yu, я → ya, ё → yo, ц → ts, щ → şç; г can be q **or** g, у can be u **or** ü, о can be o **or** ö: decide by the word.

Rules: change only when the word is clearly Azerbaijani; never silently change **names** (Ali/Əli, Elnur, Aysel); mark doubtful ones with `?`.
