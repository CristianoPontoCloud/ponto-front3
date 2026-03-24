import type {
	CollaboratorWorkShift,
	CollaboratorWorkShiftCreateParams,
} from "@/domain/entities/collaborator/collaborator-work-shift";
import type { CreateDto } from "@/domain/http/http-client";
import type { CollaboratorWorkShiftEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-work-shift";
import { format } from "date-fns";

export interface CollaboratorWorkShiftCreateUseCaseParams
	extends Omit<CollaboratorWorkShiftCreateParams, "startDate" | "endDate" | "cycleOffset"> {
	startDate: Date | null;
	endDate: Date | null;
	cycleOffset: string;
}

export interface CollaboratorWorkShiftCreatedUseCaseDto {
	execute(
		body: CreateDto<CollaboratorWorkShiftCreateUseCaseParams>,
	): Promise<CollaboratorWorkShift | null>;
}

export class CollaboratorWorkShiftCreatedUseCase implements CollaboratorWorkShiftCreatedUseCaseDto {
	constructor(private readonly endpoint: CollaboratorWorkShiftEndpoint) {}

	async execute(
		body: CreateDto<CollaboratorWorkShiftCreateUseCaseParams>,
	): Promise<CollaboratorWorkShift | null> {
		if (body.startDate === null || body.endDate === null) {
			return null;
		}
		const startDateParsed = format(body.startDate, "yyyy-MM-dd");
		const endDateParsed = body.endDate ? format(body.endDate, "yyyy-MM-dd") : "";
		const res = await this.endpoint.create({
			...body,
			startDate: startDateParsed,
			endDate: endDateParsed,
			cycleOffset: Number(body.cycleOffset),
		});
		return res?.data ?? null;
	}
}
