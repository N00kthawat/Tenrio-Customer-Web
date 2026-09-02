"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonClasses } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";
import { useRegister } from "../hooks/use-register";

export function RegisterForm() {
  const { 
    email, setEmail, 
    password, setPassword, 
    isLoading, error, isSuccess, fieldErrors, 
    handleSubmit 
  } = useRegister();

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-12 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">สร้างบัญชีสำเร็จ</h1>
        <Alert variant="success" className="text-left mb-6">
          เราได้ส่งลิงก์ยืนยันไปยังอีเมลของคุณแล้ว
        </Alert>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed text-left">
          โปรดตรวจสอบกล่องจดหมายของคุณและคลิกลิงก์เพื่อยืนยันอีเมลก่อนเข้าสู่ระบบ
          หากไม่พบอีเมล โปรดตรวจสอบในโฟลเดอร์จดหมายขยะ (Spam)
        </p>
        <Link href="/login" className={buttonClasses({ fullWidth: true })}>
          ไปหน้าเข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">สร้างบัญชี Tenrio</h1>
        <p className="text-sm text-slate-600">เริ่มต้นจัดการไลเซนส์สำหรับธุรกิจของคุณ</p>
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
          <Label htmlFor="password">รหัสผ่าน</Label>
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

        <Button type="submit" disabled={isLoading} fullWidth className="mt-2">
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
