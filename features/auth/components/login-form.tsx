"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";
import { useLogin } from "../hooks/use-login";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";

import { AuthShell } from "./auth-shell";

export function LoginForm() {
  const { t } = useTranslation();
  const { 
    email, setEmail, 
    password, setPassword, 
    isLoading, error, fieldErrors, 
    handleSubmit 
  } = useLogin();

  const footer = (
    <>
      {t("auth.login.noAccount")}{' '}
      <Link href={ROUTES.AUTH.REGISTER} className="font-medium text-blue-600 hover:text-blue-700">
        {t("auth.login.registerLink")}
      </Link>
    </>
  );

  return (
    <AuthShell 
      title={t("auth.login.title")} 
      description={t("auth.login.desc")}
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && <Alert variant="error">{error}</Alert>}

        <div className="space-y-1.5">
          <Label htmlFor="email">{t("auth.login.email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t("auth.login.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          <FormError id="email-error">{fieldErrors.email}</FormError>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("auth.login.password")}</Label>
            <Link 
              href={ROUTES.AUTH.FORGOT_PASSWORD} 
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
              tabIndex={-1}
            >
              {t("auth.login.forgotPassword")}
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={t("auth.login.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
          />
          <FormError id="password-error">{fieldErrors.password}</FormError>
        </div>

        <Button type="submit" disabled={isLoading} fullWidth className="mt-2">
          {isLoading ? t("auth.login.submitting") : t("auth.login.submit")}
        </Button>
      </form>
    </AuthShell>
  );
}
