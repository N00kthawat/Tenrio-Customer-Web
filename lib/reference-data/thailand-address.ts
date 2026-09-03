export interface ProvinceInfo {
  code: string;
  nameTh: string;
  nameEn?: string;
}

export interface SubdistrictInfo {
  code: string;
  nameTh: string;
  nameEn?: string;
  postalCodes: string[];
}

export interface DistrictInfo {
  code: string;
  nameTh: string;
  nameEn?: string;
  subdistricts: SubdistrictInfo[];
}

export interface ProvinceData extends ProvinceInfo {
  districts: DistrictInfo[];
}

let cachedProvinces: ProvinceInfo[] | null = null;
const provinceDataCache = new Map<string, ProvinceData>();

export async function getThaiProvinces(): Promise<ProvinceInfo[]> {
  if (cachedProvinces) return cachedProvinces;

  const res = await fetch("/reference-data/thailand/provinces.json");
  if (!res.ok) throw new Error("Failed to load Thai provinces");
  
  cachedProvinces = await res.json();
  return cachedProvinces as ProvinceInfo[];
}

export async function getThaiProvinceData(provinceCode: string): Promise<ProvinceData> {
  if (provinceDataCache.has(provinceCode)) {
    return provinceDataCache.get(provinceCode)!;
  }

  const res = await fetch(`/reference-data/thailand/provinces/${provinceCode}.json`);
  if (!res.ok) throw new Error(`Failed to load province data for ${provinceCode}`);
  
  const data = await res.json();
  provinceDataCache.set(provinceCode, data);
  return data as ProvinceData;
}

export async function getDistrictsByProvince(provinceCode: string): Promise<DistrictInfo[]> {
  const data = await getThaiProvinceData(provinceCode);
  return data.districts;
}

export async function getSubdistrictsByDistrict(provinceCode: string, districtCode: string): Promise<SubdistrictInfo[]> {
  const districts = await getDistrictsByProvince(provinceCode);
  const district = districts.find(d => d.code === districtCode);
  return district ? district.subdistricts : [];
}

export async function getPostalCodesForSubdistrict(
  provinceCode: string, 
  districtCode: string, 
  subdistrictCode: string
): Promise<string[]> {
  const subdistricts = await getSubdistrictsByDistrict(provinceCode, districtCode);
  const subdistrict = subdistricts.find(s => s.code === subdistrictCode);
  return subdistrict ? subdistrict.postalCodes : [];
}
