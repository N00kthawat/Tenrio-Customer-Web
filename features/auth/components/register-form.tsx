"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonClasses } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";
import { useRegister } from "../hooks/use-register";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";

import { AuthShell } from "./auth-shell";

export function RegisterForm() {
  const { t } = useTranslation();
  const { 
    email, setEmail, 
    password, setPassword, 
    isLoading, error, isSuccess, fieldErrors, 
    handleSubmit 
  } = useRegister();

  if (isSuccess) {
    return (
      <AuthShell title={t("auth.register.successTitle")} centerHeader>
        <Alert variant="success" className="text-left mb-6">
          {t("auth.register.successAlert")}
        </Alert>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed text-left">
          {t("auth.register.successDesc")}
        </p>
        <Link href={ROUTES.AUTH.LOGIN} className={buttonClasses({ fullWidth: true })}>
          {t("auth.register.backToLogin")}
        </Link>
      </AuthShell>
    );
  }

  const footer = (
    <>
      {t("auth.register.hasAccount")}{' '}
      <Link href={ROUTES.AUTH.LOGIN} className="font-medium text-blue-600 hover:text-blue-700">
        {t("auth.register.loginLink")}
      </Link>
    </>
  );

  return (
    <AuthShell 
      title={t("auth.register.title")}
      description={t("auth.register.desc")}
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && <Alert variant="error">{error}</Alert>}

        <div className="space-y-1.5">
          <Label htmlFor="email">{t("auth.register.email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t("auth.register.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          <FormError id="email-error">{fieldErrors.email}</FormError>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">{t("auth.register.password")}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={t("auth.register.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
          />
          <FormError id="password-error">{fieldErrors.password}</FormError>
        </div>

        <Button type="submit" disabled={isLoading} fullWidth className="mt-2">
          {isLoading ? t("auth.register.submitting") : t("auth.register.submit")}
        </Button>
      </form>
    </AuthShell>
  );
}
