"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonClasses } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setFieldErrors({ email: "โปรดระบุอีเมลที่ถูกต้อง" });
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      
      const res = await fetch(`${apiUrl}/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // To prevent email enumeration, we show success regardless of the response.
      // However, if it's a hard 500 error, we might want to show a generic connection error.
      if (!res.ok && res.status >= 500) {
        throw new Error("server_error");
      }

      setIsSuccess(true);
    } catch {
      setIsLoading(false);
      setError("ไม่สามารถติดต่อระบบได้ในขณะนี้ โปรดลองใหม่อีกครั้งในภายหลัง");
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-12 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">ตรวจสอบอีเมลของคุณ</h1>
        <Alert variant="success" className="text-left mb-6">
          หากอีเมลนี้มีอยู่ในระบบ เราได้ส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปให้คุณแล้ว
        </Alert>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed text-left">
          โปรดตรวจสอบกล่องจดหมายของคุณและคลิกลิงก์เพื่อตั้งรหัสผ่านใหม่ ลิงก์นี้จะหมดอายุภายใน 1 ชั่วโมง<br/><br/>
          หากไม่พบอีเมล โปรดตรวจสอบในโฟลเดอร์จดหมายขยะ (Spam)
        </p>
        <Link 
          href="/login" 
          className={buttonClasses({ fullWidth: true })}
        >
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">ลืมรหัสผ่าน</h1>
        <p className="text-sm text-slate-600">กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && (
          <Alert variant="error">
            {error}
          </Alert>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email">อีเมล</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          <FormError id="email-error">{fieldErrors.email}</FormError>
        </div>

        <Button 
          type="submit"
          disabled={isLoading}
          fullWidth
          className="mt-2"
        >
          {isLoading ? 'กำลังส่งคำขอ...' : 'ส่งลิงก์ตั้งรหัสผ่านใหม่'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm text-slate-600">
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
}
