#!/usr/bin/env python3
"""Validate recipe title metadata for The Kitchen Table.

Schema:
- Every recipe detail page should declare recipe-title-lang.
- Every non-English recipe detail page must also declare recipe-title-en.

Examples:
<meta name="recipe-title-lang" content="it">
<meta name="recipe-title-en" content="Pasta with Eggplant and Ricotta Salata">

Use --strict to fail when recipe-title-lang is missing. Without --strict,
legacy pages without language metadata are reported as warnings so the
existing catalog can be migrated progressively.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RECIPE_MARKER = 'class="section recipe-detail"'
META_RE = re.compile(
    r'<meta\s+name=["\'](?P<name>recipe-title-(?:lang|en))["\']\s+content=["\'](?P<value>[^"\']*)["\']\s*/?>',
    re.I,
)


def read_meta(text: str) -> dict[str, str]:
    return {
        match.group("name").lower(): match.group("value").strip()
        for match in META_RE.finditer(text)
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--strict", action="store_true")
    parser.add_argument("files", nargs="*")
    args = parser.parse_args()

    paths = [ROOT / name for name in args.files] if args.files else sorted(ROOT.glob("*.html"))
    errors: list[str] = []
    warnings: list[str] = []
    checked = 0

    for path in paths:
        if not path.exists() or path.suffix.lower() != ".html":
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        if RECIPE_MARKER not in text:
            continue

        checked += 1
        meta = read_meta(text)
        lang = meta.get("recipe-title-lang", "").lower()
        english = meta.get("recipe-title-en", "")

        if not lang:
            message = f"{path.name}: missing recipe-title-lang"
            (errors if args.strict else warnings).append(message)
            continue

        if lang != "en" and not english:
            errors.append(
                f"{path.name}: non-English title ({lang}) missing recipe-title-en"
            )

    for message in warnings:
        print("WARNING:", message)
    for message in errors:
        print("ERROR:", message)

    print(
        f"Validated {checked} recipe page(s): "
        f"{len(errors)} error(s), {len(warnings)} warning(s)."
    )
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
