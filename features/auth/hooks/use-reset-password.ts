import { useState } from "react";
import { AuthService } from "@/services/auth/auth.service";
import { resetPasswordSchema } from "../auth.schema";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function useResetPassword(token?: string) {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError("");
    setFieldErrors({});

    const parseResult = resetPasswordSchema.safeParse({ password, confirmPassword });
    if (!parseResult.success) {
      const formatted = parseResult.error.format();
      setFieldErrors({
        password: formatted.password?._errors[0] ? t(formatted.password._errors[0]) : undefined,
        confirmPassword: formatted.confirmPassword?._errors[0] ? t(formatted.confirmPassword._errors[0]) : undefined,
      });
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.resetPassword({ token, newPassword: password });
      setIsSuccess(true);
    } catch (err: unknown) {
      setIsLoading(false);
      
      if (err instanceof Error) {
        if (err.message === "expired") {
          setError(t("auth.errors.expired"));
        } else if (err.message === "used") {
          setError(t("auth.errors.used"));
        } else if (err.message === "invalid") {
          setError(t("auth.errors.resetInvalid"));
        } else {
          setError(t("auth.errors.unavailable"));
        }
      } else {
        setError(t("auth.errors.unknown"));
      }
    }
  };

  return { password, setPassword, confirmPassword, setConfirmPassword, isLoading, error, isSuccess, fieldErrors, handleSubmit };
}
