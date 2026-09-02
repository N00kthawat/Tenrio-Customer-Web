"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function LanguageSwitcher() {
  const { locale } = useTranslation();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLocale = locale === "th" ? "en" : "th";
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <button 
      onClick={toggleLanguage} 
      className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
    >
      {locale === "th" ? "EN" : "TH"}
    </button>
  );
}
