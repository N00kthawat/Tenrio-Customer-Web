"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { APP_HEADER_NAVIGATION } from "@/config/navigation";
import { ROUTES } from "@/config/routes";
import { AccountMenu } from "./account-menu";
import { ResponsiveBrandLogo } from "./brand-logo";

export function AppHeader() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-6">
        <Link href={ROUTES.DASHBOARD.HOME}>
          <ResponsiveBrandLogo />
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium mr-2">
          {APP_HEADER_NAVIGATION.map((link) => (
            <Link className="text-slate-600 hover:text-slate-900" href={link.href} key={link.labelKey}>
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>
        
        <LanguageSwitcher />
        
        <div className="ml-2 border-l border-slate-200 pl-4">
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
