import { z } from "zod";
import { BranchType } from "@/services/organizations/organization.types";

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(1, { message: "organization.errors.nameRequired" }),
});

export type CreateOrganizationFormData = z.infer<typeof createOrganizationSchema>;

export const updateOrganizationSchema = z.object({
  name: z.string().trim().min(1, { message: "organization.errors.nameRequired" }),
  legalName: z.string().optional(),
  juristicRegistrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  branchType: z.enum(["HEAD_OFFICE", "BRANCH"]).optional(),
  branchNumber: z.string().optional(),
  billingEmail: z.union([z.literal(""), z.string().trim().email({ message: "organization.errors.invalidEmail" })]).optional(),
  phoneNumber: z.string().optional(),
  addressLine: z.string().optional(),
  subdistrict: z.string().optional(),
  district: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

// We define our own form data type so that branchType can hold an empty string before validation.
export type UpdateOrganizationFormData = {
  name: string;
  legalName?: string;
  juristicRegistrationNumber?: string;
  taxId?: string;
  branchType?: BranchType | "";
  branchNumber?: string;
  billingEmail?: string;
  phoneNumber?: string;
  addressLine?: string;
  subdistrict?: string;
  district?: string;
  province?: string;
  postalCode?: string;
  country?: string;
};
