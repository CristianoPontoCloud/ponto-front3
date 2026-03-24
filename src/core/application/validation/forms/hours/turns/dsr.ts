import { z } from "zod";

export const dsrFieldValidations = {
	dsrTimingCode: z.string().optional(),
	dsrHolidayDiscountingCode: z.string().optional(),
	dsrDiscountingCode: z.string().optional(),
	maximumDsrAbsences: z.string().optional(),
};
