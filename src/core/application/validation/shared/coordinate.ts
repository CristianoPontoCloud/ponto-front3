import { z } from "zod";

export const coordinateValidation = {
	lat: z.string().min(2).optional(),
	lng: z.string().min(2).optional(),
};
