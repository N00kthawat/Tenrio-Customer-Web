"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";
import { useLogin } from "../hooks/use-login";

export function LoginForm() {
  const { 
    email, setEmail, 
    password, setPassword, 
    isLoading, error, fieldErrors, 
    handleSubmit 
  } = useLogin();

  return (
    <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">เข้าสู่ระบบ Tenrio</h1>
        <p className="text-sm text-slate-600">จัดการ Microsoft 365 สำหรับธุรกิจของคุณ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && <Alert variant="error">{error}</Alert>}

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

        <Button type="submit" disabled={isLoading} fullWidth className="mt-2">
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
