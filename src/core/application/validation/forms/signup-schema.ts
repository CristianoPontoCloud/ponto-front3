import { z } from "zod";

export const signupConfirmEmailSchema = z.object({
  email: z.string().email(),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
    .regex(/[A-Za-z]/)
    .regex(/\d/),
  confirmPassword: z.string().min(6)
    .regex(/[A-Za-z]/)
    .regex(/\d/),
  cnpj: z.string().min(18),
  firstName: z.string().min(3),
  phone: z.string().regex(
    /^\(\d{2}\)\s9\d{4}-\d{4}$/,
  ),
  lastName: z.string().min(3),
  fantasyName: z.string().min(3),
  planId: z.string().min(32),
  companySize: z.string().min(1),
  // positionId: z.string().min(32)
  positionId: z.string().min(3)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
})
