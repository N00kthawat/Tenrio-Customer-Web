import { apiClient } from "@/lib/api/client";
import { Organization, CreateOrganizationRequest, UpdateOrganizationRequest } from "./organization.types";

export const OrganizationService = {
  async getOrganizations(): Promise<Organization[]> {
    return apiClient.get<Organization[]>("/v1/organizations", { credentials: "include" });
  },

  async getOrganization(id: string): Promise<Organization> {
    return apiClient.get<Organization>(`/v1/organizations/${id}`, { credentials: "include" });
  },

  async createOrganization(data: CreateOrganizationRequest): Promise<Organization> {
    return apiClient.post<Organization>("/v1/organizations", data, { credentials: "include" });
  },

  async updateOrganization(id: string, data: UpdateOrganizationRequest): Promise<Organization> {
    return apiClient.patch<Organization>(`/v1/organizations/${id}`, data, { credentials: "include" });
  }
};
