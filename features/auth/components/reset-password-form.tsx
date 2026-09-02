"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonClasses } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";
import { useResetPassword } from "../hooks/use-reset-password";

export function ResetPasswordForm({ token }: { token?: string }) {
  const { 
    password, setPassword, 
    confirmPassword, setConfirmPassword, 
    isLoading, error, isSuccess, fieldErrors, 
    handleSubmit 
  } = useResetPassword(token);

  if (!token) {
    return (
      <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-12 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">ลิงก์ไม่ถูกต้อง</h1>
        <Alert variant="error" className="text-left mb-6">
          ไม่พบรหัสอ้างอิงในลิงก์ โปรดตรวจสอบลิงก์จากอีเมลของคุณอีกครั้ง
        </Alert>
        <Link href="/forgot-password" className={buttonClasses({ fullWidth: true })}>
          ขอลิงก์ตั้งรหัสผ่านใหม่
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-12 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">ตั้งรหัสผ่านใหม่สำเร็จ</h1>
        <Alert variant="success" className="text-left mb-6">
          รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว
        </Alert>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed text-left">
          คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่เพื่อจัดการ Microsoft 365
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
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">ตั้งรหัสผ่านใหม่</h1>
        <p className="text-sm text-slate-600">กรุณากำหนดรหัสผ่านใหม่สำหรับบัญชีของคุณ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && <Alert variant="error">{error}</Alert>}

        <div className="space-y-1.5">
          <Label htmlFor="password">รหัสผ่านใหม่</Label>
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

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">ยืนยันรหัสผ่านใหม่</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="กรอกรหัสผ่านอีกครั้ง"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.confirmPassword}
            aria-describedby={fieldErrors.confirmPassword ? "confirmPassword-error" : undefined}
          />
          <FormError id="confirmPassword-error">{fieldErrors.confirmPassword}</FormError>
        </div>

        <Button type="submit" disabled={isLoading} fullWidth className="mt-2">
          {isLoading ? 'กำลังบันทึก...' : 'บันทึกรหัสผ่านใหม่'}
        </Button>
      </form>
    </div>
  );
}
