export type CollaboratorWorkJourneyAction = "ADD" | "REMOVE"
export type CollaboratorWorkJourneyItem = "WORK_SHIFT" | "EXTRA_TIME" | "HOUR_BANK" | "ON_NOTICE"
export interface CollaboratorWorkJourneyParams {
	collaboratorId: string
	workJourneyId: string,
	workJourneyItem: CollaboratorWorkJourneyItem,
	workJourneyAction: CollaboratorWorkJourneyAction
}
