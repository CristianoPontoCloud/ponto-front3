import { z } from "zod";
import "../../error-messages";
export const equimentSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
	status: z.string().min(1),
	markId: z.string().min(1),
	modelId: z.string().min(1),
	ip: z.string().min(11),
	port: z.string().min(0).max(5),
	user: z.string().optional(),
	password: z.string().optional(),
	serialNumber: z.string().optional(),
});
