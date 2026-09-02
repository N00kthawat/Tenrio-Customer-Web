"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { buttonClasses } from "@/components/ui/button";

type Status = "verifying" | "success" | "invalid" | "expired" | "used" | "unavailable" | "error" | "missing_token";

export function VerifyEmailClient({ token }: { token?: string }) {
  const [status, setStatus] = useState<Status>("verifying");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("missing_token");
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    async function verifyToken() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const res = await fetch(`${apiUrl}/v1/auth/verify-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          setStatus("success");
          return;
        }

        const data = await res.json().catch(() => ({}));
        const errorMessage = String(data.message || "").toLowerCase();
        const errorCode = String(data.code || "").toLowerCase();

        if (res.status === 400 || res.status === 401 || res.status === 403 || res.status === 422) {
          if (errorMessage.includes("expire") || errorCode.includes("expire")) {
            setStatus("expired");
          } else if (errorMessage.includes("used") || errorMessage.includes("already") || errorCode.includes("used")) {
            setStatus("used");
          } else {
            setStatus("invalid");
          }
        } else if (res.status === 409) {
          setStatus("used");
        } else if (res.status >= 500) {
          setStatus("unavailable");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("unavailable");
      }
    }

    verifyToken();
  }, [token]);

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
