#!/usr/bin/env python3
"""
Flatten nested `unit` arrays in the menu JSON so Firestore won't reject nested arrays.
Input: backup/09.18.2025.json
Output: backup/09.18.2025.flattened.json

For each item in menu[].items[], transforms `unit` like:
- [ [size, price], ... ]  -> [ {"size": size, "option": null, "price": price}, ... ]
- [ [size, [ [option, price], ... ]], ... ] -> for each option produce {"size": size, "option": option, "price": price}

The script preserves all other keys and writes pretty JSON.
"""
from pathlib import Path
import json
import sys
import argparse
from typing import Any, Dict, List, Optional, Union


def flatten_unit_field(unit: Any, normalize_price: bool = False) -> Any:
    """Return a flattened version of a unit field.

    If unit is already a list of objects with 'size' or 'price', return as-is.
    If unit is a nested array, transform into list of {size, option, price}.
    """
    if not isinstance(unit, list):
        return unit

    # already flattened if entries are dicts with size/price keys
    if unit and isinstance(unit[0], dict) and ('size' in unit[0] or 'price' in unit[0]):
        return unit

    out: List[Dict[str, Optional[Union[str, float]]]] = []
    for entry in unit:
        # entry should be [size, price] or [size, [ [option, price], ... ]]
        if not isinstance(entry, list) or len(entry) == 0:
            # unsupported shape: preserve as-is by appending a size-only object
            out.append({'size': str(entry) if entry is not None else None, 'option': None, 'price': None})
            continue
        size = entry[0]
        second = entry[1] if len(entry) > 1 else None
        if isinstance(second, list):
            for opt in second:
                if isinstance(opt, list) and len(opt) >= 2:
                    option = opt[0]
                    price = opt[1]
                    price_val = _normalize_price(price) if normalize_price else price
                    out.append({'size': size, 'option': option, 'price': price_val})
                else:
                    out.append({'size': size, 'option': opt, 'price': None})
        else:
            price_val = _normalize_price(second) if normalize_price else second
            out.append({'size': size, 'option': None, 'price': price_val})
    return out


def _normalize_price(price: Any) -> Optional[Union[str, float]]:
    """Try to coerce price to a number or a normalized string; return original if not possible."""
    if price is None:
        return None
    try:
        # Accept strings like '4.90' or numbers
        n = float(str(price).strip())
        # Keep as string to match existing code expectations, but format to two decimals
        return f"{n:.2f}"
    except Exception:
        return price


def normalize_whole_doc(doc: Any, normalize_price: bool = False) -> Any:
    """Normalize all unit fields in a document.

    Supports three shapes:
    - { 'menu': [ { 'items': [...] }, ... ] } (original backup)
    - [ item, item, ... ] (flat list of items)
    - { 'menuData': [ item, ... ] } or other container objects
    """
    if isinstance(doc, dict) and isinstance(doc.get('menu'), list):
        d = json.loads(json.dumps(doc))  # deep copy
        for cat in d.get('menu', []):
            items = cat.get('items')
            if isinstance(items, list):
                for it in items:
                    if 'unit' in it:
                        it['unit'] = flatten_unit_field(it['unit'], normalize_price=normalize_price)
        return d

    if isinstance(doc, list):
        return [(_normalize_item(it, normalize_price)) for it in doc]

    if isinstance(doc, dict) and isinstance(doc.get('menuData'), list):
        d = json.loads(json.dumps(doc))
        d['menuData'] = [(_normalize_item(it, normalize_price)) for it in d['menuData']]
        return d

    # fallback: try to find any lists of items under top-level keys
    d = json.loads(json.dumps(doc))
    for k, v in list(d.items()):
        if isinstance(v, list) and v and isinstance(v[0], dict) and 'name' in v[0]:
            d[k] = [(_normalize_item(it, normalize_price)) for it in v]
    return d


def _normalize_item(it: Any, normalize_price: bool = False) -> Any:
    if not isinstance(it, dict):
        return it
    copy = dict(it)
    if 'unit' in copy:
        copy['unit'] = flatten_unit_field(copy['unit'], normalize_price=normalize_price)
    return copy


def main(argv: Optional[List[str]] = None) -> int:
    p = argparse.ArgumentParser(description='Flatten nested "unit" arrays for Firestore compatibility')
    p.add_argument('input', nargs='?', default=None, help='Input JSON file (default: backup/09.18.2025.json)')
    p.add_argument('-o', '--output', help='Output JSON file (default: input.flattened.json)')
    p.add_argument('--normalize-price', action='store_true', help='Format numeric prices to two decimal places (as strings)')
    p.add_argument('--dry-run', action='store_true', help="Don't write output, just report changes")
    args = p.parse_args(argv)

    root = Path(__file__).resolve().parents[1]
    input_path = Path(args.input) if args.input else root / 'backup' / '09.18.2025.json'
    if not input_path.exists():
        print(f'Input file not found: {input_path}')
        return 2

    try:
        with input_path.open('r', encoding='utf-8') as f:
            doc = json.load(f)
    except Exception as e:
        print('Failed to parse JSON:', e)
        return 3

    normalized = normalize_whole_doc(doc, normalize_price=args.normalize_price)

    out_path = Path(args.output) if args.output else input_path.with_name(input_path.stem + '.flattened.json')
    if args.dry_run:
        print(f'DRY-RUN: would write normalized file to: {out_path}')
        return 0

    try:
        with out_path.open('w', encoding='utf-8') as f:
            json.dump(normalized, f, ensure_ascii=False, indent=2)
        print(f'Wrote flattened file to: {out_path}')
    except Exception as e:
        print('Failed to write output:', e)
        return 4

    return 0


if __name__ == '__main__':
    raise SystemExit(main())
