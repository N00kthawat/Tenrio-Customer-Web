import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(__dirname, '../public/reference-data/thailand');
const PROVINCES_OUT = path.join(OUT_DIR, 'provinces.json');
const PROVINCES_DIR = path.join(OUT_DIR, 'provinces');
const METADATA_OUT = path.join(OUT_DIR, 'metadata.json');

function validate() {
  console.log("Starting Thailand address data validation...");
  
  if (!fs.existsSync(PROVINCES_OUT)) {
    throw new Error("provinces.json not found");
  }

  const provinces = JSON.parse(fs.readFileSync(PROVINCES_OUT, 'utf-8'));
  const metadata = JSON.parse(fs.readFileSync(METADATA_OUT, 'utf-8'));
  
  if (provinces.length !== 77) {
    throw new Error(`Expected 77 provinces, got ${provinces.length}`);
  }
  
  const provinceCodes = new Set<string>();
  const districtCodes = new Set<string>();
  const subdistrictCodes = new Set<string>();

  for (const prov of provinces) {
    if (provinceCodes.has(prov.code)) {
      throw new Error(`Duplicate province code: ${prov.code}`);
    }
    provinceCodes.add(prov.code);
    
    if (!prov.nameTh || prov.nameTh.trim() === '') {
      throw new Error(`Empty Thai name for province ${prov.code}`);
    }
    
    const detailPath = path.join(PROVINCES_DIR, `${prov.code}.json`);
    if (!fs.existsSync(detailPath)) {
      throw new Error(`Missing detail file for province ${prov.code}`);
    }
    
    const detail = JSON.parse(fs.readFileSync(detailPath, 'utf-8'));
    
    if (detail.code !== prov.code) {
      throw new Error(`Province detail code ${detail.code} does not match ${prov.code}`);
    }
    
    for (const dist of detail.districts) {
      if (districtCodes.has(dist.code)) {
        throw new Error(`Duplicate district code: ${dist.code}`);
      }
      districtCodes.add(dist.code);
      
      if (!dist.nameTh || dist.nameTh.trim() === '') {
        throw new Error(`Empty Thai name for district ${dist.code}`);
      }
      
      for (const sub of dist.subdistricts) {
        if (subdistrictCodes.has(sub.code)) {
          throw new Error(`Duplicate subdistrict code: ${sub.code}`);
        }
        subdistrictCodes.add(sub.code);
        
        if (!sub.nameTh || sub.nameTh.trim() === '') {
          throw new Error(`Empty Thai name for subdistrict ${sub.code}`);
        }
        
        for (const pc of sub.postalCodes) {
          if (typeof pc !== 'string') {
            throw new Error(`Postal code is not a string in subdistrict ${sub.code}`);
          }
          if (!/^\d{5}$/.test(pc)) {
            throw new Error(`Postal code ${pc} is not a valid 5-digit string in subdistrict ${sub.code}`);
          }
        }
      }
    }
  }
  
  if (metadata.provinceCount !== 77 || provinceCodes.size !== 77) {
    throw new Error(`Metadata province count (${metadata.provinceCount}) or actual (${provinceCodes.size}) != 77`);
  }
  if (metadata.districtCount !== districtCodes.size) {
    throw new Error(`Metadata district count (${metadata.districtCount}) doesn't match actual (${districtCodes.size})`);
  }
  if (metadata.subdistrictCount !== subdistrictCodes.size) {
    throw new Error(`Metadata subdistrict count (${metadata.subdistrictCount}) doesn't match actual (${subdistrictCodes.size})`);
  }

  console.log("Validation passed successfully!");
  console.log(`- Validated ${provinceCodes.size} Provinces`);
  console.log(`- Validated ${districtCodes.size} Districts`);
  console.log(`- Validated ${subdistrictCodes.size} Subdistricts`);
}

try {
  validate();
} catch (e) {
  console.error(e);
  process.exitCode = 1;
}
