import { useState, useEffect, useMemo } from "react";
import {
  getThaiProvinces,
  getDistrictsByProvince,
  getSubdistrictsByDistrict,
  ProvinceInfo,
  DistrictInfo,
  SubdistrictInfo,
} from "@/lib/reference-data/thailand-address";
import { ComboboxOption } from "@/components/ui/types";

/** Resolve a stored text value (nameTh or nameEn) against a list to find the code */
function resolveCode(
  items: Array<{ code: string; nameTh: string; nameEn?: string }>,
  storedText: string | undefined,
): string | undefined {
  if (!storedText) return undefined;
  const found = items.find(
    (i) => i.nameTh === storedText || i.nameEn === storedText,
  );
  return found?.code;
}

/** Convert address records to generic ComboboxOption with cross-language keywords */
function toComboboxOptions(
  items: Array<{ code: string; nameTh: string; nameEn?: string }>,
  locale: string,
): ComboboxOption[] {
  return items.map((item) => ({
    value: item.code,
    label: locale === "th" ? item.nameTh : item.nameEn || item.nameTh,
    keywords: [item.nameTh, item.nameEn].filter(
      (v): v is string => typeof v === "string" && v.length > 0,
    ),
  }));
}

export interface UseThaiAddressResult {
  /** Province options ready for Combobox */
  provinceOptions: ComboboxOption[];
  /** District options for the currently resolved province */
  districtOptions: ComboboxOption[];
  /** Subdistrict options for the currently resolved district */
  subdistrictOptions: ComboboxOption[];
  /** Resolved province code (undefined if stored text is unresolvable) */
  provinceCode: string | undefined;
  /** Resolved district code */
  districtCode: string | undefined;
  /** Resolved subdistrict code */
  subdistrictCode: string | undefined;
  /** True while provinces.json is loading */
  provincesLoading: boolean;
  /** True while province detail JSON is loading */
  districtsLoading: boolean;
  /** True while subdistricts are being extracted (always synchronous once districts load, but kept for consistency) */
  subdistrictsLoading: boolean;
  /** Raw subdistrict data for postal-code lookup */
  rawSubdistricts: SubdistrictInfo[];
  /** Get canonical nameTh for a resolved code */
  getCanonicalName: (
    level: "province" | "district" | "subdistrict",
    code: string,
  ) => string | undefined;
}

export function useThaiAddress(
  storedProvince: string | undefined,
  storedDistrict: string | undefined,
  storedSubdistrict: string | undefined,
  locale: string,
): UseThaiAddressResult {
  const [provinces, setProvinces] = useState<ProvinceInfo[]>([]);
  const [districts, setDistricts] = useState<DistrictInfo[]>([]);
  const [subdistricts, setSubdistricts] = useState<SubdistrictInfo[]>([]);
  const [provincesLoading, setProvincesLoading] = useState(true);
  const [districtsLoading, setDistrictsLoading] = useState(false);

  // 1. Load provinces once
  useEffect(() => {
    let mounted = true;
    setProvincesLoading(true);
    getThaiProvinces()
      .then((data) => {
        if (mounted) setProvinces(data);
      })
      .catch(console.error)
      .finally(() => {
        if (mounted) setProvincesLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Resolve codes from stored text
  const provinceCode = useMemo(
    () => resolveCode(provinces, storedProvince),
    [provinces, storedProvince],
  );

  const districtCode = useMemo(
    () => resolveCode(districts, storedDistrict),
    [districts, storedDistrict],
  );

  const subdistrictCode = useMemo(
    () => resolveCode(subdistricts, storedSubdistrict),
    [subdistricts, storedSubdistrict],
  );

  // 2. Load districts when province changes
  useEffect(() => {
    let mounted = true;
    if (!provinceCode) {
      setDistricts([]);
      return;
    }
    setDistrictsLoading(true);
    getDistrictsByProvince(provinceCode)
      .then((data) => {
        if (mounted) setDistricts(data);
      })
      .catch(console.error)
      .finally(() => {
        if (mounted) setDistrictsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [provinceCode]);

  // 3. Extract subdistricts when district changes
  useEffect(() => {
    let mounted = true;
    if (!provinceCode || !districtCode) {
      setSubdistricts([]);
      return;
    }
    getSubdistrictsByDistrict(provinceCode, districtCode)
      .then((data) => {
        if (mounted) setSubdistricts(data);
      })
      .catch(console.error);
    return () => {
      mounted = false;
    };
  }, [provinceCode, districtCode]);

  // Convert to ComboboxOption arrays (recompute when locale changes)
  const provinceOptions = useMemo(
    () => toComboboxOptions(provinces, locale),
    [provinces, locale],
  );
  const districtOptions = useMemo(
    () => toComboboxOptions(districts, locale),
    [districts, locale],
  );
  const subdistrictOptions = useMemo(
    () => toComboboxOptions(subdistricts, locale),
    [subdistricts, locale],
  );

  const getCanonicalName = useMemo(() => {
    return (
      level: "province" | "district" | "subdistrict",
      code: string,
    ): string | undefined => {
      const source =
        level === "province"
          ? provinces
          : level === "district"
            ? districts
            : subdistricts;
      return source.find((i) => i.code === code)?.nameTh;
    };
  }, [provinces, districts, subdistricts]);

  return {
    provinceOptions,
    districtOptions,
    subdistrictOptions,
    provinceCode,
    districtCode,
    subdistrictCode,
    provincesLoading,
    districtsLoading,
    subdistrictsLoading: false, // Subdistricts are extracted synchronously from district data
    rawSubdistricts: subdistricts,
    getCanonicalName,
  };
}
