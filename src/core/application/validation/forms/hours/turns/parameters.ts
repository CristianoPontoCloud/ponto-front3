import { z } from "zod";

export const hourParametersFieldValidations = {
	compensationMode: z.string().optional(),
	deductAbsencesFromOvertime: z.string().optional(),
	interspersedOvertimeCalculation: z.string().optional(),
	minimumInterspersedInterval: z.string().optional(),
	freeLunch: z.string().optional(),
	extraForIntervalLessThanOneHour: z.string().optional(),
	operationModeOnDayWithoutShift: z.string().optional(),
	interspersedOvertimePercentage: z.string().optional(),
	controlNr17Break: z.string().optional(),
	periodToConsiderFreeLunch: z.string().optional(),
};
