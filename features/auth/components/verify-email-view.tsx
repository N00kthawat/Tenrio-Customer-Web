"use client";

import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { buttonClasses } from "@/components/ui/button";
import { useVerifyEmail } from "../hooks/use-verify-email";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ROUTES } from "@/config/routes";

import { AuthShell } from "./auth-shell";

export function VerifyEmailView({ token }: { token?: string }) {
  const { t } = useTranslation();
  const { status } = useVerifyEmail(token);

  const renderContent = () => {
    switch (status) {
      case "missing_token":
        return (
          <Alert variant="error">
            {t("auth.verify.missingToken")}
          </Alert>
        );
      case "verifying":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" aria-label={t("auth.verify.verifying")}></div>
            <p className="text-slate-600">{t("auth.verify.verifying")}</p>
          </div>
        );
      case "success":
        return (
          <div className="space-y-6 text-center">
            <Alert variant="success" className="text-left">
              {t("auth.verify.successAlert")}
            </Alert>
            <p className="text-slate-600">
              {t("auth.verify.successDesc")}
            </p>
          </div>
        );
      case "invalid":
        return (
          <Alert variant="error">
            {t("auth.verify.invalidAlert")}
          </Alert>
        );
      case "expired":
        return (
          <Alert variant="error">
            {t("auth.verify.expiredAlert")}
          </Alert>
        );
      case "used":
        return (
          <Alert variant="info">
            {t("auth.verify.usedAlert")}
          </Alert>
        );
      case "unavailable":
        return (
          <Alert variant="error">
            {t("auth.verify.unavailableAlert")}
          </Alert>
        );
      case "error":
      default:
        return (
          <Alert variant="error">
            {t("auth.verify.errorAlert")}
          </Alert>
        );
    }
  };

  const footer = status !== "verifying" ? (
    <Link href={ROUTES.AUTH.LOGIN} className={buttonClasses({ fullWidth: true })}>
      {t("auth.verify.backToLogin")}
    </Link>
  ) : undefined;

  return (
    <AuthShell 
      title={t("auth.verify.title")} 
      centerHeader
      footer={footer}
    >
      <div aria-live="polite">
        {renderContent()}
      </div>
    </AuthShell>
  );
}
