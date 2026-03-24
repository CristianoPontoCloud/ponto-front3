import { z } from "zod";

// export const onCallAllDaySchema = z.object({
// 	name: z.string().min(3),
// 	type: z.string().optional(),
// 	status: z.string().min(1),
// 	// date: z.date(),
// 	initialDate: z.date().optional().nullable(),
// 	finalDate: z.date().optional().nullable(),
// 	initialTime: z.string().min(5),
// 	finalTime: z.string().min(5),
// 	obs: z.string().optional(),
// 	departmentsIds: z.array(z.string()).optional(),
// 	collaboratorsIds: z.array(z.string()).optional(),
// 	turnsIds: z.array(z.string()).optional(),
// });

// export const onCallPeriodSchema = z.object({
// 	name: z.string().min(3),
// 	type: z.string().optional(),
// 	status: z.string().min(1),
// 	initialDate: z.date(),
// 	finalDate: z.date(),
// 	initialTime: z.string().min(5),
// 	finalTime: z.string().min(5),
// 	obs: z.string().optional(),
// 	departmentsIds: z.array(z.string()).optional(),
// 	collaboratorsIds: z.array(z.string()).optional(),
// 	turnsIds: z.array(z.string()).optional(),
// });

export const onCallSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(3),
	type: z.string().optional(),
	status: z.string().min(1),
	initialDate: z.date(),
	finalDate: z.date(),
	initialTime: z.string().min(5),
	finalTime: z.string().min(5),
	obs: z.string().optional(),
	departmentIds: z.array(z.string()).optional(),
	collaboratorIds: z.array(z.string()).optional(),
	turnIds: z.array(z.string()).optional(),
});
