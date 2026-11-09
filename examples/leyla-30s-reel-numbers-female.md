# Example 1: 30-second Reel with numbers and emoji (female, preset 1)

*Fictional user and figures. The statistic is made up for the example.*

## Request

> 30 saniyəlik Reel üçün səsləndirmə hazırla, qadın səsi: "Bilirdinmi? Azərbaycanda 2025-ci ildə 1,2 milyon nəfər onlayn kursa yazılıb 🤯 Amma 70%-i kursu bitirmir. Səbəb? Plan yoxdur. Bizim 4 həftəlik planla hər gün cəmi 20 dəqiqə ayır. Qeydiyyat 1 dekabra qədər pulsuzdur. Linki bioda tap!"

## Answer

Mətni kopyala → AI Studio-da **Sulafat** səsini seç → aşağıdakı bloku yapışdır.

Səs: Qadın · Stil: 1 Səmimi Bələdçi · 43 söz ≈ 26,5 s (büdcə: 30 s ≈ 57 söz: uyğundur)

```text
Bilirdinmi? Azərbaycanda iki min iyirmi beşinci ildə bir milyon iki yüz min nəfər onlayn kursa yazılıb. Amma onların yetmiş faizi kursu bitirmir. Səbəb? Plan yoxdur. Bizim dörd həftəlik planla hər gün cəmi iyirmi dəqiqə ayır. Qeydiyyat bir dekabra qədər pulsuzdur. Linki bioda tap!
```

Dəyişikliklər: 2025-ci → iki min iyirmi beşinci · 1,2 milyon → bir milyon iki yüz min · 🤯 silindi · 70%-i → onların yetmiş faizi ("onların" aydınlıq üçün əlavə edildi) · 4 → dörd · 20 → iyirmi · 1 dekabra → bir dekabra

| Vaxt | Səhnə | Mətn | Söz |
|---|---|---|---|
| 0,5–1,5 s | Hook | Bilirdinmi? | 1 |
| 1,5–10 s | Fakt | Azərbaycanda … yazılıb. | 15 |
| 10–13,5 s | Problem | Amma onların yetmiş faizi kursu bitirmir. | 6 |
| 13,5–16 s | Səbəb | Səbəb? Plan yoxdur. | 3 |
| 16–21,5 s | Həll | Bizim dörd həftəlik planla … ayır. | 10 |
| 21,5–24,5 s | Təklif | Qeydiyyat bir dekabra qədər pulsuzdur. | 5 |
| 24,5–26,5 s | CTA | Linki bioda tap! | 3 |

Son 3,5 saniyə son kart (logo, link) üçün boş qalır.

**Gemini (AI Studio):** 1) aistudio.google.com → Generate speech. 2) Səs: Sulafat (kişi variantı: Charon). Bloku yapışdır. 3) Run → dinlə → yüklə.

```
Azerbaijani with a native Baku accent (not Turkish). Warm, confident, friendly explainer with a slight smile. Brisk but clear pace, about 110–115 words per minute. Short pause after commas, clear pause after each sentence. Questions rise on the last word. Short commands are firm and falling:
Bilirdinmi? Azərbaycanda iki min iyirmi beşinci ildə bir milyon iki yüz min nəfər onlayn kursa yazılıb. Amma onların yetmiş faizi kursu bitirmir. Səbəb? Plan yoxdur. Bizim dörd həftəlik planla hər gün cəmi iyirmi dəqiqə ayır. Qeydiyyat bir dekabra qədər pulsuzdur. Linki bioda tap!
```

Kommersiya: Gemini-nin pulsuz versiyasında qadağa yoxdur, amma Google pulsuz istifadədəki məlumatları məhsullarını yaxşılaşdırmaq üçün istifadə edə bilər. Səsdə görünməz SynthID nişanı olur.
AI qeydi: "Səs süni intellektlə yaradılıb."

ElevenLabs / Azure variantı lazımdır? Ya da başqa stil (1–10)?
