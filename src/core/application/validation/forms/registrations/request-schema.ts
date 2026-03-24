import { z } from "zod";
import "../../error-messages";
export const requestSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
	abbreviation: z.string().min(2).max(8),
	status: z.string().min(1),
	type: z.string().min(1),
	computeAs: z.string().min(1),
	discountDSR: z.boolean(),
	makeAvailableCollaborator: z.boolean(),
});
