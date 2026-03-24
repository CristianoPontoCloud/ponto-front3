export enum ExtraHourEventCodeEnum {
	NOTURNA_50 = "NOTURNA_50",
}

export interface ExtraHourBand {
	id: string;
	fromTime: string;
	toTime: string;
	percentageMultiplier: string;
	eventCode: string;
	isHourBank: boolean;
}

export interface ExtraHourBandNumberPercentage extends Omit<ExtraHourBand, "percentageMultiplier"> {
	percentageMultiplier: number;
}
