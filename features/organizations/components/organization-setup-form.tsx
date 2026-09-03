"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";
import { useOrganizationSetup } from "../hooks/use-organization-setup";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function OrganizationSetupForm() {
  const { t } = useTranslation();
  const { name, setName, isLoading, error, fieldErrors, handleSubmit } = useOrganizationSetup();

  return (
    <div className="mx-auto max-w-md w-full p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">{t("organization.setup.title")}</h1>
        <div className="text-sm text-slate-600">{t("organization.setup.desc")}</div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && <Alert variant="error">{error}</Alert>}

        <div className="space-y-1.5">
          <Label htmlFor="name">{t("organization.setup.nameLabel")}</Label>
          <Input
            id="name"
            name="name"
            placeholder={t("organization.setup.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          <FormError id="name-error">{fieldErrors.name}</FormError>
        </div>

        <Button type="submit" disabled={isLoading} fullWidth className="mt-2">
          {isLoading ? t("organization.setup.submitting") : t("organization.setup.submit")}
        </Button>
      </form>
    </div>
  );
}
