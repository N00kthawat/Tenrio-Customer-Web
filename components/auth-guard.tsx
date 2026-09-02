"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth/auth.service";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        await AuthService.getCurrentUser();
        if (!isMounted) return;
        setIsAuthenticated(true);
      } catch {
        if (!isMounted) return;
        // Safely redirect to login on backend failure to prevent exposing content or crashing
        router.replace(ROUTES.AUTH.LOGIN);
      }
    }

    checkAuth();
    return () => { isMounted = false; };
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div 
          className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" 
          aria-label={t("auth.verify.verifying")}
        />
      </div>
    );
  }

  return <>{children}</>;
}
