# Puducherry demo data: coverage and provenance

## Demo coverage
- **Geographic focus:** Puducherry city and nearby suburbs/areas represented by approximate map anchors.
- **Date coverage:** 1 January 2026 through 12 October 2026 (inclusive).
- **Generated records:** 5,000 synthetic incidents, reproducible with seed `20261012`.
- **CSV sample:** `sample-incidents.csv` contains 250 illustrative rows.

## Critical distinction
The 5,000 records are **not official police data**. Dates, categories, severity, status, and coordinates are generated for software demonstration. The generator intentionally creates useful distributions for charting and clustering; those distributions must not be interpreted as real crime prevalence, real incident locations, or validated hotspots. The approximate area anchors only help the map look geographically relevant.

## Public sources reviewed
1. **Puducherry Police — Crime Statistics archive:** https://police.py.gov.in/Crime%20Statistics/Puducherry%20Crime%20Statistic%20Main.html
   - The public archive page surfaced historical crime-statistics statements, not a complete downloadable, geocoded 2026 incident dataset.
2. **Puducherry Police — Crime statement 2022–2023:** https://police.py.gov.in/Crime%20Statistics/Crime%20Stat%202023/Crime%20statement%20-%20Puducherry%20Region%20-%202022-2023.html
   - Contains historical aggregate reported/detected counts. These older totals are not mixed into the synthetic 2026 incident records.
3. **Puducherry Police — Press releases:** https://police.py.gov.in/press_release.php
   - Public updates provide event/administrative context but do not amount to a complete, consistently geocoded incident feed for the requested period.
4. **Puducherry Police homepage / latest updates:** https://police.py.gov.in/index.php
   - Official police updates and service links.

## How to make this dataset genuinely official
Obtain an authorized open dataset or written permission / data-sharing arrangement from Puducherry Police or the relevant government department. Ideally request a privacy-reviewed CSV with incident date, broad offence category, police-station jurisdiction or approved area code, status/aggregate counts, and coordinates only if authorized. Remove names, phone numbers, exact residential addresses, victim details, and other personal information. Preserve source URL, publication date, retrieval date, geographic precision, and definitions in a provenance field. Do not geocode sensitive incident addresses or infer exact locations from news articles.

## Responsible interpretation
CrimeMap's hotspot, similarity, and area-review scores are exploratory demonstrations. They are not official statistics, validated predictions, offender identification, causal findings, or dispatch instructions.
