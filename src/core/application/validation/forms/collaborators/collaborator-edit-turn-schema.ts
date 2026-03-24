import { z } from "zod";

export const collaboratorEditTurnSchema = z.object({
  turnId: z.string().min(1),
  startDate: z.date(),
  positionCycle: z.string().min(1),
  observation: z.string().max(200).optional(),
});
