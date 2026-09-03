import { Microsoft365Plan } from "@/services/catalog/microsoft-365-catalog.types";
import { KNOWN_FEATURES } from "@/services/catalog/microsoft-365-catalog.constants";
import { useTranslation } from "@/lib/i18n/I18nProvider";

interface PlanComparisonProps {
  plans: Microsoft365Plan[];
}

export function PlanComparison({ plans }: PlanComparisonProps) {
  const { t } = useTranslation();

  if (plans.length === 0) return null;

  return (
    <div className="mt-16 sm:mt-24">
      <h2 className="text-2xl font-semibold text-slate-900 mb-8">{t("catalog.microsoft365.comparisonTitle")}</h2>
      
      <div className="overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] text-left border-collapse">
            <thead>
              <tr>
                <th scope="col" className="w-1/3 p-4 border-b border-slate-200 bg-slate-50 font-medium text-slate-900">
                  {t("catalog.microsoft365.featuresHeader")}
                </th>
                {plans.map((plan) => (
                  <th scope="col" key={plan.id} className="w-1/3 p-4 border-b border-l border-slate-200 bg-slate-50 text-center font-medium text-slate-900">
                    {plan.code === "BUSINESS_BASIC" 
                      ? "Business Basic" 
                      : plan.code === "BUSINESS_STANDARD" 
                        ? "Business Standard" 
                        : plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {KNOWN_FEATURES.map((featureKey) => {
                const labelKey = `catalog.microsoft365.features.${featureKey}.label` as Parameters<typeof t>[0];
                const displayLabel = t(labelKey);
                
                const descKey = `catalog.microsoft365.features.${featureKey}.desc` as Parameters<typeof t>[0];
                const desc = t(descKey);
                const displayDesc = desc !== descKey ? desc : "";

                return (
                  <tr key={featureKey}>
                    <th scope="row" className="p-4 align-top text-left font-normal bg-white">
                      <div className="font-medium text-slate-900 text-sm">{displayLabel}</div>
                      {displayDesc && <div className="text-sm text-slate-500 mt-1">{displayDesc}</div>}
                    </th>
                    {plans.map((plan) => {
                      const isIncluded = plan.featureKeys.includes(featureKey);
                      return (
                        <td key={plan.id} className="p-4 align-middle border-l border-slate-200 text-center">
                          {isIncluded ? (
                            <div className="flex justify-center">
                              <span
                                role="img"
                                aria-label={t("catalog.microsoft365.included")}
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-lg font-bold text-emerald-700"
                              >
                                ✓
                              </span>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <span
                                role="img"
                                aria-label={t("catalog.microsoft365.notIncluded")}
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-lg font-bold text-slate-400"
                              >
                                —
                              </span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
