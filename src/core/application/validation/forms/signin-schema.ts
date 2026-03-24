import { z } from "zod";

export const signinSchema = z.object({
  identifier: z.string().min(3),
  password: z.string(),
  // password: z.string().min(6)
  //   .regex(/[A-Za-z]/)
  //   .regex(/\d/),
  stayConnected: z.boolean().optional()
});
