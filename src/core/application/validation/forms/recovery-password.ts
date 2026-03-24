import { z } from "zod";

export const recoveryPasswordWithEmailSchema = z.object({ email: z.string().email() })
export const recoveryPasswordWithPhoneSchema = z.object({
  phone: z.string().regex(
    /^\(\d{2}\)\s9\d{4}-\d{4}$/,
  )
})
export const confirmationSmsCodeSchema = z.object({
  code: z.string()
})

export const recoveryPasswordSchema = z.object({
  password: z.string().min(6)
    .regex(/[A-Za-z]/)
    .regex(/\d/),
  confirmPassword: z.string().min(6)
    .regex(/[A-Za-z]/)
    .regex(/\d/),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
})
