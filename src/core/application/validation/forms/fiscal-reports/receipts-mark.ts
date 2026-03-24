import { z } from "zod";
import "../../error-messages";
export const receiptsMarkSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  collaborators: z.array(z.string()).min(1),
  format: z.string().optional()
});
