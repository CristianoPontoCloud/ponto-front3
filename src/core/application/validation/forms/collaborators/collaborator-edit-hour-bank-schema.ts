import { z } from "zod";

export const collaboratorEditHourBankSchema = z.object({
  hourBankId: z.string().optional(),
  startDate: z.date().nullable().optional(),
  observation: z.string().optional(),
});
