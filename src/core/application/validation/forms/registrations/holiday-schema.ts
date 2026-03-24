import { z } from "zod";
import "../../error-messages";
export const holidaySchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
	status: z.string().min(1),
	date: z.date(),
	collaboratorLinks: z.array(z.string()).nullable().optional(),
	departmentLinks: z.array(z.string()).nullable().optional(),
	repeatHolidaysAllYears: z.boolean().optional(),
});
