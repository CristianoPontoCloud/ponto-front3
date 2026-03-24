import { format } from "date-fns";
const { ptBR } = require("date-fns/locale/pt-BR");

import type { ValueLabel } from "../value-label";

export function parseHoursToMinutes(timeInHour: string): number {
	if (timeInHour === "") return 0;
	const [hours, minutes] = timeInHour
		.split(":")
		.flatMap((value) => Number(value));
	return hours * 60 + minutes;
}
export function parseMinutesToHour(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}`;
}

export const monthsList: ValueLabel[] = [
	{ value: '01', label: 'Jan' },
	{ value: '02', label: 'Fev' },
	{ value: '03', label: 'Mar' },
	{ value: '04', label: 'Abr' },
	{ value: '05', label: 'Mai' },
	{ value: '06', label: 'Jun' },
	{ value: '07', label: 'Jul' },
	{ value: '08', label: 'Ago' },
	{ value: '09', label: 'Set' },
	{ value: '10', label: 'Out' },
	{ value: '11', label: 'Nov' },
	{ value: '12', label: 'Dez' }
];

export function getValueLabelMonth(month: string) {
	return monthsList.find(({ value }) => value === month) ?? monthsList[0]
}

export const yearAndMonthRegex = /^\d{4}-\d{2}$/
export const yearRegex = /^\d{4}$/

export function getLabelMonthAndYear(date: string) {
	if (!yearAndMonthRegex.test(date)) return format(new Date(), "MM/yyyy", { locale: ptBR });
	const month = getValueLabelMonth(date.split('-')[1])
	const year = date.split('-')[0]
	return `${month.label}/${year}`
}


export function dateToTimeStamp(date: Date | null): string {
	if (!date) return ""
	return date.toISOString().split("T")[0]
}

export function parseTimestampToLocaleDate(date: string) {
	const regex = /T/;
	if (regex.test(date)) return new Date(date)
	return new Date(`${date}T00:00:00`)
}
