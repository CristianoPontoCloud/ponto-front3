import { z } from "zod";
import "../../error-messages";
export const costCenterSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
	status: z.string().min(1),
});
