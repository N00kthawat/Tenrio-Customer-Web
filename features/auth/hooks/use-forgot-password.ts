import { useState } from "react";
import { AuthService } from "@/services/auth/auth.service";
import { forgotPasswordSchema } from "../auth.schema";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function useForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const parseResult = forgotPasswordSchema.safeParse({ email });
    if (!parseResult.success) {
      const formatted = parseResult.error.format();
      setFieldErrors({
        email: formatted.email?._errors[0] ? t(formatted.email._errors[0]) : undefined,
      });
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.forgotPassword({ email });
      setIsSuccess(true);
    } catch {
      setIsLoading(false);
      setError(t("auth.errors.unavailable"));
    }
  };

  return { email, setEmail, isLoading, error, isSuccess, fieldErrors, handleSubmit };
}
