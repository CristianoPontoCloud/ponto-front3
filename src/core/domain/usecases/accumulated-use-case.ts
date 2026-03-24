import { ExtraHourAccumulatedEnum } from "../entities/extra-hour/enums/extra-hour-accumulated-enum";

const { DAILY, MONTHLY, WEEKLY } = ExtraHourAccumulatedEnum;

export const accumulatedMaxHourMap = {
	[DAILY]: {
		label: "23:59",
		num: 23,
		minutes: 1439,
	},
	[WEEKLY]: {
		label: "167:59",
		num: 167,
		minutes: 10079,
	},
	[MONTHLY]: {
		label: "743:59",
		num: 743,
		minutes: 44639,
	},
};

export function getAccumulatedMaxHourUseCase(accumulated: ExtraHourAccumulatedEnum) {
	return accumulatedMaxHourMap[accumulated];
}
