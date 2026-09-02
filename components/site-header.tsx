"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PUBLIC_NAVIGATION } from "@/config/navigation";
import { ROUTES } from "@/config/routes";
import { buttonClasses } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { AccountMenu } from "./account-menu";
import { ResponsiveBrandLogo } from "./brand-logo";

export function SiteHeader() {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className="surface sticky top-4 z-40 px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={ROUTES.HOME}>
            <ResponsiveBrandLogo />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link className="text-slate-600 hover:text-slate-900" href="#">
              Microsoft 365
            </Link>
            {PUBLIC_NAVIGATION.map((link) => (
              <Link className="text-slate-600 hover:text-slate-900" href={link.href} key={link.href}>
                {t(link.labelKey)}
              </Link>
            ))}
            <Link className="text-slate-600 hover:text-slate-900" href="#">
              {t("nav.help")}
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          
          {!isLoading && (
            <div className="hidden sm:flex items-center gap-3 ml-2 border-l border-slate-200 pl-4">
              {isAuthenticated ? (
                <>
                  <Link className={buttonClasses()} href={ROUTES.DASHBOARD.HOME}>
                    {t("nav.dashboard")}
                  </Link>
                  <AccountMenu />
                </>
              ) : (
                <>
                  <Link className="text-sm font-medium text-slate-600 hover:text-slate-900" href={ROUTES.AUTH.LOGIN}>
                    {t("nav.login")}
                  </Link>
                  <Link className={buttonClasses()} href={ROUTES.AUTH.REGISTER}>
                    {t("nav.register")}
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
