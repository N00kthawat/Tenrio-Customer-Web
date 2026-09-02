import { cookies } from "next/headers";
import { InfoCard } from "@/components/info-card";
import { PageShell } from "@/components/page-shell";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "th") as Locale;
  const t = await getDictionary(locale);

  return (
    <PageShell
      eyebrow={t.dashboard.eyebrow}
      title={t.dashboard.title}
      description={t.dashboard.desc}
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="surface p-6">
          <p className="eyebrow">{t.dashboard.overview}</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{t.dashboard.noDataTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {t.dashboard.noDataDesc}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-slate-50 p-4 border border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t.dashboard.orders}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{t.dashboard.empty}</p>
            </div>
            <div className="rounded-md bg-slate-50 p-4 border border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t.dashboard.subscriptions}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{t.dashboard.empty}</p>
            </div>
            <div className="rounded-md bg-slate-50 p-4 border border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t.dashboard.invoices}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{t.dashboard.empty}</p>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <InfoCard
            title={t.dashboard.card1Title}
            description={t.dashboard.card1Desc}
          />
          <InfoCard
            title={t.dashboard.card2Title}
            description={t.dashboard.card2Desc}
          />
          <InfoCard
            title={t.dashboard.card3Title}
            description={t.dashboard.card3Desc}
          />
        </section>
      </div>
    </PageShell>
  );
}
