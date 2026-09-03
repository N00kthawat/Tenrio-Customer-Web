import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { OrganizationService } from "@/services/organizations/organization.service";
import { createOrganizationSchema } from "../organization.schema";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";

export function useOrganizationSetup() {
  const { t } = useTranslation();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string }>({});
  
  const isSubmitting = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting.current) return;
    
    setError("");
    setFieldErrors({});

    const parseResult = createOrganizationSchema.safeParse({ name });
    if (!parseResult.success) {
      const formatted = parseResult.error.format();
      setFieldErrors({
        name: formatted.name?._errors[0] ? t(formatted.name._errors[0]) : undefined,
      });
      return;
    }

    isSubmitting.current = true;
    setIsLoading(true);
    
    try {
      await OrganizationService.createOrganization({ name: parseResult.data.name });
      router.replace(ROUTES.DASHBOARD.HOME);
    } catch {
      isSubmitting.current = false;
      setIsLoading(false);
      setError(t("organization.errors.setupFailed"));
    }
  };

  return { name, setName, isLoading, error, fieldErrors, handleSubmit };
}
