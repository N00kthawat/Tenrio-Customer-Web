"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-8">
      <SiteHeader />
      <main className="flex-1 py-8">{children}</main>
      <PublicFooter />
    </div>
  );
}

function PublicFooter() {
  const { t } = useTranslation();

  return (
    <footer className="mt-8 border-t border-slate-200/80 pt-6 pb-6 text-sm text-slate-500">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>{t("footer.desc")}</p>
        <div className="flex items-center gap-4">
          <Link className="hover:text-slate-900" href={ROUTES.MARKETING.PRICING}>
            {t("nav.pricing")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
