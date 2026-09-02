import { InfoCard } from "@/components/info-card";
import { PageShell } from "@/components/page-shell";

const plans = [
  {
    name: "Microsoft 365 Business Basic",
    summary: "A lightweight setup for business email, collaboration, and cloud productivity.",
    points: ["Business email", "Cloud file storage", "Browser and mobile productivity apps"],
  },
  {
    name: "Microsoft 365 Business Standard",
    summary: "A more complete option for teams that also need desktop productivity software.",
    points: ["Everything in Business Basic", "Desktop Word, Excel, and PowerPoint", "Expanded day-to-day office workflow"],
  },
] as const;

export default function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Plan presentation starts here, but authoritative pricing stays in the backend."
      description="This page is intentionally static for the initial skeleton. Final prices, terms, taxes, and availability must be provided by the Backend API."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {plans.map((plan) => (
          <article className="surface p-6" key={plan.name}>
            <p className="eyebrow">Initial MVP plan</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">{plan.name}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{plan.summary}</p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {plan.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-canvas p-4 text-sm text-slate-700">
              Pricing, billing term, taxes, and final totals will be supplied by trusted backend
              responses in later tasks.
            </div>
          </article>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard
          title="Supported terms"
          description="Monthly and annual terms are the target MVP options, but availability must follow the chosen Microsoft or distributor offer."
        />
        <InfoCard
          title="Plain-language content"
          description="This skeleton keeps the copy customer-friendly and avoids exposing internal partner terminology."
        />
      </div>
    </PageShell>
  );
}
