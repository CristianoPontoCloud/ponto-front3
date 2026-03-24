import { extraHourSchema } from "@/application/validation/forms/hours/extra-hour";
import type { ExtraHourAccumulatedEnum } from "@/domain/entities/extra-hour/enums/extra-hour-accumulated-enum";
import type { ExtraHourRules } from "@/domain/entities/extra-hour/extra-hour-rules";
import { parseHoursToMinutes, parseMinutesToHour } from "@/domain/global-helpers/time-tools";
import { getAccumulatedMaxHourUseCase } from "@/domain/usecases/accumulated-use-case";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { extraHourRulesGridController } from "../rules-grid/extra-hour-grid-controller";

export function useRulesManager(controller: extraHourRulesGridController) {
	const rulesManagerForm = useForm<ExtraHourRules>({
		values: controller.rulesFormValues,
		resolver: zodResolver(extraHourSchema),
		mode: "onSubmit",
	});
	const accumulated = rulesManagerForm.watch("accumulated") as ExtraHourAccumulatedEnum;
	function areTotalHoursAtMaximum(): boolean {
		const bands = rulesManagerForm.watch("bands");
		const totalMinutes = bands?.reduce((_, rule, index, arr) => {
			if (index === arr.length - 1) return parseHoursToMinutes(rule.fromTime);
			return parseHoursToMinutes(rule.toTime) - parseHoursToMinutes(rule.fromTime);
		}, 0);

		if (totalMinutes >= getAccumulatedMaxHourUseCase(accumulated).minutes) return true;
		return false;
	}

	function createNewRule() {
		const bands = rulesManagerForm.watch("bands");
		if (areTotalHoursAtMaximum()) {
			return;
		}
		const newRules = [...bands ?? []];
		const ruleLegth = newRules.length;
		const lastRuleIndex = ruleLegth - 1;
		const lastRule = newRules[lastRuleIndex];
		if (ruleLegth === 1) {
			lastRule.toTime = "00:01";
		}
		if (ruleLegth >= 2 && lastRule.fromTime === "") {
			lastRule.fromTime = newRules[lastRuleIndex - 1].toTime;
			lastRule.toTime = parseMinutesToHour(
				parseHoursToMinutes(newRules[lastRuleIndex - 1].toTime) + 1,
			);
		}
		if (ruleLegth >= 2 && lastRule.fromTime !== "") {
			lastRule.toTime = parseMinutesToHour(
				parseHoursToMinutes(newRules[lastRuleIndex - 1].toTime) + 1,
			);
		}
		newRules.push({
			id: "",
			isHourBank: false,
			eventCode: "",
			fromTime: "",
			toTime: getAccumulatedMaxHourUseCase(accumulated).label,
			percentageMultiplier: "50%",
		});
		rulesManagerForm.setValue("bands", newRules);
	}

	function submitRules() {
		controller.submitRule(rulesManagerForm);
		controller.setOpenOverSheet(false);
		rulesManagerForm.reset();
	}

	return { rulesManagerForm, createNewRule, submitRules };
}
