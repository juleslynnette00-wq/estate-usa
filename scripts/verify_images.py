#!/usr/bin/env python3
"""Verify that all image URLs are reachable (HTTP 200) and write a filtered
version containing only valid URLs."""

import json
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed


def check_url(url: str) -> tuple[str, int]:
    try:
        result = subprocess.run(
            ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}",
             "-L", "--max-time", "15", url],
            capture_output=True, text=True
        )
        return url, int(result.stdout.strip())
    except Exception as e:
        return url, 0


def main():
    with open("/home/z/my-project/src/data/image_pools.json") as f:
        pools = json.load(f)

    all_urls = []
    for cat, urls in pools.items():
        for u in urls:
            all_urls.append((cat, u))

    print(f"Verifying {len(all_urls)} URLs...")
    results = {}
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(check_url, u): (cat, u) for cat, u in all_urls}
        for future in as_completed(futures):
            cat, u = futures[future]
            _, status = future.result()
            results.setdefault(cat, {})[u] = status

    # Filter pools to keep only 200 status
    filtered = {}
    removed = 0
    for cat, urls in pools.items():
        keep = [u for u in urls if results.get(cat, {}).get(u) == 200]
        removed += len(urls) - len(keep)
        filtered[cat] = keep

    print(f"Removed {removed} URLs (non-200)")
    for cat, urls in sorted(filtered.items()):
        print(f"  {cat}: {len(urls)}")

    with open("/home/z/my-project/src/data/image_pools.json", "w") as f:
        json.dump(filtered, f, indent=2)
    print("Updated image_pools.json")


if __name__ == "__main__":
    main()
