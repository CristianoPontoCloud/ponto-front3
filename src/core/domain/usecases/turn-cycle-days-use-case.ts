import { TurnTypeEnum } from "@/domain/entities/turns/turns";

export function turnCycleDaysUseCase(turnType: string, cycleLengthDaysValue: string) {
	const { jorney,
		jorney12x36,
		scale24x72,
		scale24x48,
		weekly } = TurnTypeEnum
	if (turnType === jorney) {
		return "1";
	}
	if (turnType === jorney12x36) {
		return "2";
	}
	if (turnType === scale24x72) {
		return "4";
	}
	if (turnType === scale24x48) {
		return "3";
	}
	if (turnType === weekly) {
		return "7";
	}
	return cycleLengthDaysValue
}
