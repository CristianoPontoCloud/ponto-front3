import type {
	MarkDetailsFields,
	MarkUserColumnsRenderPreference,
} from "@/domain/entities/marks/marks";
import { cellBorderRemover } from "@/view/components/grids/cell-border-remover";
import type { Column, DefaultCellTypes } from "@silevis/reactgrid";

interface MarkRenderHeaderControllerParams {
	columnsToRender: MarkUserColumnsRenderPreference;
	// styleLastColumns?: CellStyle;
	hasDesconsiderMark: boolean;
}

const HOUR_FIELD_WIDTH: Record<keyof MarkDetailsFields, number> = {
	hrDaytime: 125,
	hrTotalDaytime: 107,
	hrTotalWorked: 126,
	hrExpectedHours: 121,
	hrNight: 135,
	hrTotalNight: 106,
	hrEarlyOut: 132,
	hrEarlyEntry: 147,
	hrMissings: 89,
	hrDelay: 102,
	hrDelayInterval: 122,
	hrDelayEntry: 116,
	hrDaytimeDelayInterval: 148,
	hrNightDelayTotal: 158,
	hrDelayTotal: 136,
	hrAllowance: 60,
	hrInterval: 75,
	hrEntry50PercentDaytime: 131,
	hrEntry50PercentNight: 141,
	hrEntry60PercentDaytime: 134,
	hrEntry60PercentNight: 140,
	hrEntry100PercentDaytime: 137,
	hrEntry100PercentNight: 147,
	hrTotalExtraDaytime: 134,
	hrTotalExtraNight: 143,
	hrTotalExtra: 95,
	hrExtraInterval: 113,
	hrEntryAdvance: 147,
	hrDsrConsider: 120,
	hrDsrDebited: 108,
	hrBankCredDebt: 144,
	hrBankMonth: 90,
	hrBankBalance: 98,
	desconsiderMarks: 650,
};

export const MARK_HOUR_FIELD_LABELS: MarkDetailsFields = {
	hrDaytime: "Diurnas normais",
	hrTotalDaytime: "Total normais",
	hrTotalWorked: "Total trabalhado",
	hrExpectedHours: "Horas previstas",
	hrNight: "Noturnas normais",
	hrTotalNight: "Total noturno",
	hrEarlyOut: "Saída antecipada",
	hrEarlyEntry: "Entrada antecipada",
	hrMissings: "Horas falta",
	hrDelay: "Horas atraso",
	hrDelayInterval: "Atraso intervalo",
	hrDelayEntry: "Atraso entrada",
	hrDaytimeDelayInterval: "Horas atraso diurna",
	hrNightDelayTotal: "Horas atraso noturna",
	hrDelayTotal: "Horas atraso total",
	hrAllowance: "Abono",
	hrInterval: "Intervalo",
	hrEntry50PercentDaytime: "Entra 50% diurna",
	hrEntry50PercentNight: "Entra 50% noturna",
	hrEntry60PercentDaytime: "Extra 60% diurna",
	hrEntry60PercentNight: "Extra 60% noturna",
	hrEntry100PercentDaytime: "Extra 100% diurna",
	hrEntry100PercentNight: "Extra 100% noturna",
	hrTotalExtraDaytime: "Total extra diurna",
	hrTotalExtraNight: "Total extra noturna",
	hrTotalExtra: "Total extras",
	hrExtraInterval: "Total intervalo",
	hrEntryAdvance: "Entrada antecipada",
	hrDsrConsider: "DSR considerar",
	hrDsrDebited: "DSR debitada",
	hrBankCredDebt: "Banco Cred/Debito",
	hrBankMonth: "Banco mês",
	hrBankBalance: "Banco saldo",
	desconsiderMarks: "Exclusões",
};

const markDetailsRenderHeaderController = ({
	columnsToRender,
	hasDesconsiderMark,
}: MarkRenderHeaderControllerParams): DefaultCellTypes[] => {
	const arrCol = Object.keys(columnsToRender).filter(
		(key) => !!columnsToRender[key as keyof MarkDetailsFields],
	);

	return [
		...arrCol.map((key: string, index): DefaultCellTypes => {
			return {
				type: "header",
				text: MARK_HOUR_FIELD_LABELS[key as keyof MarkDetailsFields] ?? "",
				style:
					arrCol.length === index + 1 && !hasDesconsiderMark
						? cellBorderRemover({ right: true })
						: {},
			};
		}),
	];
};

function markDetailsRenderColumnsController(
	columnsToRender: MarkUserColumnsRenderPreference,
): Column[] {
	return Object.keys(columnsToRender)
		.filter((key) => !!columnsToRender[key as keyof MarkDetailsFields])
		.map((key: string): Column => {
			return { columnId: key, width: HOUR_FIELD_WIDTH[key as keyof MarkDetailsFields] };
		});
}

export const markDetailsRenderController = {
	headers: markDetailsRenderHeaderController,
	columnIds: markDetailsRenderColumnsController,
	maps: {
		columnWidths: HOUR_FIELD_WIDTH,
		columnLabels: MARK_HOUR_FIELD_LABELS,
	},
};
