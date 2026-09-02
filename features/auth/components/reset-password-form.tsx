"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonClasses } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";
import { useResetPassword } from "../hooks/use-reset-password";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";

import { AuthShell } from "./auth-shell";

export function ResetPasswordForm({ token }: { token?: string }) {
  const { t } = useTranslation();
  const { 
    password, setPassword, 
    confirmPassword, setConfirmPassword, 
    isLoading, error, isSuccess, fieldErrors, 
    handleSubmit 
  } = useResetPassword(token);

  if (!token) {
    return (
      <AuthShell title={t("auth.reset.invalidTitle")} centerHeader>
        <Alert variant="error" className="text-left mb-6">
          {t("auth.reset.invalidAlert")}
        </Alert>
        <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className={buttonClasses({ fullWidth: true })}>
          {t("auth.reset.requestNew")}
        </Link>
      </AuthShell>
    );
  }

  if (isSuccess) {
    return (
      <AuthShell title={t("auth.reset.successTitle")} centerHeader>
        <Alert variant="success" className="text-left mb-6">
          {t("auth.reset.successAlert")}
        </Alert>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed text-left">
          {t("auth.reset.successDesc")}
        </p>
        <Link href={ROUTES.AUTH.LOGIN} className={buttonClasses({ fullWidth: true })}>
          {t("auth.reset.backToLogin")}
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell 
      title={t("auth.reset.title")} 
      description={t("auth.reset.desc")}
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && <Alert variant="error">{error}</Alert>}

        <div className="space-y-1.5">
          <Label htmlFor="password">{t("auth.reset.password")}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={t("auth.reset.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
          />
          <FormError id="password-error">{fieldErrors.password}</FormError>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">{t("auth.reset.confirm")}</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder={t("auth.reset.confirmPlaceholder")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.confirmPassword}
            aria-describedby={fieldErrors.confirmPassword ? "confirmPassword-error" : undefined}
          />
          <FormError id="confirmPassword-error">{fieldErrors.confirmPassword}</FormError>
        </div>

        <Button type="submit" disabled={isLoading} fullWidth className="mt-2">
          {isLoading ? t("auth.reset.submitting") : t("auth.reset.submit")}
        </Button>
      </form>
    </AuthShell>
  );
}
