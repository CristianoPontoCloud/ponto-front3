import { z } from "zod";

export const collaboratorEditExtraHourSchema = z.object({
  extraHourId: z.string().min(1),
  startDate: z.date(),
  observation: z.string().max(200).optional(),
});
