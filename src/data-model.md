# Rateriet – datamodell (arbeidsutkast)

Bygger på det som funket i SnusRate (rating, ranking, oppdagelse), tilpasset parfyme.
Mål for v1: BEGGE vinkler fra start – (1) rating + demografiske topplister, (2) dupe-finner.

## Collection: `perfumes`  (produktkatalogen)
Hver parfyme er ett dokument:

| Felt              | Type      | Eksempel                          | Hvorfor / brukes til |
|-------------------|-----------|-----------------------------------|----------------------|
| `id`              | string    | "aventus-creed"                   | nøkkel |
| `name`            | string    | "Aventus"                         | visning, søk |
| `house`           | string    | "Creed"                           | "hus" (merke), filtrering |
| `concentration`   | string    | "EdP"                             | EdT / EdP / Parfum / EdC |
| `gender`          | string    | "Masculine"                       | Masculine / Feminine / Unisex |
| `year`            | number    | 2010                              | visning, filtrering |
| `accords`         | string[]  | ["fruity","smoky","woody"]        | duft-profil, "lukter som"-match |
| `topNotes`        | string[]  | ["Pineapple","Bergamot"]          | notepyramide |
| `heartNotes`      | string[]  | ["Birch","Patchouli"]             | notepyramide |
| `baseNotes`       | string[]  | ["Musk","Oakmoss","Vanilla"]      | notepyramide |
| `description`     | string    | "Fruktig-røykfylt signaturduft…"  | visning |
| `priceClass`      | string    | "luxury"                          | budget / mid / luxury – for dupe-vinkel |
| `dupeOf`          | string|null | null                             | hvis denne ER en dupe: id-en til originalen |
| `imageUrl`        | string    | ""                                | valgfritt |

### Dupe-mekanikken (det vi ble enige om)
- En billig parfyme får `dupeOf: "aventus-creed"`.
- På Aventus-siden viser vi automatisk alle som har `dupeOf == "aventus-creed"`.
- Da får du "Duper av Aventus"-lister gratis, og en egen dupe-utforsker.

## Collection: `ratings`  (brukernes vurderinger)
| Felt          | Type    | Eksempel        | Brukes til |
|---------------|---------|-----------------|------------|
| `perfumeId`   | string  | "aventus-creed" | kobling |
| `userId`      | string  | uid             | kobling |
| `stars`       | number  | 4               | snittscore |
| `longevity`   | number  | 8               | "holdbarhet" 1-10 (parfyme-spesifikt!) |
| `sillage`     | number  | 7               | "projeksjon/sillage" 1-10 |
| `text`        | string  | "Nydelig om…"   | anmeldelse |
| `createdAt`   | string  | ISO             | sortering |

## Demografiske topplister (din idé)
Krever ingen ny collection – vi utleder dem fra `users` + `ratings`.
- `users` har allerede (fra SnusRate-modellen): `gender`, `age` (eller fødselsår), `country`.
- Toppliste = snitt-stars for parfymer, filtrert på vurderinger fra brukere som matcher
  f.eks. {gender: "Male", age 18–30}.
- Eksempel: "Topp 10 blant menn 18–30" / "Topp 10 blant kvinner 30+".
- Dette er den ferske, delbare "kom tilbake"-verdien.

## Pris (fase 2 – kobles på når vi har brukere)
Egen collection `prices`: {perfumeId, store, price, url, updatedAt}.
Bygges IKKE i v1. Datamodellen over har `priceClass` så dupe-vinkelen funker uten ekte priser ennå.

---
## Rekkefølge for bygging
1. Katalog + ratings + visning  (gjenbruk fra SnusRate)
2. Dupe-visning (dupeOf-koblingen)
3. Demografiske topplister (utledet fra users+ratings)
4. (senere) ekte priser + prisvarsler
