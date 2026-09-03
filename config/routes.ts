export const ROUTES = {
  HOME: "/",
  MARKETING: {
    PRICING: "/pricing",
  },
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    VERIFY_EMAIL: "/verify-email",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },
  DASHBOARD: {
    HOME: "/dashboard",
  },
  ORGANIZATION: {
    SETUP: "/organization/setup",
    PROFILE: "/organization/profile",
  },
} as const;
