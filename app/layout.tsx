import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans-thai",
});

export const metadata: Metadata = {
  title: "Tenrio Customer Web",
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
    <html lang={locale}>
      <body className={`${ibmPlexSansThai.className} font-sans`}>
        <I18nProvider locale={locale} dictionary={dictionary}>
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-8">
            <SiteHeader />
            <main className="flex-1 py-8">{children}</main>
            <footer className="mt-8 border-t border-slate-200/80 pt-6 text-sm text-slate-500">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p>{dictionary.footer.desc}</p>
                <div className="flex items-center gap-4">
                  <Link className="hover:text-slate-900" href={ROUTES.MARKETING.PRICING}>
                    {dictionary.nav.pricing}
                  </Link>
                  <Link className="hover:text-slate-900" href={ROUTES.DASHBOARD.HOME}>
                    {dictionary.nav.dashboard}
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
