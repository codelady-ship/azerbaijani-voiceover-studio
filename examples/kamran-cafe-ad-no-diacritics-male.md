# Example 2: Café ad typed without Azerbaijani letters (male, commercial, preset 10 Ceyhun)

*Fictional café, address and phone number.*

## Request

> Kafemiz ucun reklam sesi lazimdir, kisi sesi, zarafatli olsun. Musteri ucun istifade edecem. Metn: "Seher yemeyi saat 8:00-dan 11:30-a qeder! Cay + 2 qutab cemi 4,50 AZN. Unvan: Xetai pr. 15. Sifaris: 055 987 65 43"

## Answer

Bu reklamdır (kommersiya), ona görə ElevenLabs-in pulsuz planı olmaz. Gemini və ya Azure istifadə et.

Səs: Kişi · Stil: 10 Ceyhun (zarafatcıl vloq) · 35 söz ≈ 15 s

```text
Səhər yeməyi saat səkkizdən on bir otuza qədər! Çay və iki qutab, cəmi dörd manat əlli qəpik. Ünvan: Xətai prospekti, on beş. Sifariş: sıfır əlli beş, doqquz yüz səksən yeddi, altmış beş, qırx üç.
```

Dəyişikliklər: Seher yemeyi → Səhər yeməyi · Cay → Çay · cemi → cəmi · Unvan → Ünvan · Xetai → Xətai · Sifaris → Sifariş · 8:00-dan → səkkizdən · 11:30-a → on bir otuza · + → və · 2 → iki · 4,50 AZN → dörd manat əlli qəpik · pr. 15 → prospekti, on beş · telefon qruplarla oxunur

Optional comic hook for the start: "Ac qalmısan? Qutab səni gözləyir." It adds 5 words, about 2 s.

**Gemini (AI Studio):** 1) aistudio.google.com → Generate speech. 2) Səs: **Puck** (və ya Charon). Bloku yapışdır. 3) Run → dinlə → yüklə.

```
Azerbaijani, native Baku accent, casual and colloquial. Playful, funny young male vlogger. Fast pace about 145 words per minute, lively ups and downs, but read the phone number slowly and clearly:
Səhər yeməyi saat səkkizdən on bir otuza qədər! Çay və iki qutab, cəmi dörd manat əlli qəpik. Ünvan: Xətai prospekti, on beş. Sifariş: sıfır əlli beş, doqquz yüz səksən yeddi, altmış beş, qırx üç.
```

**Azure (commercial-safe, Babek):** speech.microsoft.com → Audio Content Creation → New file → SSML view → paste → Play → Export.

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="az-AZ">
  <voice name="az-AZ-BabekNeural">
    <prosody rate="+15%" pitch="+5%">Səhər yeməyi saat səkkizdən on bir otuza qədər!</prosody>
    <break time="300ms"/>
    <prosody rate="+12%" pitch="+3%">Çay və iki qutab,<break time="150ms"/> cəmi dörd manat əlli qəpik.</prosody>
    <break time="300ms"/>
    <prosody rate="+5%" pitch="+0%">Ünvan: Xətai prospekti,<break time="150ms"/> on beş.</prosody>
    <break time="400ms"/>
    <prosody rate="-10%" pitch="+0%">Sifariş: sıfır əlli beş,<break time="200ms"/> doqquz yüz səksən yeddi,<break time="200ms"/> altmış beş,<break time="200ms"/> qırx üç.</prosody>
  </voice>
</speak>
```

Kommersiya: Gemini pulsuz versiyada qadağan etmir. Məlumatlar Google tərəfindən istifadə oluna bilər və səsdə SynthID nişanı olur. Azure F0 kommersiya üçün açıqdır, amma qeydiyyat üçün kart lazımdır. ElevenLabs Free kommersiya üçün olmaz, Starter planı (≈ $6/ay) lazımdır.
AI qeydi: "Reklamdakı səs süni intellektlə yaradılıb."

Dinləyəndə "ş" və "ğ" səslərinə fikir ver: Babek bəzən onları "s" və "q" kimi deyir. Belə olsa, Gemini-də Puck səsini sına.
