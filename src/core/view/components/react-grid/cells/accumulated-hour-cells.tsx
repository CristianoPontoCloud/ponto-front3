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
import { MoveRight } from "lucide-react";
import type { ReactNode } from "react";

export interface AccumulatedHourCell extends Cell {
	type: "accumulatedHour";
	text: string;
	toTime: string;
	maxhour: number;
	defaultValue?: string;
	renderer?: () => ReactNode;
}

export class AccumulatedHourCellTemplate implements CellTemplate<AccumulatedHourCell> {
	private firstDigit: string | null = null;
	getCompatibleCell(
		uncertainCell: Uncertain<AccumulatedHourCell>,
	): Compatible<AccumulatedHourCell> {
		const text = getCellProperty(uncertainCell, "text", "string");
		const toTime = getCellProperty(uncertainCell, "toTime", "string");
		const maxhour = getCellProperty(uncertainCell, "maxhour", "number");
		const value = Number.parseFloat(text);
		return { ...uncertainCell, text, value, maxhour, toTime };
	}

	handleKeyDown(
		cell: Compatible<AccumulatedHourCell>,
		keyCode: number,
		ctrl: boolean,
		alt: boolean,
	): { cell: Compatible<AccumulatedHourCell>; enableEditMode: boolean } {
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
		cell: Compatible<AccumulatedHourCell>,
		cellToMerge: UncertainCompatible<AccumulatedHourCell>,
	): Compatible<AccumulatedHourCell> {
		return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
	}

	formatHour(value: string) {
		value = value.replace(/\D/g, "");

		const minutes = Number.parseInt(value.slice(2, 4), 10);

		if (minutes > 59) {
			value.concat(value.slice(0, 2), "59");
		}

		value.concat(value.slice(0, 2), ":", value.slice(2, 4));

		return value;
	}

	autoCompleteUseCase(
		input: HTMLInputElement,
		cell: Compatible<AccumulatedHourCell>,
		onCellChanged: (cell: Compatible<AccumulatedHourCell>, commit: boolean) => void,
	) {
		let value = input.value.replace(/\D/g, "");

		if (value.length === 0 && cell.defaultValue) {
			value = cell.defaultValue;
		}

		if (value.length <= 2) {
			value = `${value.padStart(2, "0")}:00`;
		} else {
			const hour = value.slice(0, -2);
			const minute = Math.min(Number(value.slice(-2)), 59);
			value = `${hour}:${minute.toString().padStart(2, "0")}`;
		}

		input.value = value;
		onCellChanged(this.getCompatibleCell({ ...cell, text: value }), true);
	}
	onMouseLeave(
		input: HTMLInputElement,
		cell: Compatible<AccumulatedHourCell>,
		onCellChanged: (cell: Compatible<AccumulatedHourCell>, commit: boolean) => void,
	) {
		if (input.value.length === 0 && cell.defaultValue) {
			input.value = cell.defaultValue;
			onCellChanged(this.getCompatibleCell({ ...cell, text: input.value }), true);
		}
	}

	onBlur(
		input: HTMLInputElement,
		cell: Compatible<AccumulatedHourCell>,
		onCellChanged: (cell: Compatible<AccumulatedHourCell>, commit: boolean) => void,
	) {
		setTimeout(() => {
			if (input.value.length === 0 && cell.defaultValue) {
				input.value = cell.defaultValue;
				onCellChanged(this.getCompatibleCell({ ...cell, text: input.value }), true);
			}
		}, 0);
	}

	render(
		cell: Compatible<AccumulatedHourCell>,
		isInEditMode: boolean,
		onCellChanged: (cell: Compatible<AccumulatedHourCell>, commit: boolean) => void,
	): React.ReactNode {
		const handleEnterKey = (e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				e.preventDefault();
				const input = e.target as HTMLInputElement;
				this.autoCompleteUseCase(input, cell, (updatedCell) => {
					onCellChanged(updatedCell, true);
				});
			}
		};

		if (!isInEditMode && cell.renderer) {
			return cell.renderer();
		}

		if (!isInEditMode && !cell.renderer) {
			return <div className="rg-text-cell">{cell.text}</div>;
		}

		return (
			<div className="relative w-full ">
				<input
					className="rg-input w-full h-full"
					ref={(input) => {
						if (input) {
							input.focus();
							if (this.firstDigit !== null) {
								input.value = this.firstDigit;
								this.firstDigit = null;
							}
						}
					}}
					defaultValue={cell.text}
					onChange={(e) => {
						const input = e.target as HTMLInputElement;
						input.value = this.formatHour(input.value);
						onCellChanged(this.getCompatibleCell({ ...cell, text: input.value }), false);
					}}
					onCopy={(e) => e.stopPropagation()} // Chama a função de copiar
					onCut={(e) => e.stopPropagation()}
					onPaste={(e) => e.stopPropagation()} // Chama a função de colar
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
				<div className="absolute w-1/2 top-0 right-0 h-full flex items-center justify-between text-muted-foreground">
					<MoveRight />
					<span>{cell.toTime}</span>
				</div>
			</div>
		);
	}
}
