import { z } from "zod";

export const emailSchema = z.string().min(1, "โปรดระบุอีเมลที่ถูกต้อง").email("โปรดระบุอีเมลที่ถูกต้อง");
export const passwordSchema = z.string().min(12, "รหัสผ่านต้องมีอย่างน้อย 12 ตัวอักษร");
export const nonEmptyPasswordSchema = z.string().min(1, "โปรดระบุรหัสผ่าน");

export const loginSchema = z.object({
  email: emailSchema,
  password: nonEmptyPasswordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
});
