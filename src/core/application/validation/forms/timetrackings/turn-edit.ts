import { z } from "zod";
import "../../error-messages";
export const timetrackingTurnEditSchema = z.object({
  turn: z.string().min(1),
  typeDateChange: z.string().min(1),
  dtStart: z.date()
});
