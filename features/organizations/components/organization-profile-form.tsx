"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";
import { Alert } from "@/components/ui/alert";
import { RadioGroup } from "@/components/ui/radio-group";
import { Combobox } from "@/components/ui/combobox";
import {
  useOrganizationProfile,
  CountryMode,
} from "../hooks/use-organization-profile";
import { useThaiAddress } from "../hooks/use-thai-address";
import { useEffect, useMemo } from "react";

export function OrganizationProfileForm() {
  const { t, locale } = useTranslation();
  const {
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
    handleSubmit,
  } = useOrganizationProfile();

  const isThailand = countryMode === "thailand";

  const {
    provinceOptions,
    districtOptions,
    subdistrictOptions,
    provinceCode,
    districtCode,
    subdistrictCode,
    provincesLoading,
    districtsLoading,
    rawSubdistricts,
    getCanonicalName,
  } = useThaiAddress(
    isThailand ? formData.province : undefined,
    isThailand ? formData.district : undefined,
    isThailand ? formData.subdistrict : undefined,
    locale,
  );

  // Auto-suggest postal code when exactly one exists for the selected subdistrict
  useEffect(() => {
    if (!isThailand || !subdistrictCode) return;
    const sd = rawSubdistricts.find((s) => s.code === subdistrictCode);
    if (sd && sd.postalCodes.length === 1) {
      if (formData.postalCode !== sd.postalCodes[0]) {
        setMultipleValues({ postalCode: sd.postalCodes[0] });
      }
    }
  }, [
    isThailand,
    subdistrictCode,
    rawSubdistricts,
    formData.postalCode,
    setMultipleValues,
  ]);

  // Branch type radio options
  const branchTypeOptions = useMemo(
    () => [
      { value: "", label: t("organization.profile.notSpecified") },
      {
        value: "HEAD_OFFICE",
        label: t("organization.profile.headOffice"),
      },
      { value: "BRANCH", label: t("organization.profile.branch") },
    ],
    [t],
  );

  // Country mode radio options
  const countryModeOptions = useMemo(
    () => [
      {
        value: "unset",
        label: t("organization.profile.countryUnset"),
      },
      {
        value: "thailand",
        label: t("organization.profile.thailand"),
      },
      {
        value: "other",
        label: t("organization.profile.otherCountry"),
      },
    ],
    [t],
  );

  if (isInitialLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="text-sm text-slate-500 animate-pulse">
          {t("organization.guard.loading")}
        </div>
      </div>
    );
  }

  if (initialLoadError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Alert variant="error">{t("organization.guard.error")}</Alert>
        <Button onClick={() => loadProfile()}>
          {t("organization.guard.retry")}
        </Button>
      </div>
    );
  }

  // Postal code hint for the selected subdistrict
  const selectedSubdistrict = subdistrictCode
    ? rawSubdistricts.find((s) => s.code === subdistrictCode)
    : undefined;

  return (
    <div className="max-w-3xl space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {saveError && <Alert variant="error">{saveError}</Alert>}
        {success && (
          <Alert variant="success">
            {t("organization.profile.saveSuccess")}
          </Alert>
        )}

        {/* 1. Organization info */}
        <section className="surface p-6 space-y-5 border border-slate-200 rounded-lg bg-white">
          <h2 className="text-lg font-medium text-slate-900">
            {t("organization.profile.sectionGeneral")}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="name">
                {t("organization.profile.nameLabel")} *
              </Label>
              <Input
                id="name"
                autoComplete="organization"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={isSaving}
                error={!!fieldErrors.name}
              />
              <FormError>{fieldErrors.name}</FormError>
            </div>
          </div>
        </section>

        {/* 2. Legal / tax information */}
        <section className="surface p-6 space-y-5 border border-slate-200 rounded-lg bg-white">
          <h2 className="text-lg font-medium text-slate-900">
            {t("organization.profile.sectionLegal")}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="legalName">
                {t("organization.profile.legalNameLabel")}
              </Label>
              <Input
                id="legalName"
                value={formData.legalName || ""}
                onChange={(e) => handleChange("legalName", e.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="juristicRegistrationNumber">
                {t("organization.profile.juristicRegistrationNumberLabel")}
              </Label>
              <Input
                id="juristicRegistrationNumber"
                value={formData.juristicRegistrationNumber || ""}
                onChange={(e) =>
                  handleChange("juristicRegistrationNumber", e.target.value)
                }
                disabled={isSaving}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="taxId">
                {t("organization.profile.taxIdLabel")}
              </Label>
              <Input
                id="taxId"
                value={formData.taxId || ""}
                onChange={(e) => handleChange("taxId", e.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="sm:col-span-2">
              <RadioGroup
                name="branchType"
                label={t("organization.profile.branchTypeLabel")}
                value={formData.branchType || ""}
                options={branchTypeOptions}
                onValueChange={(val) =>
                  handleChange("branchType", val || undefined)
                }
                disabled={isSaving}
              />
            </div>
            {formData.branchType === "BRANCH" && (
              <div className="space-y-1.5">
                <Label htmlFor="branchNumber">
                  {t("organization.profile.branchNumberLabel")}
                </Label>
                <Input
                  id="branchNumber"
                  value={formData.branchNumber || ""}
                  onChange={(e) =>
                    handleChange("branchNumber", e.target.value)
                  }
                  disabled={isSaving}
                  error={!!fieldErrors.branchNumber}
                />
                <FormError>{fieldErrors.branchNumber}</FormError>
              </div>
            )}
          </div>
        </section>

        {/* 3. Contact information */}
        <section className="surface p-6 space-y-5 border border-slate-200 rounded-lg bg-white">
          <h2 className="text-lg font-medium text-slate-900">
            {t("organization.profile.sectionContact")}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="billingEmail">
                {t("organization.profile.billingEmailLabel")}
              </Label>
              <Input
                id="billingEmail"
                type="email"
                autoComplete="email"
                value={formData.billingEmail || ""}
                onChange={(e) => handleChange("billingEmail", e.target.value)}
                disabled={isSaving}
                error={!!fieldErrors.billingEmail}
              />
              <FormError>{fieldErrors.billingEmail}</FormError>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phoneNumber">
                {t("organization.profile.phoneNumberLabel")}
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                autoComplete="tel"
                value={formData.phoneNumber || ""}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                disabled={isSaving}
              />
            </div>
          </div>
        </section>

        {/* 4. Billing address */}
        <section className="surface p-6 space-y-5 border border-slate-200 rounded-lg bg-white">
          <h2 className="text-lg font-medium text-slate-900">
            {t("organization.profile.sectionAddress")}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <RadioGroup
                name="countryMode"
                label={t("organization.profile.countryLabel")}
                value={countryMode}
                options={countryModeOptions}
                onValueChange={(val) =>
                  handleCountryModeChange(val as CountryMode)
                }
                disabled={isSaving}
              />
            </div>

            {countryMode === "other" && (
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="countryManual">
                  {t("organization.profile.countryNameLabel")}
                </Label>
                <Input
                  id="countryManual"
                  autoComplete="billing country-name"
                  value={formData.country || ""}
                  onChange={(e) => handleChange("country", e.target.value)}
                  disabled={isSaving}
                />
              </div>
            )}

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="addressLine">
                {t("organization.profile.addressLineLabel")}
              </Label>
              <Input
                id="addressLine"
                autoComplete="billing street-address"
                value={formData.addressLine || ""}
                onChange={(e) => handleChange("addressLine", e.target.value)}
                disabled={isSaving}
              />
            </div>

            {isThailand ? (
              <>
                {/* Province Combobox */}
                <div className="space-y-1.5">
                  <Label>{t("organization.profile.provinceLabel")}</Label>
                  <Combobox
                    id="province"
                    value={provinceCode}
                    options={provinceOptions}
                    placeholder={t("organization.profile.selectOption")}
                    searchPlaceholder={t(
                      "organization.profile.searchProvince",
                    )}
                    emptyMessage={t("organization.profile.noResults")}
                    loading={provincesLoading}
                    disabled={isSaving}
                    allowClear
                    onValueChange={(code) => {
                      const name = code
                        ? getCanonicalName("province", code)
                        : "";
                      handleChange("province", name || "");
                    }}
                  />
                  {formData.province && !provinceCode && !provincesLoading && (
                    <p className="text-xs text-amber-600">
                      {t("organization.profile.unresolvedValue").replace("{{value}}", formData.province || "")}
                    </p>
                  )}
                </div>

                {/* District Combobox */}
                <div className="space-y-1.5">
                  <Label>{t("organization.profile.districtLabel")}</Label>
                  <Combobox
                    id="district"
                    value={districtCode}
                    options={districtOptions}
                    placeholder={t("organization.profile.selectOption")}
                    searchPlaceholder={t(
                      "organization.profile.searchDistrict",
                    )}
                    emptyMessage={t("organization.profile.noResults")}
                    loading={districtsLoading}
                    disabled={isSaving || !provinceCode}
                    allowClear
                    onValueChange={(code) => {
                      const name = code
                        ? getCanonicalName("district", code)
                        : "";
                      handleChange("district", name || "");
                    }}
                  />
                  {formData.district &&
                    !districtCode &&
                    !districtsLoading &&
                    provinceCode && (
                      <p className="text-xs text-amber-600">
                        {t("organization.profile.unresolvedValue").replace("{{value}}", formData.district || "")}
                      </p>
                    )}
                </div>

                {/* Subdistrict Combobox */}
                <div className="space-y-1.5">
                  <Label>
                    {t("organization.profile.subdistrictLabel")}
                  </Label>
                  <Combobox
                    id="subdistrict"
                    value={subdistrictCode}
                    options={subdistrictOptions}
                    placeholder={t("organization.profile.selectOption")}
                    searchPlaceholder={t(
                      "organization.profile.searchSubdistrict",
                    )}
                    emptyMessage={t("organization.profile.noResults")}
                    disabled={isSaving || !districtCode}
                    allowClear
                    onValueChange={(code) => {
                      const name = code
                        ? getCanonicalName("subdistrict", code)
                        : "";
                      handleChange("subdistrict", name || "");
                    }}
                  />
                  {formData.subdistrict &&
                    !subdistrictCode &&
                    districtCode && (
                      <p className="text-xs text-amber-600">
                        {t("organization.profile.unresolvedValue").replace("{{value}}", formData.subdistrict || "")}
                      </p>
                    )}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="province">
                    {t("organization.profile.provinceLabel")}
                  </Label>
                  <Input
                    id="province"
                    autoComplete="billing address-level1"
                    value={formData.province || ""}
                    onChange={(e) => handleChange("province", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="district">
                    {t("organization.profile.districtLabel")}
                  </Label>
                  <Input
                    id="district"
                    autoComplete="billing address-level2"
                    value={formData.district || ""}
                    onChange={(e) => handleChange("district", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subdistrict">
                    {t("organization.profile.subdistrictLabel")}
                  </Label>
                  <Input
                    id="subdistrict"
                    autoComplete="billing address-level3"
                    value={formData.subdistrict || ""}
                    onChange={(e) =>
                      handleChange("subdistrict", e.target.value)
                    }
                    disabled={isSaving}
                  />
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="postalCode">
                {t("organization.profile.postalCodeLabel")}
              </Label>
              <Input
                id="postalCode"
                autoComplete="billing postal-code"
                value={formData.postalCode || ""}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                disabled={isSaving}
              />
              {isThailand && selectedSubdistrict && (
                <p className="text-xs text-slate-500">
                  {selectedSubdistrict.postalCodes.length === 1
                    ? t("organization.profile.postalCodeSuggested")
                    : t("organization.profile.postalCodeMultiple").replace(
                        "{{codes}}",
                        selectedSubdistrict.postalCodes.join(", "),
                      )}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-end border-t border-slate-200 pt-6">
          <Button type="submit" disabled={isSaving}>
            {isSaving
              ? t("organization.profile.saving")
              : t("organization.profile.save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
