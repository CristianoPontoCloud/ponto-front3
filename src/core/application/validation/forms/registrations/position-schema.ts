import { z } from "zod";
import "../../error-messages";
export const positionSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(2),
	status: z.string().min(1),
});
