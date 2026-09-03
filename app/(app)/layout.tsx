import { AppShell } from "@/components/app-shell";
import { AuthGuard } from "@/components/auth-guard";
import { OrganizationGuard } from "@/components/organization-guard";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <OrganizationGuard>
        <AppShell>
          {children}
        </AppShell>
      </OrganizationGuard>
    </AuthGuard>
  );
}
