import { useState } from "react";
import { AuthService } from "@/services/auth/auth.service";
import { registerSchema } from "../auth.schema";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function useRegister() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const parseResult = registerSchema.safeParse({ email, password });
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
      await AuthService.register({ email, password });
      setIsSuccess(true);
    } catch {
      setIsLoading(false);
      setError(t("auth.errors.registerError"));
    }
  };

  return { email, setEmail, password, setPassword, isLoading, error, isSuccess, fieldErrors, handleSubmit };
}
