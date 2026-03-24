import { z } from "zod";
import { dsrFieldValidations } from "./dsr";

const turnEntriesDay = z
	.object({
		total: z.string().min(1),
		turnDay: z.string().min(1),
		dsr: z.boolean(),
		week: z.string().optional(),
	})
	.catchall(z.string().optional());

export const turnSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
	patternType: z.string().min(1),
	cycleLengthDays: z.string().min(1),
	periods: z.string().min(1),
	entriesAndOutDays: z.array(turnEntriesDay).optional(),
	...dsrFieldValidations,
});
