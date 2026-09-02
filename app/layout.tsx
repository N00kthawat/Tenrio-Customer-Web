import type { Metadata } from "next";
import { cookies } from "next/headers";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { AuthProvider } from "@/providers/auth-provider";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans-thai",
});

export const metadata: Metadata = {
  title: "Tenrio",
  description: "Initial customer web skeleton for Tenrio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "th") as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} className="h-full bg-slate-50">
      <body className={`${ibmPlexSansThai.className} font-sans h-full antialiased text-slate-900`}>
        <I18nProvider locale={locale} dictionary={dictionary}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
