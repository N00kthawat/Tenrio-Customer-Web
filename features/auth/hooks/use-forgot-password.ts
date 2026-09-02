import { useState } from "react";
import { AuthService } from "@/services/auth/auth.service";
import { forgotPasswordSchema } from "../auth.schema";

export function useForgotPassword() {
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
        email: formatted.email?._errors[0],
      });
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.forgotPassword({ email });
      setIsSuccess(true);
    } catch {
      setIsLoading(false);
      setError("ไม่สามารถติดต่อระบบได้ในขณะนี้ โปรดลองใหม่อีกครั้งในภายหลัง");
    }
  };

  return { email, setEmail, isLoading, error, isSuccess, fieldErrors, handleSubmit };
}
