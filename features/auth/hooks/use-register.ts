import { useState } from "react";
import { AuthService } from "@/services/auth/auth.service";
import { registerSchema } from "../auth.schema";

export function useRegister() {
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
        email: formatted.email?._errors[0],
        password: formatted.password?._errors[0],
      });
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.register({ email, password });
      setIsSuccess(true);
    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ โปรดลองใหม่อีกครั้ง");
      } else {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อ โปรดลองใหม่อีกครั้ง");
      }
    }
  };

  return { email, setEmail, password, setPassword, isLoading, error, isSuccess, fieldErrors, handleSubmit };
}
