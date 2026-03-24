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

export interface HourCell extends Cell {
	type: "hour";
	text: string;
	defaultValue?: string;
}

export class HourCellTemplate implements CellTemplate<HourCell> {
	private firstDigit: string | null = null;
	private formatFinalHourOnUpdate(value: string): string {
		let numeric = value.replace(/\D/g, "");
		if (numeric.length === 0) return "";

		if (numeric.length === 1) {
			numeric = `0${numeric}:00`;
		} else if (numeric.length === 2) {
			const hour = Math.min(Number(numeric), 23);
			numeric = `${hour.toString().padStart(2, "0")}:00`;
		} else if (numeric.length === 3) {
			const hour = Math.min(Number(numeric[0]), 23);
			const minute = Math.min(Number(numeric.slice(1)), 59);
			numeric = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
		} else {
			const hour = Math.min(Number(numeric.slice(0, 2)), 23);
			const minute = Math.min(Number(numeric.slice(2, 4)), 59);
			numeric = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
		}

		return numeric;
	}
	getCompatibleCell(uncertainCell: Uncertain<HourCell>): Compatible<HourCell> {
		const text = getCellProperty(uncertainCell, "text", "string");
		const value = Number.parseFloat(text);
		return { ...uncertainCell, text, value };
	}
	handleKeyDown(
		cell: Compatible<HourCell>,
		keyCode: number,
		ctrl: boolean,
		alt: boolean,
	): { cell: Compatible<HourCell>; enableEditMode: boolean } {
		if (!ctrl && !alt && isAlphaNumericKey(keyCode)) {
			if (this.firstDigit === null) {
				this.firstDigit = String.fromCharCode(keyCode).replace(/\D/g, "");
			}
			return { cell, enableEditMode: true };
		}
		if (keyCode === keyCodes.ENTER) {
			return { cell, enableEditMode: false };
		}
		return {
			cell,
			enableEditMode: keyCode === keyCodes.POINTER,
		};
	}
	update(
		cell: Compatible<HourCell>,
		cellToMerge: UncertainCompatible<HourCell>,
	): Compatible<HourCell> {
		const formattedText = this.formatFinalHourOnUpdate(cellToMerge.text || "");
		return this.getCompatibleCell({ ...cell, text: formattedText });
	}
	formatHour(value: string) {
		value = value.replace(/\D/g, "");
		if (value.length > 4) {
			value = value.slice(0, 4);
		}
		if (value.length > 2) {
			const hours = Number.parseInt(value.slice(0, 2), 10);
			const minutes = Number.parseInt(value.slice(2, 4), 10);
			if (hours > 23) {
				value.concat("23", value.slice(2, 4));
			}
			if (minutes > 59) {
				value.concat(value.slice(0, 2), "59");
			}
			value.concat(value.slice(0, 2), ":", value.slice(2, 4));
		}
		return value;
	}
	autoCompleteUseCase(
		input: HTMLInputElement,
		cell: Compatible<HourCell>,
		onCellChanged: (cell: Compatible<HourCell>, commit: boolean) => void,
	) {
		let value = input.value.replace(/\D/g, "");
		if (value.length === 0 && cell.defaultValue) {
			value = cell.defaultValue;
		}
		if (value.length === 1) {
			value = `0${value}:00`;
		} else if (value.length === 2) {
			const hour = Math.min(Number(value), 23);
			value = `${hour.toString().padStart(2, "0")}:00`;
		} else if (value.length === 3) {
			const hour = Math.min(Number(value[0]), 23);
			const minute = Math.min(Number(value.slice(1)), 59);
			value = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
		} else if (value.length >= 4) {
			const hour = Math.min(Number(value.slice(0, 2)), 23);
			const minute = Math.min(Number(value.slice(2, 4)), 59);
			value = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
		}
		input.value = value;
		onCellChanged(this.getCompatibleCell({ ...cell, text: value }), true);
	}
	onBlur(
		input: HTMLInputElement,
		cell: Compatible<HourCell>,
		onCellChanged: (cell: Compatible<HourCell>, commit: boolean) => void,
	) {
		if (input.value.length === 0 && cell.defaultValue) {
			input.value = cell.defaultValue;
			this.autoCompleteUseCase(input, cell, (updatedCell) => {
				onCellChanged(updatedCell, true);
			});
			// onCellChanged(this.getCompatibleCell({ ...cell, text: input.value }), true);
		}
	}
	render(
		cell: Compatible<HourCell>,
		isInEditMode: boolean,
		onCellChanged: (cell: Compatible<HourCell>, commit: boolean) => void,
	): React.ReactNode {
		const handleEnterKey = (e: React.KeyboardEvent) => {
			if (e.key === "Enter" || e.key === "Tab") {
				e.preventDefault();
				const input = e.target as HTMLInputElement;
				this.autoCompleteUseCase(input, cell, (updatedCell) => {
					onCellChanged(updatedCell, true);
				});
			}
		};
		if (!isInEditMode) {
			return <div className="rg-text-cell ml-2">{cell.text}</div>;
		}
		return (
			<input
				className="rg-input"
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
				onPointerDown={(e) => {
					const input = e.target as HTMLInputElement;
					input.value = this.formatHour(input.value);
					onCellChanged(this.getCompatibleCell({ ...cell, text: input.value }), false);
				}}
				onKeyDown={(e) => {
					if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode)) e.stopPropagation();
					handleEnterKey(e);
				}}
				onKeyUp={(e) => {
					if (e.code === "Enter") {
						handleEnterKey(e);
					}
				}}
				onBlur={(e) => {
					const input = e.target as HTMLInputElement;
					input.value = this.formatHour(input.value);
					this.autoCompleteUseCase(input, cell, (updatedCell) => {
						onCellChanged(updatedCell, true);
					});
				}}
			/>
		);
	}
}
