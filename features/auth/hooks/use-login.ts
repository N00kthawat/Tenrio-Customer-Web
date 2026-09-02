import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth/auth.service";
import { loginSchema } from "../auth.schema";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";

export function useLogin() {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const parseResult = loginSchema.safeParse({ email, password });
    if (!parseResult.success) {
      const formatted = parseResult.error.format();
      setFieldErrors({
        email: formatted.email?._errors[0] ? t(formatted.email._errors[0]) : undefined,
        password: formatted.password?._errors[0] ? t(formatted.password._errors[0]) : undefined,
      });
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.login({ email, password });
      await AuthService.getCurrentUser();
      router.push(ROUTES.DASHBOARD.HOME);
    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof Error) {
        if (err.message === "unverified") {
          setError(t("auth.errors.unverified"));
        } else if (err.message === "invalid") {
          setError(t("auth.errors.invalid"));
        } else if (err.message === "session_failed") {
          setError(t("auth.errors.sessionFailed"));
        } else {
          setError(t("auth.errors.network"));
        }
      } else {
        setError(t("auth.errors.network"));
      }
    }
  };

  return { email, setEmail, password, setPassword, isLoading, error, fieldErrors, handleSubmit };
}
