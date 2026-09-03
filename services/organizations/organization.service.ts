import { apiClient } from "@/lib/api/client";
import { Organization, CreateOrganizationRequest } from "./organization.types";

export const OrganizationService = {
  async getOrganizations(): Promise<Organization[]> {
    return apiClient.get<Organization[]>("/v1/organizations", { credentials: "include" });
  },

  async createOrganization(data: CreateOrganizationRequest): Promise<Organization> {
    return apiClient.post<Organization>("/v1/organizations", data, { credentials: "include" });
  }
};
