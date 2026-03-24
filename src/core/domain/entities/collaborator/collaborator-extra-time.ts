export interface CollaboratorExtraTime {
	id: string
	collaborator: {
		id: string
	},
	extraTime: {
		id: string
	},
	obs: string
	startDate: string
	endDate: string
	cycleOffset: number,
	createdAt: string
}
export type CollaboratorExtraTimeUpdateParams = Pick<CollaboratorExtraTime, 'obs'| 'id'>
export interface CollaboratorExtraTimeCreateParams {
	collaboratorId: string
	extraTimeId: string
	obs: string
}
export interface CollaboratorExtraTimeFindAllParams {
	collaboratorId?: string
	extraTimeId?: string
	page?: string
	limit?: string
}
