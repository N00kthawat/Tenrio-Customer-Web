"use client";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader />
      <div className="flex flex-1 items-stretch overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-white p-6 sm:p-8">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
