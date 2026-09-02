import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "validation.emailRequired")
  .email("validation.emailInvalid");

export const passwordSchema = z
  .string()
  .min(1, "validation.passwordRequired")
  .min(12, "validation.passwordMin");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "validation.passwordRequired"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwordMismatch",
    path: ["confirmPassword"],
  });
