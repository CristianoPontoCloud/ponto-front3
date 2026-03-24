import { z } from "zod";
import "../../error-messages";
export const timetrackingMarkSchema = z.object({
  date: z.date(),
  hour: z.string(),
  justify: z.string().min(10).max(200)
});
