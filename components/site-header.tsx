"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MAIN_NAVIGATION } from "@/config/navigation";
import { ROUTES } from "@/config/routes";

export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <header className="surface sticky top-4 z-10 px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link className="text-2xl font-semibold text-slate-900" href={ROUTES.HOME}>
            Tenrio
          </Link>
          <p className="mt-1 text-sm text-slate-500">
            {t("footer.desc")}
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-2">
          {MAIN_NAVIGATION.map((link) => (
            <Link className="nav-link" href={link.href} key={link.href}>
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-slate-200">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
