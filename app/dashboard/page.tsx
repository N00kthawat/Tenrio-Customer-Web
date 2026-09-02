import { InfoCard } from "@/components/info-card";
import { PageShell } from "@/components/page-shell";

export default function DashboardPage() {
  return (
    <PageShell
      eyebrow="Dashboard"
      title="A customer dashboard shell for future subscription and billing features."
      description="This page is intentionally static in the initial project skeleton. Live customer data, authorization, and status tracking will come from the Backend API later."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="surface p-6">
          <p className="eyebrow">Overview</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">No live account data yet</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This placeholder area will eventually summarize subscriptions, seat counts, payment
            state, and renewal timing for the signed-in customer.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-canvas p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Orders
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink">--</p>
            </div>
            <div className="rounded-2xl bg-canvas p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Subscriptions
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink">--</p>
            </div>
            <div className="rounded-2xl bg-canvas p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Invoices
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink">--</p>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <InfoCard
            title="Orders"
            description="Future work can place order history and payment status here once backend contracts exist."
          />
          <InfoCard
            title="Subscriptions"
            description="Subscription cards can later show plan, seats, term, and renewal information from trusted backend data."
          />
          <InfoCard
            title="Support"
            description="A support entry point can be added here without coupling this task to ticketing or email flows."
          />
        </section>
      </div>
    </PageShell>
  );
}
