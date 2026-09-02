"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth/auth.service";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";

export function AccountMenu() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { checkAuth } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      await checkAuth();
      router.push(ROUTES.HOME);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700 hover:bg-blue-200 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        U
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
          <Link
            href={ROUTES.DASHBOARD.HOME}
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => setIsOpen(false)}
          >
            {t("nav.settings")}
          </Link>
          <div className="my-1 border-t border-slate-100" />
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 font-medium"
          >
            {t("nav.logout")}
          </button>
        </div>
      )}
    </div>
  );
}
