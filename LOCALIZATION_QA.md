# Recipe localization publishing checklist

## Source of truth
- Original dish name: Sheet1 column P.
- English dish name: Sheet1 column Q.
- Ingredients: Sheet1 column C (US customary).
- Directions: Sheet1 column S.
- Other page fields: governed by the Data Dictionary sheet.
- The existing Italian source in columns B/R may help verification but cannot be passed off as Spanish or French.

## Publishing gate for each locale
1. Translate all visible recipe content: card description, history, ingredients, equipment, every preparation step, service, chef note, variations, serving/time labels, allergens and classifications.
2. Keep identical quantities, order, temperatures, ingredient identities and cooking times, with units expressly identified.
3. Compare every translated ingredient against the English source; compare numbered directions one-to-one.
4. Validate no paragraphs, recipe lines, ingredient lines or instructions are missing; proofread by someone proficient in the target language before treating the translation as verified.
5. Store exact-string translations in `recipe-locales.js`, or move to per-slug, per-language records when scaling. Keep a review status for each slug/language.
6. Do not hide English fallback or show a claim of complete translation while gaps remain.

## Current coverage
- English: full content on the four published recipe pages.
- Spanish and French: first-pass translations added for the four published Italian recipes (Lasagna Napoletana, Vincisgrassi, Pasta alla Norma, Pasta con la Bottarga).
- Automated completeness audit: all ingredient/equipment/direction lines are present in both languages, and the publish checks pass. Run `node tools/audit-recipe-locales.js`.
- Every Spanish/French recipe remains marked **draft / editorial review** until checked by a proficient human editor. Automated coverage is not a certificate of translation accuracy.
- Legacy guides and all other unpublished recipe catalog rows do not have fully translated content.
- Interface strings beyond the existing bilingual dictionaries may still be untranslated and require continuing inventory.

## Scaling design
For each new published recipe, import its canonical source row, build separate `es` and `fr` content payloads, run completeness and quantity checks, have an editorial language review, then enable the language switcher's translated content only after approval.
