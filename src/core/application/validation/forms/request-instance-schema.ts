import { z } from "zod";

export const requestInstanceSchema = z.object({
	id: z.string(),
	requestId: z.string().uuid(),
	startDate: z.date().nullable(),
	startTime: z.string().optional(),
	endDate: z.date().nullable(),
	endTime: z.string().optional(),
	type: z.string(),
	justification: z.string().min(10).max(200),
});

export const requestInstanceOnRejectSchema = z.object({
	id: z.string(),
	collaborator: z.object({
		id: z.string(),
		name: z.string(),
		position: z.string(),
	}),
	requestId: z.string().optional(),
	startDate: z.date(),
	startTime: z.string(),
	endDate: z.date(),
	endTime: z.string(),
	name: z.string(),
	status: z.string(),
	type: z.string(),
	actualDelimitation: z
		.object({
			lat: z.string(),
			lng: z.string(),
		})
		.optional(),
	expectedDelimitation: z
		.object({
			lat: z.string(),
			lng: z.string(),
		})
		.optional(),
	justify: z.string().min(10).max(200),
	collaboratorObservation: z.string(),
});
