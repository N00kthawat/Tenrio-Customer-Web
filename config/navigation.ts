import { ROUTES } from "./routes";

export const MAIN_NAVIGATION = [
  { href: ROUTES.HOME, labelKey: "nav.home" },
  { href: ROUTES.MARKETING.PRICING, labelKey: "nav.pricing" },
  { href: ROUTES.AUTH.LOGIN, labelKey: "nav.login" },
  { href: ROUTES.AUTH.REGISTER, labelKey: "nav.register" },
  { href: ROUTES.DASHBOARD.HOME, labelKey: "nav.dashboard" },
] as const;
