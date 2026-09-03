import { PageShell } from "@/components/page-shell";
import { OrganizationProfileForm } from "@/features/organizations/components/organization-profile-form";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";
import { cookies } from "next/headers";

export default async function OrganizationProfilePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "th") as Locale;
  const t = await getDictionary(locale);

  return (
    <PageShell
      title={t.organization.profile.title}
      description={t.organization.profile.pageDesc}
    >
      <OrganizationProfileForm />
    </PageShell>
  );
}
