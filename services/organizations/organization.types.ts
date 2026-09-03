export type BranchType = 'HEAD_OFFICE' | 'BRANCH';

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  legalName?: string | null;
  juristicRegistrationNumber?: string | null;
  taxId?: string | null;
  branchType?: BranchType | null;
  branchNumber?: string | null;

  billingEmail?: string | null;
  phoneNumber?: string | null;

  addressLine?: string | null;
  subdistrict?: string | null;
  district?: string | null;
  province?: string | null;
  postalCode?: string | null;
  country?: string | null;
}

export interface CreateOrganizationRequest {
  name: string;
}

export interface UpdateOrganizationRequest {
  name: string;
  legalName?: string | null;
  juristicRegistrationNumber?: string | null;
  taxId?: string | null;
  branchType?: BranchType | null;
  branchNumber?: string | null;
  billingEmail?: string | null;
  phoneNumber?: string | null;
  addressLine?: string | null;
  subdistrict?: string | null;
  district?: string | null;
  province?: string | null;
  postalCode?: string | null;
  country?: string | null;
}
