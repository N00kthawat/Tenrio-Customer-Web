import { useState } from "react";
import { AuthService } from "@/services/auth/auth.service";
import { resetPasswordSchema } from "../auth.schema";

export function useResetPassword(token?: string) {
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
        password: formatted.password?._errors[0],
        confirmPassword: formatted.confirmPassword?._errors[0],
      });
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.resetPassword({ token, password });
      setIsSuccess(true);
    } catch (err: unknown) {
      setIsLoading(false);
      
      if (err instanceof Error) {
        if (err.message === "expired") {
          setError("ลิงก์ตั้งรหัสผ่านใหม่หมดอายุแล้ว โปรดขอลิงก์ใหม่");
        } else if (err.message === "used") {
          setError("ลิงก์นี้ถูกใช้งานไปแล้ว");
        } else if (err.message === "invalid") {
          setError("ลิงก์ตั้งรหัสผ่านใหม่ไม่ถูกต้องหรืออาจมีข้อผิดพลาด โปรดตรวจสอบลิงก์จากอีเมลของคุณ");
        } else {
          setError("ไม่สามารถติดต่อระบบได้ในขณะนี้ โปรดลองใหม่อีกครั้งในภายหลัง");
        }
      } else {
        setError("เกิดข้อผิดพลาดที่ไม่คาดคิด โปรดลองใหม่อีกครั้ง");
      }
    }
  };

  return { password, setPassword, confirmPassword, setConfirmPassword, isLoading, error, isSuccess, fieldErrors, handleSubmit };
}
