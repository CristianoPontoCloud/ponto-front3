export interface CollaboratorWorkShift {
	id: string;
	collaborator: {
		id: string;
	};
	workShift: {
		id: string;
	};
	obs: string;
	startDate: string;
	endDate: string;
	cycleOffset: number;
	createdAt: string;
}
export type CollaboratorWorkShiftUpdateParams = Omit<
	CollaboratorWorkShift,
	"collaborator" | "workShift" | "createdAt"
>;
export interface CollaboratorWorkShiftCreateParams {
	collaboratorId: string;
	workShiftId: string;
	obs: string;
	startDate: string;
	endDate: string;
	cycleOffset: number;
	isTemporary: boolean;
}
export interface CollaboratorWorkShiftFindAllParams {
	collaboratorId?: string;
	workShiftId?: string;
	startDate?: string;
	endDate?: string;
	page?: string;
	limit?: string;
}
