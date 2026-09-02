import { ROUTES } from "./routes";

export const PUBLIC_NAVIGATION = [
  { href: ROUTES.MARKETING.PRICING, labelKey: "nav.pricing" },
] as const;

export const APP_SIDEBAR_NAVIGATION = [
  { href: ROUTES.DASHBOARD.HOME, labelKey: "nav.overview" },
  { href: "#", labelKey: "nav.orders" },
  { href: "#", labelKey: "nav.subscriptions" },
  { href: "#", labelKey: "nav.licenses" },
  { href: "#", labelKey: "nav.billing" },
  { href: "#", labelKey: "nav.invoices" },
  { href: "#", labelKey: "nav.support" },
  { href: "#", labelKey: "nav.settings" },
] as const;

export const APP_HEADER_NAVIGATION = [
  { href: "#", labelKey: "nav.help" },
] as const;
