import { TurnTypeEnum } from "@/domain/entities/turns/turns";

export function turnCycleDaysUseCase(turnType: string) {
	if (turnType === TurnTypeEnum.jorney) {
		return "1";
	}
	if (turnType === TurnTypeEnum.jorney12x36) {
		return "2";
	}
	if (turnType === TurnTypeEnum.scale24x72) {
		return "4";
	}
	if (turnType === TurnTypeEnum.scale24x48) {
		return "3";
	}
	return "7";
}
