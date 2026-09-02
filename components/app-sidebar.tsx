"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { APP_SIDEBAR_NAVIGATION } from "@/config/navigation";

export function AppSidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-slate-50/50 md:flex">
      <div className="flex-1 overflow-y-auto py-6 pr-4 pl-6">
        <nav className="flex flex-col gap-1">
          {APP_SIDEBAR_NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.labelKey}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
