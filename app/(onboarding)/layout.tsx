import { AppHeader } from "@/components/app-header";
import { AuthGuard } from "@/components/auth-guard";
import { OrganizationGuard } from "@/components/organization-guard";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <OrganizationGuard requireSetup>
        <div className="flex min-h-screen flex-col bg-slate-50">
          <AppHeader />
          <main className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6">
            {children}
          </main>
        </div>
      </OrganizationGuard>
    </AuthGuard>
  );
}
