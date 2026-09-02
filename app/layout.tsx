import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Tenrio Customer Web",
  description: "Initial customer web skeleton for Tenrio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-8">
          <SiteHeader />
          <main className="flex-1 py-8">{children}</main>
          <footer className="mt-8 border-t border-slate-200/80 pt-6 text-sm text-slate-500">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>Tenrio customer experience skeleton for Microsoft 365 self-service.</p>
              <div className="flex items-center gap-4">
                <Link className="hover:text-ink" href="/pricing">
                  Pricing
                </Link>
                <Link className="hover:text-ink" href="/dashboard">
                  Dashboard
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
