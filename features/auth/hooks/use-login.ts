import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth/auth.service";
import { loginSchema } from "../auth.schema";

export function useLogin() {
  const router = useRouter();
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
        email: formatted.email?._errors[0],
        password: formatted.password?._errors[0],
      });
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.login({ email, password });
      await AuthService.getCurrentUser();
      router.push("/dashboard");
    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof Error) {
        if (err.message === "unverified") {
          setError("บัญชีนี้ยังไม่ได้รับการยืนยัน โปรดตรวจสอบอีเมลของคุณเพื่อยืนยันตัวตนก่อนเข้าสู่ระบบ");
        } else if (err.message === "invalid") {
          setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองใหม่อีกครั้ง");
        } else if (err.message === "session_failed") {
          setError("ไม่สามารถยืนยันเซสชันได้ โปรดเข้าสู่ระบบใหม่อีกครั้ง");
        } else {
          setError("เกิดข้อผิดพลาดในการเชื่อมต่อ โปรดลองใหม่อีกครั้ง");
        }
      } else {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อ โปรดลองใหม่อีกครั้ง");
      }
    }
  };

  return { email, setEmail, password, setPassword, isLoading, error, fieldErrors, handleSubmit };
}
