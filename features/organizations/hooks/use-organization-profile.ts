import { useState, useEffect, useRef, useCallback } from "react";
import { OrganizationService } from "@/services/organizations/organization.service";
import { updateOrganizationSchema, UpdateOrganizationFormData } from "../organization.schema";
import { UpdateOrganizationRequest } from "@/services/organizations/organization.types";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useOrganization } from "@/components/organization-guard";

export type CountryMode = "unset" | "thailand" | "other";

export function useOrganizationProfile() {
  const { t } = useTranslation();
  const { organizationId } = useOrganization();
  
  const [formData, setFormData] = useState<UpdateOrganizationFormData>({
    name: "",
  });
  
  const [countryMode, setCountryMode] = useState<CountryMode>("unset");
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialLoadError, setInitialLoadError] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof UpdateOrganizationFormData, string>>>({});
  
  const isSubmitting = useRef(false);
  const requestCountRef = useRef(0);

  const loadProfile = useCallback(async () => {
    if (!organizationId) return;
    
    setIsInitialLoading(true);
    setInitialLoadError(false);
    
    const requestId = ++requestCountRef.current;
    
    try {
      const org = await OrganizationService.getOrganization(organizationId);
      if (requestId !== requestCountRef.current) return;
      
      let mode: CountryMode = "unset";
      if (org.country) {
        mode = org.country === "Thailand" ? "thailand" : "other";
      }

      setCountryMode(mode);
      setFormData({
        name: org.name || "",
        legalName: org.legalName || "",
        juristicRegistrationNumber: org.juristicRegistrationNumber || "",
        taxId: org.taxId || "",
        branchType: org.branchType || "",
        branchNumber: org.branchNumber || "",
        billingEmail: org.billingEmail || "",
        phoneNumber: org.phoneNumber || "",
        addressLine: org.addressLine || "",
        subdistrict: org.subdistrict || "",
        district: org.district || "",
        province: org.province || "",
        postalCode: org.postalCode || "",
        country: org.country || "",
      });
    } catch {
      if (requestId !== requestCountRef.current) return;
      setInitialLoadError(true);
    } finally {
      if (requestId === requestCountRef.current) {
        setIsInitialLoading(false);
      }
    }
  }, [organizationId]);

  useEffect(() => {
    loadProfile();
    const ref = requestCountRef;
    return () => {
      ref.current++; // Invalidate pending requests on unmount
    };
  }, [loadProfile]);

  const handleCountryModeChange = useCallback((mode: CountryMode) => {
    setCountryMode(mode);
    setFormData(prev => ({
      ...prev,
      country: mode === "thailand" ? "Thailand" : (mode === "unset" ? "" : prev.country === "Thailand" ? "" : prev.country),
    }));
    setSuccess(false);
  }, []);

  const handleChange = useCallback((field: keyof UpdateOrganizationFormData, value: string | undefined) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      
      if (field === "branchType" && value !== "BRANCH") {
        next.branchNumber = ""; // Clear branchNumber when explicitly switching away from BRANCH
      }
      
      if (countryMode === "thailand") {
        if (field === "province") {
          next.district = "";
          next.subdistrict = "";
          next.postalCode = "";
        } else if (field === "district") {
          next.subdistrict = "";
          next.postalCode = "";
        } else if (field === "subdistrict") {
          next.postalCode = "";
        }
      }
      return next;
    });
    setSuccess(false);
  }, [countryMode]);

  const setMultipleValues = useCallback((updates: Partial<UpdateOrganizationFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setSuccess(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting.current || !organizationId) return;
    
    setSaveError("");
    setSuccess(false);
    setFieldErrors({});

    const dataToValidate: Record<string, unknown> = { ...formData };
    if (dataToValidate.branchType === "") {
      dataToValidate.branchType = undefined;
    }

    const parseResult = updateOrganizationSchema.safeParse(dataToValidate);
    if (!parseResult.success) {
      const formatted = parseResult.error.format();
      const newFieldErrors: Partial<Record<keyof UpdateOrganizationFormData, string>> = {};
      
      type FormKeys = keyof UpdateOrganizationFormData;
      (Object.keys(formatted) as Array<keyof typeof formatted>).forEach(key => {
        if (key !== '_errors') {
          const fieldErrorsArr = (formatted as unknown as Record<string, { _errors: string[] }>)[key]?._errors;
          if (fieldErrorsArr && fieldErrorsArr.length > 0) {
            newFieldErrors[key as FormKeys] = t(fieldErrorsArr[0]);
          }
        }
      });
      
      setFieldErrors(newFieldErrors);
      return;
    }

    isSubmitting.current = true;
    setIsSaving(true);
    
    const normalizeString = (val: string | undefined): string | null => {
      if (val === undefined || val === null) return null;
      const trimmed = val.trim();
      return trimmed === "" ? null : trimmed;
    };

    const validated = parseResult.data;
    const requestPayload: UpdateOrganizationRequest = {
      name: validated.name,
      legalName: normalizeString(validated.legalName),
      juristicRegistrationNumber: normalizeString(validated.juristicRegistrationNumber),
      taxId: normalizeString(validated.taxId),
      branchType: validated.branchType || null,
      branchNumber: normalizeString(validated.branchNumber),
      billingEmail: normalizeString(validated.billingEmail),
      phoneNumber: normalizeString(validated.phoneNumber),
      addressLine: normalizeString(validated.addressLine),
      subdistrict: normalizeString(validated.subdistrict),
      district: normalizeString(validated.district),
      province: normalizeString(validated.province),
      postalCode: normalizeString(validated.postalCode),
    };

    if (countryMode === "unset") {
      requestPayload.country = null;
    } else if (countryMode === "thailand") {
      requestPayload.country = "Thailand";
    } else {
      requestPayload.country = normalizeString(validated.country);
    }

    try {
      const updatedOrg = await OrganizationService.updateOrganization(organizationId, requestPayload);
      
      let mode: CountryMode = "unset";
      if (updatedOrg.country) {
        mode = updatedOrg.country === "Thailand" ? "thailand" : "other";
      }
      setCountryMode(mode);

      setFormData({
        name: updatedOrg.name || "",
        legalName: updatedOrg.legalName || "",
        juristicRegistrationNumber: updatedOrg.juristicRegistrationNumber || "",
        taxId: updatedOrg.taxId || "",
        branchType: updatedOrg.branchType || "",
        branchNumber: updatedOrg.branchNumber || "",
        billingEmail: updatedOrg.billingEmail || "",
        phoneNumber: updatedOrg.phoneNumber || "",
        addressLine: updatedOrg.addressLine || "",
        subdistrict: updatedOrg.subdistrict || "",
        district: updatedOrg.district || "",
        province: updatedOrg.province || "",
        postalCode: updatedOrg.postalCode || "",
        country: updatedOrg.country || "",
      });
      setSuccess(true);
    } catch {
      setSaveError(t("organization.errors.saveFailed"));
    } finally {
      isSubmitting.current = false;
      setIsSaving(false);
    }
  };

  return { 
    formData, 
    countryMode, 
    handleCountryModeChange, 
    handleChange, 
    setMultipleValues, 
    isInitialLoading, 
    initialLoadError, 
    loadProfile, 
    isSaving, 
    saveError, 
    success, 
    fieldErrors, 
    handleSubmit 
  };
}
