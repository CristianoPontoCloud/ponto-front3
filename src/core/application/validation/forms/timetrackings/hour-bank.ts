import { z } from "zod";
import "../../error-messages";


export const timetrackingHourBankEntryValidation = z.object({
  type: z.string().min(1),
  hourBankId: z.string().uuid(),
  collaboratorId: z.string().uuid(),
  minutes: z.string().min(5),
  date: z.string().min(10),
  reason: z.string().optional(),
});

export const timetrackingHourBankSchema = z.object({
  entries: z.array(timetrackingHourBankEntryValidation)
})
