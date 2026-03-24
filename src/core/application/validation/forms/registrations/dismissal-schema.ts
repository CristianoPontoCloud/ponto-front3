import { z } from "zod";
import "../../error-messages";
export const dismissalSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
	status: z.string().min(1),
	applicant: z.string().min(1),
	companyId: z.string().min(1)
});
