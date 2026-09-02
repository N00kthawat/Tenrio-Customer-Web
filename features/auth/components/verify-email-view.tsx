"use client";

import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { buttonClasses } from "@/components/ui/button";
import { useVerifyEmail } from "../hooks/use-verify-email";

export function VerifyEmailView({ token }: { token?: string }) {
  const { status } = useVerifyEmail(token);

  const renderContent = () => {
    switch (status) {
      case "missing_token":
        return (
          <Alert variant="error">
            ไม่พบรหัสยืนยันในลิงก์ โปรดตรวจสอบลิงก์จากอีเมลของคุณอีกครั้ง
          </Alert>
        );
      case "verifying":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" aria-label="กำลังตรวจสอบข้อมูล"></div>
            <p className="text-slate-600">กำลังตรวจสอบข้อมูล...</p>
          </div>
        );
      case "success":
        return (
          <div className="space-y-6 text-center">
            <Alert variant="success" className="text-left">
              ยืนยันอีเมลสำเร็จ บัญชีของคุณพร้อมใช้งานแล้ว
            </Alert>
            <p className="text-slate-600">
              คุณสามารถเข้าสู่ระบบเพื่อเริ่มต้นการจัดการ Microsoft 365
            </p>
          </div>
        );
      case "invalid":
        return (
          <Alert variant="error">
            ลิงก์ยืนยันไม่ถูกต้องหรืออาจมีข้อผิดพลาด โปรดตรวจสอบลิงก์จากอีเมลของคุณ
          </Alert>
        );
      case "expired":
        return (
          <Alert variant="error">
            ลิงก์ยืนยันหมดอายุแล้ว
          </Alert>
        );
      case "used":
        return (
          <Alert variant="info">
            อีเมลนี้ได้รับการยืนยันไปแล้ว คุณสามารถเข้าสู่ระบบได้ทันที
          </Alert>
        );
      case "unavailable":
        return (
          <Alert variant="error">
            ไม่สามารถติดต่อระบบได้ในขณะนี้ โปรดลองใหม่อีกครั้งในภายหลัง
          </Alert>
        );
      case "error":
      default:
        return (
          <Alert variant="error">
            เกิดข้อผิดพลาดที่ไม่คาดคิด โปรดลองใหม่อีกครั้ง
          </Alert>
        );
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-12">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">ยืนยันอีเมล</h1>
      </div>

      <div className="mb-8" aria-live="polite">
        {renderContent()}
      </div>

      {status !== "verifying" && (
        <div className="text-center">
          <Link href="/login" className={buttonClasses({ fullWidth: true })}>
            ไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      )}
    </div>
  );
}
