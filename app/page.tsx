import Link from "next/link";
import { InfoCard } from "@/components/info-card";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="surface overflow-hidden p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <p className="eyebrow">Customer Web MVP</p>
            <div className="space-y-4">
              <h1 className="page-title">A clear starting point for buying and managing Microsoft 365.</h1>
              <p className="muted-copy max-w-2xl">
                This initial skeleton focuses on route structure and presentation only. Pricing,
                authentication, payment, and subscription state will come from the Backend API
                in later tasks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="primary-button" href="/pricing">
                Explore pricing
              </Link>
              <Link className="secondary-button" href="/register">
                Create account
              </Link>
            </div>
          </div>
          <div className="surface bg-cream p-6">
            <p className="eyebrow">What this includes</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li>App Router pages for public entry points and the initial dashboard.</li>
              <li>Strict TypeScript configuration and Tailwind-based styling.</li>
              <li>Static content only, with no backend or payment coupling.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <InfoCard
          title="Simple product discovery"
          description="The `/pricing` route introduces Business Basic and Business Standard in plain business language."
        />
        <InfoCard
          title="Authentication placeholders"
          description="The `/login` and `/register` routes are intentionally UI-only while backend auth is still undefined."
        />
        <InfoCard
          title="Dashboard scaffold"
          description="The `/dashboard` route gives us a shell for future orders, subscriptions, billing, and support sections."
        />
      </section>
    </div>
  );
}
