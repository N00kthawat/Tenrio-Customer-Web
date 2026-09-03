"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";
import { PageShell } from "@/components/page-shell";
import { useMicrosoft365Plans } from "@/features/catalog/hooks/use-microsoft-365-plans";
import { PlanCard } from "@/features/catalog/components/plan-card";
import { PlanComparison } from "@/features/catalog/components/plan-comparison";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

export default function Microsoft365CatalogPage() {
  const { t } = useTranslation();
  const { plans, isLoading, error, fetchPlans } = useMicrosoft365Plans();

  return (
    <PageShell
      title={t("catalog.microsoft365.title")}
      description={t("catalog.microsoft365.desc")}
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {isLoading && (
          <div className="space-y-12 animate-pulse">
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium">{t("catalog.microsoft365.loading")}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-[400px] rounded-xl bg-slate-100" />
              <div className="h-[400px] rounded-xl bg-slate-100" />
            </div>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center p-12 space-y-4 border border-slate-200 rounded-xl bg-white shadow-sm">
            <Alert variant="error">{t("catalog.microsoft365.errorDesc")}</Alert>
            <Button onClick={() => fetchPlans()}>{t("catalog.microsoft365.retry")}</Button>
          </div>
        )}

        {!isLoading && !error && plans.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center border border-slate-200 rounded-xl bg-white shadow-sm">
            <p className="text-slate-600">{t("catalog.microsoft365.empty")}</p>
          </div>
        )}

        {!isLoading && !error && plans.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            <PlanComparison plans={plans} />
          </>
        )}
      </div>
    </PageShell>
  );
}
