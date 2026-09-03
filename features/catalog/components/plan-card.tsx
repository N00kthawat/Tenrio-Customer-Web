import { Microsoft365Plan } from "@/services/catalog/microsoft-365-catalog.types";
import { KNOWN_FEATURES } from "@/services/catalog/microsoft-365-catalog.constants";
import { useTranslation } from "@/lib/i18n/I18nProvider";

interface PlanCardProps {
  plan: Microsoft365Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const { t } = useTranslation();
  
  const positioningKey = `catalog.microsoft365.planPositioning.${plan.code}` as Parameters<typeof t>[0];
  const positioning = t(positioningKey);
  const displayPositioning = positioning !== positioningKey ? positioning : "";

  // Filter out unknown features for the customer presentation
  const presentableFeatures = plan.featureKeys.filter((key) => 
    KNOWN_FEATURES.includes(key as import("@/services/catalog/microsoft-365-catalog.types").KnownMicrosoft365FeatureKey)
  );

  return (
    <div className="flex flex-col border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm h-full">
      <div className="p-6 border-b border-slate-100 flex-1">
        <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
        {displayPositioning && (
          <p className="mt-3 text-sm text-slate-600 leading-relaxed min-h-[40px]">
            {displayPositioning}
          </p>
        )}
      </div>
      <div className="p-6 bg-slate-50">
        <ul className="space-y-4">
          {presentableFeatures.map((key) => {
            const labelKey = `catalog.microsoft365.features.${key}.label` as Parameters<typeof t>[0];
            const displayLabel = t(labelKey);
            return (
              <li key={key} className="flex items-start text-sm text-slate-700">
                <span aria-hidden="true" className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-sm font-semibold text-emerald-700 mr-3">
                  ✓
                </span>
                <span className="leading-snug">{displayLabel}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
