"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonClasses } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { FormError } from "@/components/ui/form-error";
import { useForgotPassword } from "../hooks/use-forgot-password";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";

import { AuthShell } from "./auth-shell";

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const { email, setEmail, isLoading, error, isSuccess, fieldErrors, handleSubmit } = useForgotPassword();

  if (isSuccess) {
    return (
      <AuthShell title={t("auth.forgot.successTitle")} centerHeader>
        <Alert variant="success" className="text-left mb-6">
          {t("auth.forgot.successAlert")}
        </Alert>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed text-left whitespace-pre-line">
          {t("auth.forgot.successDesc")}
        </p>
        <Link href={ROUTES.AUTH.LOGIN} className={buttonClasses({ fullWidth: true })}>
          {t("auth.forgot.backToLogin")}
        </Link>
      </AuthShell>
    );
  }

  const footer = (
    <Link href={ROUTES.AUTH.LOGIN} className="font-medium text-blue-600 hover:text-blue-700">
      {t("auth.forgot.backToLogin")}
    </Link>
  );

  return (
    <AuthShell 
      title={t("auth.forgot.title")} 
      description={t("auth.forgot.desc")}
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && <Alert variant="error">{error}</Alert>}

        <div className="space-y-1.5">
          <Label htmlFor="email">{t("auth.forgot.email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t("auth.forgot.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            error={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          <FormError id="email-error">{fieldErrors.email}</FormError>
        </div>

        <Button type="submit" disabled={isLoading} fullWidth className="mt-2">
          {isLoading ? t("auth.forgot.submitting") : t("auth.forgot.submit")}
        </Button>
      </form>
    </AuthShell>
  );
}
