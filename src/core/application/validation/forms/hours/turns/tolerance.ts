import { z } from "zod";

export const toleranceFieldValidations = {
	considerCltArticle58: z.boolean().optional(),
	absenceToleranceInMinutes: z.string().optional(),
	punchingToleranceInMinutes: z.string().optional(),
	dailyMinimumExtraHoursInMinutes: z.string().optional(),
	dailyMinimumAbsentInMinutes: z.string().optional(),
	exceedMinimumDailyOvertimeLimit: z.string().optional(),
	exceedMinimumDailyAbsenceLimit: z.string().optional(),
};
