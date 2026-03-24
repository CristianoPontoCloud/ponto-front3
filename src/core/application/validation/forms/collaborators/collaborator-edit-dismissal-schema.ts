import { z } from "zod";

export const collaboratorEditDismissalSchema = z.object({
  date: z.date(),
  reason: z.string().min(1),
  observation: z.string().max(200).optional(),
});
