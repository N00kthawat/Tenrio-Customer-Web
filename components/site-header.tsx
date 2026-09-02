import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export function SiteHeader() {
  return (
    <header className="surface sticky top-4 z-10 px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link className="font-display text-2xl font-semibold text-ink" href="/">
            Tenrio
          </Link>
          <p className="mt-1 text-sm text-slate-500">
            Customer-facing skeleton for Microsoft 365 self-service
          </p>
        </div>
        <nav className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link className="nav-link" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
