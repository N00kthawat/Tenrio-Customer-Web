import { apiClient } from "@/lib/api/client";
import { Microsoft365Plan } from "./microsoft-365-catalog.types";
import { ApiError } from "@/lib/api/errors";

function isValidPlan(item: unknown): item is Microsoft365Plan {
  if (typeof item !== "object" || item === null) return false;
  
  const obj = item as Record<string, unknown>;
  
  if (typeof obj.id !== "string") return false;
  if (typeof obj.code !== "string") return false;
  if (typeof obj.slug !== "string") return false;
  if (typeof obj.name !== "string") return false;
  if (typeof obj.sortOrder !== "number" || !isFinite(obj.sortOrder)) return false;
  
  if (!Array.isArray(obj.featureKeys)) return false;
  for (const key of obj.featureKeys) {
    if (typeof key !== "string") return false;
  }
  
  return true;
}

export const Microsoft365CatalogService = {
  async getPlans(): Promise<Microsoft365Plan[]> {
    const data = await apiClient.get<unknown>("/v1/catalog/microsoft-365/plans");
    
    if (!Array.isArray(data)) {
      throw new ApiError(500, { message: "Invalid payload: Expected an array" }, "Validation Error");
    }
    
    for (const item of data) {
      if (!isValidPlan(item)) {
        throw new ApiError(500, { message: "Invalid payload: Malformed plan object" }, "Validation Error");
      }
    }
    
    return data;
  },
};
