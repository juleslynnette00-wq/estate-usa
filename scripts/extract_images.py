#!/usr/bin/env python3
"""Extract image URLs from all /tmp/img_*.json files and generate a JSON
file with categorized image pools for the real-estate site."""

import json
import os
import re
from pathlib import Path

CATEGORY_MAP = {
    "img1": "modern_family_exterior",
    "img_listing": "listing_exterior",
    "img_suburban": "suburban_exterior",
    "img_suburban1": "suburban_exterior",
    "img_luxury": "luxury_villa",
    "img_mansion": "luxury_villa",
    "img_condo": "condo_building",
    "img_highrise": "condo_building",
    "img_cottage": "cottage",
    "img_bungalow": "cottage",
    "img_ranch": "ranch",
    "img_ranch2": "ranch",
    "img_ranch3": "ranch",
    "img_townhouse": "townhouse",
    "img_townhouse2": "townhouse",
    "img_craftsman": "craftsman",
    "img_craftsman2": "craftsman",
    "img_victorian": "victorian",
    "img_farmhouse": "farmhouse",
    "img_loft": "loft",
    "img_midcentury": "midcentury",
    "img_colonial": "colonial",
    "img_starter": "starter_home",
    "img_twostory": "two_story",
    "img_tiny": "tiny_house",
    "img_duplex": "duplex",
    "img_penthouse": "penthouse",
    "img_glass": "glass_house",
    "img_aframe": "a_frame",
    "img_beach": "beach_house",
    "img_lakefront": "lakefront",
    "img_mountain": "mountain_house",
    "img_entry": "house_entry",
    "img_porch2": "house_entry",
    "img_balcony": "balcony",
    "img_garage": "house_garage",
    "img_modern1": "modern_family_exterior",
    "img_living": "interior_living",
    "img_living2": "interior_living",
    "img_kitchen": "interior_kitchen",
    "img_kitchen2": "interior_kitchen",
    "img_kitchen3": "interior_kitchen",
    "img_bedroom": "interior_bedroom",
    "img_bedroom2": "interior_bedroom",
    "img_bedroom3": "interior_bedroom",
    "img_bathroom": "interior_bathroom",
    "img_bath2": "interior_bathroom",
    "img_dining": "interior_dining",
    "img_dining2": "interior_dining",
    "img_office": "interior_office",
    "img_office2": "interior_office",
    "img_stairs": "interior_stairs",
    "img_int_stairs2": "interior_stairs",
    "img_cabin_int": "interior_cabin",
    "img_theater": "interior_theater",
    "img_closet": "interior_closet",
    "img_yard": "outdoor_yard",
    "img_yard2": "outdoor_yard",
    "img_garden": "outdoor_garden",
    "img_porch": "outdoor_porch",
    "img_pool": "outdoor_pool",
}

EXTERIOR_CATEGORIES = {
    "modern_family_exterior", "listing_exterior", "suburban_exterior",
    "luxury_villa", "condo_building", "cottage", "ranch",
    "townhouse", "craftsman", "victorian", "farmhouse", "loft",
    "midcentury", "colonial", "starter_home", "two_story",
    "tiny_house", "duplex", "penthouse",
    "glass_house", "a_frame", "beach_house", "lakefront",
    "mountain_house", "house_entry", "balcony", "house_garage",
}

INTERIOR_CATEGORIES = {
    "interior_living", "interior_kitchen", "interior_bedroom",
    "interior_bathroom", "interior_dining", "interior_office",
    "interior_stairs", "interior_cabin", "interior_theater",
    "interior_closet",
}

OUTDOOR_CATEGORIES = {"outdoor_yard", "outdoor_garden", "outdoor_porch", "outdoor_pool"}


def extract_urls(json_text: str) -> list[str]:
    urls = []
    pattern = re.compile(r'"original_url":\s*"(https?://[^"]+)"')
    for m in pattern.finditer(json_text):
        urls.append(m.group(1))
    return urls


def main():
    pools: dict[str, list[str]] = {}

    for fname in sorted(os.listdir("/tmp")):
        if not fname.endswith(".json"):
            continue
        if not fname.startswith("img"):
            continue
        key = fname.replace(".json", "")
        if key not in CATEGORY_MAP:
            continue
        path = f"/tmp/{fname}"
        try:
            with open(path) as f:
                content = f.read()
            urls = extract_urls(content)
            cat = CATEGORY_MAP[key]
            if cat not in pools:
                pools[cat] = []
            pools[cat].extend(urls)
        except Exception as e:
            print(f"Error reading {path}: {e}")

    # Dedupe within each pool
    for cat, urls in pools.items():
        pools[cat] = list(dict.fromkeys(urls))

    # Stats
    total = sum(len(v) for v in pools.values())
    print(f"Total images collected: {total}")
    for cat, urls in sorted(pools.items()):
        kind = (
            "EXTERIOR" if cat in EXTERIOR_CATEGORIES
            else "INTERIOR" if cat in INTERIOR_CATEGORIES
            else "OUTDOOR"
        )
        print(f"  [{kind:8}] {cat}: {len(urls)}")

    out_path = "/home/z/my-project/src/data/image_pools.json"
    Path(os.path.dirname(out_path)).mkdir(parents=True, exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(pools, f, indent=2)
    print(f"Saved to {out_path}")


if __name__ == "__main__":
    main()
