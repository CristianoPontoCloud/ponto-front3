import { z } from "zod";
import { addressValidation } from "../shared/address";

const registrationData = {
	name: z.string().min(3),
	fantasyName: z.string().min(3),
	cnpj: z.string().min(11),
	ie: z.string().nullable().optional(),
	ceicno: z.string().nullable().optional(),
	caepf: z.string().nullable().optional(),
	sheetCode: z.string().nullable().optional(),
	startDay: z.string(),
	responsibleName: z.string().min(3),
	responsibleSurname: z.string().min(3),
	responsibleEmail: z.string().email().min(3),
	responsibleCpf: z.string().min(3),
};

export const delimitationValidation = {
	delimitationName: z.string().min(3),
	active: z.boolean(),
	radiusInMeters: z.string().min(1).refine((val) => Number(val) > 0, {
		message: "O valor deve ser maior que 0",
	}),
	latitude: z.string().min(3),
	longitude: z.string().min(3),
	complement: z.string().optional()
};

export const delimitationSchema = z.object({
	...delimitationValidation,
});
export const addressSchema = z.object({
	...addressValidation,
	...delimitationValidation,
});

export const companiesSchema = z.object({
	...registrationData,
	...addressValidation,
	id: z.string().optional(),
	status: z.string().min(1),
});
