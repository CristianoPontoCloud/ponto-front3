import { z } from "zod";

export const nightTurnValidations = {
	nightShiftStartTime: z.string().optional(),
	nightShiftEndTime: z.string().optional(),
	nightShiftFactor: z.string().optional(),
	extendedNightShiftSimulate60: z.string().optional(),
	sundaysAndHolidaysAtDayChange: z.string().optional(),
};
