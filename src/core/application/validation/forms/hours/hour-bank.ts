import { z } from "zod";

export const hourBankSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
	startDate: z.date(),
	endDate: z.date(),
	resetDBEveryXMonths: z.string(),
	status: z.string().optional(),
	discountAbsences: z.boolean().optional(),
	discountLateArrivals: z.boolean().optional(),
	discountEarlyDeparture: z.boolean().optional(),
});
