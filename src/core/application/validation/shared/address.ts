import { z } from "zod";

export const addressValidation = {
	zip: z.string().min(9),
	neighborhood: z.string().min(3),
	street: z.string().min(3),
	number: z.string().optional(),
	city: z.string().min(3),
	state: z.string().min(1),
	complement: z.string().optional(),
};
