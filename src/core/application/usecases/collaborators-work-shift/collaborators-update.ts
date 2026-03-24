import type {
	CollaboratorWorkShift,
	CollaboratorWorkShiftUpdateParams,
} from "@/domain/entities/collaborator/collaborator-work-shift";
import type { EditDto } from "@/domain/http/http-client";
import type { CollaboratorWorkShiftEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-work-shift";

export interface CollaboratorWorkShiftUpdateUseCaseParams
	extends Omit<CollaboratorWorkShiftUpdateParams, "startDate" | "endDate"> {
	startDate: Date | null;
	endDate: Date | null;
}

export interface CollaboratorWorkShiftUpdateUseCaseDto {
	execute(
		body: EditDto<CollaboratorWorkShiftUpdateUseCaseParams>,
	): Promise<CollaboratorWorkShift | null>;
}

export class CollaboratorWorkShiftUpdateUseCase implements CollaboratorWorkShiftUpdateUseCaseDto {
	constructor(private readonly endpoint: CollaboratorWorkShiftEndpoint) {}

	async execute(
		body: EditDto<CollaboratorWorkShiftUpdateUseCaseParams>,
	): Promise<CollaboratorWorkShift | null> {
		if (body.startDate === null || body.endDate === null) {
			return null;
		}
		const startDateParsed = body.startDate.toISOString().split("T")[0];
		const endDateParsed = body.endDate.toISOString().split("T")[0];
		const res = await this.endpoint.update({
			...body,
			startDate: startDateParsed,
			endDate: endDateParsed,
		});
		return res?.data ?? null;
	}
}
