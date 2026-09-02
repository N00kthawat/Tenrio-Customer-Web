import { PageShell } from "@/components/page-shell";

export default function LoginPage() {
  return (
    <PageShell
      eyebrow="Login"
      title="Sign in UI placeholder"
      description="Real authentication is intentionally out of scope for this task. This route exists so the initial customer navigation is present and styled."
    >
      <section className="surface mx-auto max-w-xl p-6 sm:p-8">
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input className="field" id="email" name="email" placeholder="name@company.com" type="email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <input className="field" id="password" name="password" placeholder="Enter your password" type="password" />
          </div>
          <button className="primary-button w-full" type="button">
            Continue
          </button>
        </form>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          Authentication behavior, validation rules, and session handling will be wired to the
          Backend API in later work.
        </p>
      </section>
    </PageShell>
  );
}
