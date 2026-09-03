# Thailand Administrative Address Reference Data

This repository vendors a static, optimized version of Thai administrative geography (Provinces, Districts, Subdistricts, and Postal Codes) to provide UX assistance in Customer Web forms.

## Upstream Provenance

- **Source Repository**: [thailand-geography-data/thailand-geography-json](https://github.com/thailand-geography-data/thailand-geography-json)
- **Pinned Commit**: `b8b3fb91c7df1129ff5b43cb46f7fcffadd2156b`
- **Commit Date**: 2026-06-23T11:46:56Z
- **License**: MIT

## Local Static-File Structure

The data is hosted as static JSON files in `public/reference-data/thailand/`:
- `metadata.json`: Information about the dataset and snapshot.
- `provinces.json`: A lightweight array of all 77 Provinces.
- `provinces/<provinceCode>.json`: Detailed data for a specific province, containing its districts, subdistricts, and postal codes.

**Why is it split?**
To minimize client bundle size and network transfer. The client only downloads the small `provinces.json` on initial load. The detailed hierarchical data is fetched lazy-loaded only when the user selects a specific Province, and cached in memory. Runtime Customer Web remains fully local/static and performs no GitHub calls.

## How Data is Transformed

The raw upstream dataset contains separate flat lists for provinces, districts, and subdistricts. Our script:
1. Groups subdistricts under their respective districts.
2. Groups districts under their respective provinces.
3. Groups multiple postal codes into a string array (`postalCodes: string[]`).
4. Retains only the codes, Thai names, English names, and postal codes.
5. Saves them into deterministic, minimal JSON files with no indentation to reduce size.

## Limitations

- **UX Assistance Only**: This dataset is used strictly to autofill/filter form dropdowns to assist user entry.
- **Not Legal Verification**: It does not replace or perform legal address verification.
- Users can still manually override or input custom values.

## How to Update

To fetch a new snapshot from the upstream repository, use the developer-only / maintenance-only generation script:
1. Update `COMMIT_SHA` and `COMMIT_DATE` in `scripts/update-thailand-geography.ts` to the desired upstream commit.
2. Run the update script:
   ```bash
   npx tsc scripts/update-thailand-geography.ts --esModuleInterop --module commonjs
   node scripts/update-thailand-geography.js
   ```
3. Run the validation script to ensure the generated data is structurally sound:
   ```bash
   npx tsc scripts/validate-thailand-address-data.ts --esModuleInterop --module commonjs
   node scripts/validate-thailand-address-data.js
   ```

## License and Attribution

The upstream dataset is licensed under the MIT License:

```
MIT License

Copyright (c) 2023-Present Joe Takara

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
