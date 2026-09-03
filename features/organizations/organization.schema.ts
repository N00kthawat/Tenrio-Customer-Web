import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(1, { message: "organization.errors.nameRequired" }),
});

export type CreateOrganizationFormData = z.infer<typeof createOrganizationSchema>;
