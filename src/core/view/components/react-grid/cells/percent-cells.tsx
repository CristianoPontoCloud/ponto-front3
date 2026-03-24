import {
	type Cell,
	type CellTemplate,
	type Compatible,
	type Uncertain,
	type UncertainCompatible,
	getCellProperty,
	isAlphaNumericKey,
	isNavigationKey,
	keyCodes,
} from "@silevis/reactgrid";

export interface PercentCell extends Cell {
	type: "percent";
	text: string;
}

export class PercentCellTemplate implements CellTemplate<PercentCell> {
	getCompatibleCell(uncertainCell: Uncertain<PercentCell>): Compatible<PercentCell> {
		const text = getCellProperty(uncertainCell, "text", "string");
		const value = Number.parseFloat(text);
		return { ...uncertainCell, text, value };
	}

	handleKeyDown(
		cell: Compatible<PercentCell>,
		keyCode: number,
		ctrl: boolean,
		alt: boolean,
	): { cell: Compatible<PercentCell>; enableEditMode: boolean } {
		if (!ctrl && !alt && isAlphaNumericKey(keyCode)) {
			return { cell, enableEditMode: true };
		}

		if (keyCode === keyCodes.ENTER) {
			return { cell, enableEditMode: false }; // Sai do modo de edição
		}

		return {
			cell,
			enableEditMode: keyCode === keyCodes.POINTER,
		};
	}

	update(
		cell: Compatible<PercentCell>,
		cellToMerge: UncertainCompatible<PercentCell>,
	): Compatible<PercentCell> {
		return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
	}

	formatPercent(value: string) {
		value = value.replace(/\D/g, "");
		if (value.includes("%")) {
			value.replaceAll("%", "");
		}
		if (Number(value) > 100) {
			value = "100";
		}
		value = `${value}%`;
		return value;
	}

	autoCompleteUseCase(
		input: HTMLInputElement,
		cell: Compatible<PercentCell>,
		onCellChanged: (cell: Compatible<PercentCell>, commit: boolean) => void,
	) {
		input.value = this.formatPercent(input.value);

		onCellChanged(this.getCompatibleCell({ ...cell, text: input.value }), true);
	}
	deleteUseCase(
		input: HTMLInputElement,
		cell: Compatible<PercentCell>,
		onCellChanged: (cell: Compatible<PercentCell>, commit: boolean) => void,
	) {
		input.value = this.formatPercent(input.value);
		if (input.value.length < 1) return input.value;
		input.value = input.value.replace("%", "");
		input.value = input.value.slice(0, -1);
		input.value = `${input.value}%`;
		onCellChanged(this.getCompatibleCell({ ...cell, text: input.value }), false);
	}

	render(
		cell: Compatible<PercentCell>,
		isInEditMode: boolean,
		onCellChanged: (cell: Compatible<PercentCell>, commit: boolean) => void,
	): React.ReactNode {
		const handleEnterKey = (e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				e.preventDefault();
				const input = e.target as HTMLInputElement;
				this.autoCompleteUseCase(input, cell, onCellChanged);
			}
			if (e.key === "Backspace") {
				e.preventDefault();
				const input = e.target as HTMLInputElement;
				this.deleteUseCase(input, cell, onCellChanged);
			}
		};

		if (!isInEditMode) {
			return <div className="rg-text-cell">{cell.text}</div>;
		}

		return (
			<input
				className="rg-input w-full h-full"
				ref={(input) => {
					if (input) {
						input.focus();
					}
				}}
				defaultValue={cell.text}
				onChange={(e) => {
					const input = e.target as HTMLInputElement;
					input.value = this.formatPercent(input.value);

					onCellChanged(this.getCompatibleCell({ ...cell, text: input.value }), false);
				}}
				onCopy={(e) => e.stopPropagation()}
				onCut={(e) => e.stopPropagation()}
				onPaste={(e) => e.stopPropagation()}
				onPointerDown={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode)) e.stopPropagation();
					handleEnterKey(e);
				}}
				onKeyUp={(e) => {
					if (e.code === "Enter") {
						handleEnterKey(e);
					}
				}}
			/>
		);
	}
}
