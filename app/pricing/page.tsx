import { cookies } from "next/headers";
import { InfoCard } from "@/components/info-card";
import { PageShell } from "@/components/page-shell";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

export default async function PricingPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "th") as Locale;
  const t = await getDictionary(locale);

  const plans = [
    {
      name: t.pricing.plan1Name,
      summary: t.pricing.plan1Desc,
      points: [t.pricing.plan1Point1, t.pricing.plan1Point2, t.pricing.plan1Point3],
    },
    {
      name: t.pricing.plan2Name,
      summary: t.pricing.plan2Desc,
      points: [t.pricing.plan2Point1, t.pricing.plan2Point2, t.pricing.plan2Point3],
    },
  ];

  return (
    <PageShell
      eyebrow={t.pricing.eyebrow}
      title={t.pricing.title}
      description={t.pricing.desc}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {plans.map((plan) => (
          <article className="surface p-6" key={plan.name}>
            <p className="eyebrow">{t.pricing.planEyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{plan.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{plan.summary}</p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {plan.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="mt-6 rounded-md bg-slate-50 p-4 text-sm text-slate-700">
              {t.pricing.disclaimer}
            </div>
          </article>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard
          title={t.pricing.card1Title}
          description={t.pricing.card1Desc}
        />
        <InfoCard
          title={t.pricing.card2Title}
          description={t.pricing.card2Desc}
        />
      </div>
    </PageShell>
  );
}
