"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";

export default function LoginPage() {
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

    let hasError = false;
    const newFieldErrors: { email?: string; password?: string } = {};

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newFieldErrors.email = "โปรดระบุอีเมลที่ถูกต้อง";
      hasError = true;
    }

    if (!password) {
      newFieldErrors.password = "โปรดระบุรหัสผ่าน";
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(newFieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      
      const loginRes = await fetch(`${apiUrl}/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!loginRes.ok) {
        const data = await loginRes.json().catch(() => ({}));
        const errorMessage = String(data.message || "").toLowerCase();
        const errorCode = String(data.code || "").toLowerCase();

        if (errorMessage.includes("verify") || errorMessage.includes("unverified") || errorCode.includes("verify")) {
          throw new Error("unverified");
        }
        throw new Error("invalid");
      }

      const meRes = await fetch(`${apiUrl}/v1/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!meRes.ok) {
        throw new Error("session_failed");
      }

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

  return (
    <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">เข้าสู่ระบบ Tenrio</h1>
        <p className="text-sm text-slate-600">จัดการ Microsoft 365 สำหรับธุรกิจของคุณ</p>
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

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">รหัสผ่าน</Label>
            <Link 
              href="/forgot-password" 
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
              tabIndex={-1}
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••••"
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
          {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm text-slate-600">
        ยังไม่มีบัญชี?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700">
          สร้างบัญชี
        </Link>
      </div>
    </div>
  );
}
