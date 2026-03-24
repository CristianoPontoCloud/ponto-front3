import type { ExtraHourAccumulatedEnum } from "@/domain/entities/extra-hour/enums/extra-hour-accumulated-enum";
import type { ExtraHourBand } from "@/domain/entities/extra-hour/extra-hour-band";
import type { ExtraHourRules } from "@/domain/entities/extra-hour/extra-hour-rules";
import { parseHoursToMinutes } from "@/domain/global-helpers/time-tools";
import { getAccumulatedMaxHourUseCase } from "@/domain/usecases/accumulated-use-case";
import type { AccumulatedHourCell } from "@/view/components/react-grid/cells/accumulated-hour-cells";
import type { PercentCell } from "@/view/components/react-grid/cells/percent-cells";
import type { CellChange, DefaultCellTypes } from "@silevis/reactgrid";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

export class extraHourRangeManagerGridController {
	constructor(
		private form: UseFormReturn<ExtraHourRules>,
		public setRules: Dispatch<SetStateAction<ExtraHourBand[]>>,
	) { }

	onCellsChanged(changes: CellChange<DefaultCellTypes | AccumulatedHourCell | PercentCell>[]) {
		const newRules = [...this.form.getValues("bands")];
		for (const { newCell, rowId, type } of changes) {
			const index = Number(rowId);
			if (!newRules[index]) return;

			if (type === "accumulatedHour") {
				this.onAccumulatedCellsChangeUseCase(newCell, newRules, index);
			}
			if (type === "percent") {
				newRules[index].percentageMultiplier = newCell.text;
			}
			if (type === "text") {
				newRules[index].eventCode = newCell.text;
			}
		}
		this.form.setValue("bands", newRules);
		this.setRules(newRules);
	}
	onAccumulatedCellsChangeUseCase(
		newCell: AccumulatedHourCell,
		newRules: ExtraHourBand[],
		index: number,
	) {
		const currentItem = newRules[index];
		if (index === 0) {
			currentItem.fromTime = newCell.text;
			return;
		}
		const currentMinutes = parseHoursToMinutes(newCell.text);
		const minimumValueForCurrentMinutes = parseHoursToMinutes(newRules[index - 1].toTime);
		if (currentMinutes < minimumValueForCurrentMinutes) {
			currentItem.fromTime = newRules[index - 1].toTime;
			return;
		}
		newRules[index - 1].toTime = newCell.text;
		currentItem.fromTime = newCell.text;
	}
	getMaxHour() {
		const accumulated = this.form.getValues("accumulated") as ExtraHourAccumulatedEnum;
		return getAccumulatedMaxHourUseCase(accumulated);
	}
	deleteRule(index: number) {
		const newRules = this.form.getValues("bands").filter((_, i) => i !== index);
		if (newRules.length === index) {
			const accumulated = this.form.getValues("accumulated") as ExtraHourAccumulatedEnum;
			newRules[newRules.length - 1].toTime = getAccumulatedMaxHourUseCase(accumulated).label;
		}
		this.form.setValue("bands", newRules);
	}
	handleBankHour(index: number) {
		const newRules = [...this.form.getValues("bands")];
		newRules[index].isHourBank = !newRules[index].isHourBank;
		this.form.setValue("bands", newRules);
		this.setRules(newRules);
	}
	onAccumulationChanged() {
		const bands = this.form.getValues("bands");
		const accumulated = this.form.getValues("accumulated") as ExtraHourAccumulatedEnum;
		const lastLabel = getAccumulatedMaxHourUseCase(accumulated).label;
		const lastRule = bands?.[bands?.length - 1];
		if (lastRule && lastRule.toTime === lastLabel) {
			return;
		}

		const newRules = bands?.map((rule, index) => {
			if (index === bands?.length - 1) {
				return { ...rule, toTime: lastLabel };
			}
			return rule;
		});

		this.form.setValue("bands", newRules);
	}
}
