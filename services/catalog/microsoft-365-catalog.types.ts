// Known frontend presentation codes/keys
export type KnownMicrosoft365PlanCode =
  | "BUSINESS_BASIC"
  | "BUSINESS_STANDARD";

export type KnownMicrosoft365FeatureKey =
  | "WEB_MOBILE_OFFICE"
  | "DESKTOP_OFFICE"
  | "BUSINESS_EMAIL"
  | "ONEDRIVE_1TB"
  | "TEAMS";

// Runtime API representation
export interface Microsoft365Plan {
  id: string;
  code: string;
  slug: string;
  name: string;
  featureKeys: string[];
  sortOrder: number;
}
