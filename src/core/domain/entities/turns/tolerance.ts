export interface ToleranceFormProps {
	considerClt58Art: boolean;
	absenceToleranceInMinutes: string;
	punchingToleranceInMinutes: string;
	dailyMinimumExtraHoursInMinutes: string;
	dailyMinimumAbsentInMinutes: string;
	actionUponSurpassingExtraTimeLimitCode: string;
	actionUponSurpassingAbsenceLimitCode: string;
}
