import { PageShell } from "@/components/page-shell";

export default function RegisterPage() {
  return (
    <PageShell
      eyebrow="Register"
      title="Create account UI placeholder"
      description="This is a presentational route only. It reserves the customer onboarding entry point without implementing backend-backed account creation."
    >
      <section className="surface mx-auto max-w-2xl p-6 sm:p-8">
        <form className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="register-email">
              Work email
            </label>
            <input
              className="field"
              id="register-email"
              name="register-email"
              placeholder="team@company.com"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="register-password">
              Password
            </label>
            <input
              className="field"
              id="register-password"
              name="register-password"
              placeholder="Create a password"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="register-confirm-password">
              Confirm password
            </label>
            <input
              className="field"
              id="register-confirm-password"
              name="register-confirm-password"
              placeholder="Repeat your password"
              type="password"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="organization">
              Organization name
            </label>
            <input
              className="field"
              id="organization"
              name="organization"
              placeholder="Your business name"
              type="text"
            />
          </div>
          <div className="sm:col-span-2">
            <button className="primary-button w-full" type="button">
              Create account
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          Final registration fields and validation rules are still subject to the backend
          contract and future requirement refinement.
        </p>
      </section>
    </PageShell>
  );
}
