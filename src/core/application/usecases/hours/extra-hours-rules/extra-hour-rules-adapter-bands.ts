import type {
	ExtraHourBand,
	ExtraHourBandNumberPercentage,
} from "@/domain/entities/extra-hour/extra-hour-band";

export class ExtraHourAdapterBands {
	public adaptPercentageToNumber(band: ExtraHourBand[]): ExtraHourBandNumberPercentage[] {
		return band?.map((band) => ({
			...band,
			percentageMultiplier: this.stringPercentageToNumberMultiplier(band?.percentageMultiplier),
		}));
	}
	public adaptPercentageToString(band?: ExtraHourBandNumberPercentage[]): ExtraHourBand[] {
		if (!band) return [];
		return band?.map((band) => ({
			...band,
			percentageMultiplier: this.numberMultiplierPercentageToString(band?.percentageMultiplier),
		}));
	}
	private stringPercentageToNumberMultiplier(strPercentage: string) {
		const number = Number(strPercentage.replace("%", ""));
		return 1 + number / 100;
	}
	private numberMultiplierPercentageToString(multipierNumber: number) {
		const percent = (multipierNumber - 1) * 100;
		return `${percent}%`;
	}
}
