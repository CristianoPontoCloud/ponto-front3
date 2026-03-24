import { z } from "zod";
import "../../error-messages";
export const AFDSchema = z.object({
  turns: z.array(z.string()).optional(),
  departments: z.array(z.string()).optional(),
  positions: z.array(z.string()).optional(),
  costcenters: z.array(z.string()).optional(),
  collaborators: z.array(z.string()).min(1),
  periodStart: z.date(),
  periodEnd: z.date(),
  companyId: z.string().min(3),
  requesterId: z.string(),
  repDeviceId: z.string(),
});
