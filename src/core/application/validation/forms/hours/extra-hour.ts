import { z } from "zod";

const bandSchema = z.object({
	isHourBank: z.boolean(),
	toTime: z.string(),
	fromTime: z.string(),
	eventCode: z.string(),
	percentageMultiplier: z.string(),
});

const rulesSchema = z.object({
	accumulated: z.string(),
	ruleIndex: z.number(),
	specificDays: z.array(z.string()).optional(),
	day: z.string(),
	holiday: z.string(),
	nightly: z.string(),
	bands: z.array(bandSchema),
});

export const extraHourSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
	rules: z.array(rulesSchema),
	status: z.string().min(3),
});
