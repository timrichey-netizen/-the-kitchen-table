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
- Full English: four published recipes.
- Spanish/French: shared interface dictionaries; Bottarga and Pasta alla Norma have first-pass translated ingredients, preparation, notes, history, and card summaries; both remain in editorial review.
- Other three Italian test recipes: full Spanish/French recipe translations are not yet provided.
- Beyond four test recipes: recipes are not currently published as pages, so no verified multilingual catalog exists.

## Scaling design
For each new published recipe, import its canonical source row, build separate `es` and `fr` content payloads, run completeness and quantity checks, have an editorial language review, then enable the language switcher's translated content only after approval.
