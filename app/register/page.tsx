"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";
export default function RegisterPage() {
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
    
    let hasError = false;
    const newFieldErrors: { email?: string; password?: string } = {};

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newFieldErrors.email = "โปรดระบุอีเมลที่ถูกต้อง";
      hasError = true;
    }

    if (!password || password.length < 12) {
      newFieldErrors.password = "รหัสผ่านต้องมีอย่างน้อย 12 ตัวอักษร";
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(newFieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${apiUrl}/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // Safe error handling
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "ไม่สามารถสร้างบัญชีได้ในขณะนี้ โปรดลองใหม่อีกครั้ง");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ โปรดลองใหม่อีกครั้ง");
      } else {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อ โปรดลองใหม่อีกครั้ง");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">สร้างบัญชีสำเร็จ</h1>
        <p className="text-slate-600 mb-6 leading-relaxed">
          เราได้ส่งอีเมลยืนยันไปยัง <span className="font-medium text-slate-900">{email}</span> แล้ว<br />
          โปรดยืนยันอีเมลของคุณก่อนเข้าสู่ระบบ
        </p>
        <Link 
          href="/login" 
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors w-full"
        >
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">สร้างบัญชี Tenrio</h1>
        <p className="text-sm text-slate-600">จัดการ Microsoft 365 สำหรับธุรกิจของคุณ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && (
          <Alert variant="error">
            {error}
          </Alert>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email">
            อีเมล
          </Label>
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

        <div className="space-y-1.5">
          <Label htmlFor="password">
            รหัสผ่าน
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="อย่างน้อย 12 ตัวอักษร"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
          />
          <FormError id="password-error">{fieldErrors.password}</FormError>
        </div>

        <Button 
          type="submit"
          disabled={isLoading}
          fullWidth
          className="mt-2"
        >
          {isLoading ? 'กำลังสร้างบัญชี...' : 'สร้างบัญชี'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm text-slate-600">
        มีบัญชีอยู่แล้ว?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
}
