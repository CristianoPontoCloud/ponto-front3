import { z } from "zod";
import "../../error-messages";
export const mirrorMarkSchema = z.object({
  competence: z.string().min(3),
  turns: z.array(z.string()).optional(),
  departments: z.array(z.string()).optional(),
  positions: z.array(z.string()).optional(),
  costcenters: z.array(z.string()).optional(),
  collaborators: z.array(z.string()).min(1),
});
