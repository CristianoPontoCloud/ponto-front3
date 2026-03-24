import { arrayHelper } from "@/application/helpers/array-helpers";
import type { ExtraHourFormProps } from "@/domain/entities/extra-hour/extra-hour";
import type { ExtraHourRules } from "@/domain/entities/extra-hour/extra-hour-rules";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

export class extraHourRulesGridController {
	constructor(
		private form: UseFormReturn<ExtraHourFormProps>,
		public openOverSheet: boolean,
		public setOpenOverSheet: Dispatch<SetStateAction<boolean>>,
		public isEditRule: boolean,
		private setIsEditRule: Dispatch<SetStateAction<boolean>>,
		public rulesFormValues: ExtraHourRules,
		private setRulesFormValues: Dispatch<SetStateAction<ExtraHourRules>>,
		private bracketIndex: number,
		private setRuleIndex: Dispatch<SetStateAction<number>>,
	) { }
	handleRule(bracket: ExtraHourRules) {
		const newRules = [...this.form.watch("rules")];
		newRules.push(bracket);
		this.form.setValue("rules", newRules);
	}
	handleMoveRuleUp(index: number) {
		const rules = [...this.form.watch("rules")]; // Captura o estado atualizado
		// if (index === 0 || index >= rules.length) return; // Impede a troca na primeira posição

		// // Swap entre o item atual e o anterior
		// [rules[index - 1], rules[index]] = [rules[index], rules[index - 1]];

		arrayHelper.swapWithPrevious({ arr: rules, index });
		this.form.setValue("rules", rules);
	}
	handleMoveRuleDown(index: number) {
		const rules = [...this.form.watch("rules")]; // Captura o estado atualizado
		arrayHelper.swapWithNext({ arr: rules, index });
		this.form.setValue("rules", rules);
	}
	editRule(index: number) {
		this.setIsEditRule(true);
		this.setRulesFormValues(this.form.watch("rules")[index]);
		this.setOpenOverSheet(true);
		this.setRuleIndex(index);
	}
	openNewRulesGrid() {
		this.setIsEditRule(false);
		this.setOpenOverSheet(true);
	}

	submitRule(rulesManagerform: UseFormReturn<ExtraHourRules>) {
		if (this.bracketIndex !== -1) {
			this.submitEditedRule(rulesManagerform);
			return;
		}
		this.addNewRule(rulesManagerform);
	}

	addNewRule(rulesManagerform: UseFormReturn<ExtraHourRules>) {
		const rulesToUpdate = [...this.form.getValues("rules")];
		const newRule = {
			...rulesManagerform.getValues(),
			ruleIndex: rulesToUpdate.length,
		};
		rulesToUpdate.push(newRule);
		this.form.setValue("rules", rulesToUpdate);
	}

	submitEditedRule(rulesManagerform: UseFormReturn<ExtraHourRules>) {
		const rulesToUpdate = this.form.getValues("rules").filter((_, i) => i !== this.bracketIndex);
		rulesToUpdate.push(rulesManagerform.getValues());
		this.form.setValue("rules", rulesToUpdate);
	}

	deleteRule(index: number) {
		const rulesUpdated = this.form.getValues("rules").filter((_, i) => i !== index);
		this.form.setValue("rules", rulesUpdated);
	}
}
