import { z } from "zod";
import "../../error-messages";
export const occurrenceSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
	status: z.string().min(1),
	field: z.string().min(1),
	considerFrom: z.string().min(1),
	controllerOccurrence: z.boolean(),
});
