"use client";

import { createContext, useContext, ReactNode } from "react";
import { Dictionary } from "./dictionaries";

type I18nContextType = {
  locale: string;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ 
  locale, 
  dictionary, 
  children 
}: { 
  locale: string; 
  dictionary: Dictionary; 
  children: ReactNode;
}) {
  const t = (key: string): string => {
    return key.split('.').reduce((obj: Record<string, unknown>, k: string) => (obj && obj[k]) as Record<string, unknown>, dictionary as unknown as Record<string, unknown>) as unknown as string || key;
  };

  return (
    <I18nContext.Provider value={{ locale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
