import fs from 'fs';
import path from 'path';
import https from 'https';

const COMMIT_SHA = 'b8b3fb91c7df1129ff5b43cb46f7fcffadd2156b';
const COMMIT_DATE = '2026-06-23T11:46:56Z';

const OUT_DIR = path.join(__dirname, '../public/reference-data/thailand');
const PROVINCES_OUT = path.join(OUT_DIR, 'provinces.json');
const PROVINCES_DIR = path.join(OUT_DIR, 'provinces');
const METADATA_OUT = path.join(OUT_DIR, 'metadata.json');

interface UpstreamProvince {
  provinceCode: number;
  provinceNameTh: string;
  provinceNameEn: string;
}

interface UpstreamDistrict {
  districtCode: number;
  provinceCode: number;
  districtNameTh: string;
  districtNameEn: string;
}

interface UpstreamSubdistrict {
  subdistrictCode: number;
  districtCode: number;
  subdistrictNameTh: string;
  subdistrictNameEn: string;
  postalCode: number | null | undefined;
}

async function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data) as T);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function update() {
  console.log(`Fetching data from commit ${COMMIT_SHA}...`);
  
  const [provincesRaw, districtsRaw, subdistrictsRaw] = await Promise.all([
    fetchJson<UpstreamProvince[]>(`https://raw.githubusercontent.com/thailand-geography-data/thailand-geography-json/${COMMIT_SHA}/src/provinces.json`),
    fetchJson<UpstreamDistrict[]>(`https://raw.githubusercontent.com/thailand-geography-data/thailand-geography-json/${COMMIT_SHA}/src/districts.json`),
    fetchJson<UpstreamSubdistrict[]>(`https://raw.githubusercontent.com/thailand-geography-data/thailand-geography-json/${COMMIT_SHA}/src/subdistricts.json`)
  ]);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!fs.existsSync(PROVINCES_DIR)) fs.mkdirSync(PROVINCES_DIR, { recursive: true });

  const provinces = provincesRaw.map((p) => ({
    code: p.provinceCode.toString(),
    nameTh: p.provinceNameTh,
    nameEn: p.provinceNameEn
  }));

  fs.writeFileSync(PROVINCES_OUT, JSON.stringify(provinces, null, 2));

  let districtCount = 0;
  let subdistrictCount = 0;

  for (const prov of provinces) {
    const provCode = parseInt(prov.code, 10);
    const provDistricts = districtsRaw.filter((d) => d.provinceCode === provCode);
    
    const districts = provDistricts.map((d) => {
      districtCount++;
      const distCode = d.districtCode;
      const distSubdistricts = subdistrictsRaw.filter((s) => s.districtCode === distCode);
      
      const sdMap = new Map();
      for (const s of distSubdistricts) {
        const sCode = s.subdistrictCode.toString();
        if (!sdMap.has(sCode)) {
          subdistrictCount++;
          sdMap.set(sCode, {
            code: sCode,
            nameTh: s.subdistrictNameTh,
            nameEn: s.subdistrictNameEn,
            postalCodes: new Set<string>()
          });
        }
        if (s.postalCode) {
          sdMap.get(sCode).postalCodes.add(s.postalCode.toString().padStart(5, '0'));
        }
      }
      
      return {
        code: distCode.toString(),
        nameTh: d.districtNameTh,
        nameEn: d.districtNameEn,
        subdistricts: Array.from(sdMap.values()).map(s => ({
          ...s,
          postalCodes: Array.from(s.postalCodes)
        }))
      };
    });
    
    const provFull = {
      ...prov,
      districts
    };
    
    fs.writeFileSync(path.join(PROVINCES_DIR, `${prov.code}.json`), JSON.stringify(provFull, null, 0));
  }

  const processedDate = new Date().toISOString().split('T')[0];

  const metadata = {
    dataset: "Thailand Administrative Address Reference",
    sourceRepository: "thailand-geography-data/thailand-geography-json",
    sourceCommit: COMMIT_SHA,
    sourceCommitDate: COMMIT_DATE,
    license: "MIT",
    processedDate,
    provinceCount: provinces.length,
    districtCount,
    subdistrictCount
  };

  fs.writeFileSync(METADATA_OUT, JSON.stringify(metadata, null, 2));

  console.log(`Generated ${provinces.length} provinces, ${districtCount} districts, ${subdistrictCount} subdistricts.`);
}

update().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
