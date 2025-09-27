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

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / 'backup' / '09.18.2025.json'
OUTPUT = ROOT / 'backup' / '09.18.2025.flattened.json'

if not INPUT.exists():
    print(f"Input file not found: {INPUT}")
    sys.exit(2)

with INPUT.open('r', encoding='utf-8') as f:
    doc = json.load(f)

menu = doc.get('menu')
if not isinstance(menu, list):
    print('No menu found or menu is not a list; exiting.')
    sys.exit(1)

changed = 0
entries_total = 0

for cat in menu:
    items = cat.get('items')
    if not isinstance(items, list):
        continue
    for item in items:
        unit = item.get('unit')
        if not isinstance(unit, list):
            continue
        new_units = []
        for entry in unit:
            entries_total += 1
            # Expect entry to be a list like [size, price] or [size, [ [option, price], ... ]]
            if not isinstance(entry, list) or len(entry) == 0:
                # Unknown shape, skip
                continue
            size = entry[0]
            if len(entry) < 2:
                # Only size provided? store with null price
                new_units.append({
                    'size': size,
                    'option': None,
                    'price': None
                })
                changed += 1
                continue
            second = entry[1]
            # If second is a list of option-price pairs
            if isinstance(second, list):
                # second should be a list of [option, price]
                for opt in second:
                    if isinstance(opt, list) and len(opt) >= 2:
                        option = opt[0]
                        price = opt[1]
                        new_units.append({
                            'size': size,
                            'option': option,
                            'price': price
                        })
                    else:
                        # If option is scalar, treat as option text with null price
                        new_units.append({
                            'size': size,
                            'option': opt,
                            'price': None
                        })
                changed += 1
            else:
                # second is scalar price
                new_units.append({
                    'size': size,
                    'option': None,
                    'price': second
                })
                changed += 1
        # Replace unit only if transformation produced anything
        if new_units:
            item['unit'] = new_units

print(f"Processed menu: total unit entries examined: {entries_total}, unit fields transformed: {changed}")

# Write output
with OUTPUT.open('w', encoding='utf-8') as f:
    json.dump(doc, f, ensure_ascii=False, indent=2)

print(f"Wrote flattened file to: {OUTPUT}")
