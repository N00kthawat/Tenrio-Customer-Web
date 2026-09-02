import Link from "next/link";
import { cookies } from "next/headers";
import { InfoCard } from "@/components/info-card";
import { buttonClasses } from "@/components/ui/button";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";
import { ROUTES } from "@/config/routes";

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "th") as Locale;
  const t = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <section className="surface overflow-hidden p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <p className="eyebrow">{t.home.eyebrow1}</p>
            <div className="space-y-4">
              <h1 className="page-title">{t.home.title}</h1>
              <p className="muted-copy max-w-2xl">
                {t.home.desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className={buttonClasses({ variant: "primary" })} href={ROUTES.MARKETING.PRICING}>
                {t.home.btnPricing}
              </Link>
              <Link className={buttonClasses({ variant: "secondary" })} href={ROUTES.AUTH.REGISTER}>
                {t.home.btnRegister}
              </Link>
            </div>
          </div>
          <div className="surface bg-slate-50 p-6">
            <p className="eyebrow">{t.home.eyebrow2}</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li>{t.home.point1}</li>
              <li>{t.home.point2}</li>
              <li>{t.home.point3}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <InfoCard
          title={t.home.card1Title}
          description={t.home.card1Desc}
        />
        <InfoCard
          title={t.home.card2Title}
          description={t.home.card2Desc}
        />
        <InfoCard
          title={t.home.card3Title}
          description={t.home.card3Desc}
        />
      </section>
    </div>
  );
}
