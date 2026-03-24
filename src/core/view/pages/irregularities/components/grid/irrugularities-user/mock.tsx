import type { IrregularitiesResponse } from "@/domain/entities/irregularities/grid/irregularities-company-grid-type";
import type { MarkViewTimetrackingData } from "@/domain/entities/marks/mark-view-timetracking-data";
import { MarkStatusEnum } from "@/domain/entities/marks/marks";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

function gerarTimestampAleatorio(start: Date, end: Date): string {
	const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	return format(randomDate, "yyyy-MM-dd");
}
const inicio = new Date(2000, 0, 1);
const fim = new Date();

const timestamp = () => gerarTimestampAleatorio(inicio, fim);
// function getRandomBoolean(): boolean {
// 	const choices = [true, false];
// 	const randomIndex = Math.floor(Math.random() * choices.length);
// 	return choices[randomIndex];
// }

function mockIrregularities(
	qtd: number,
	date: string,
	dayWeek: string,
): MarkViewTimetrackingData[] {
	const justify =
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gall";
	// const mockCollaborator = (): CollaboratorWithTurnParams => ({
	// 	id: faker.number.int().toString(),
	// 	name: `${faker.person.firstName()} ${faker.person.lastName()}`,
	// 	email: faker.internet.email(),
	// 	lastMark: {
	// 		date: timestamp(),
	// 		hour: `${faker.number.int({ min: 0, max: 18 }).toString().padStart(2, "0")}:00`,
	// 	},
	// 	position: faker.person.jobType(),
	// 	sector: faker.commerce.department(),
	// 	turn: {
	// 		entry1: "07:00",
	// 		out1: "12:00",
	// 		entry2: "13:00",
	// 		out2: "17:00",
	// 	},
	// });
	const tm = (
		dayMonth: string,
		dayWeek: string,
		mockDesconsiderMark: boolean,
	): MarkViewTimetrackingData => ({
		dayMonth,
		dayWeek,
		settingIds: {
			idDayoff: "",
			idHoliday: "",
			idHourBank: "",
			idRequest: "",
			idTurnEdit: "",
		},
		// settingIds: {

		// 	idTurnEdit: getRandomBoolean() ? faker.number.int().toString() : undefined,
		// 	idHoliday: getRandomBoolean() ? faker.number.int().toString() : undefined,
		// 	idDayoff: getRandomBoolean() ? faker.number.int().toString() : undefined,
		// 	idRequest: getRandomBoolean() ? faker.number.int().toString() : undefined,
		// 	idHourBank: getRandomBoolean() ? faker.number.int().toString() : undefined,
		// },
		dayFlags: {
			dayOff: {
				hasRecords: false,
			},
			extraTime: {
				hasRecords: false,
			},
			holiday: {
				hasRecords: false,
			},
			requests: {
				hasRecords: false,
			},
			workshiftAdjustments: {
				hasRecords: false,
			},
		},
		turn: {},
		collaborator: {
			id: faker.number.int().toString(),
			name: `${faker.person.firstName()} ${faker.person.lastName()}`,
			email: faker.internet.email(),
			lastMark: {
				date: timestamp(),
				hour: `${faker.number.int({ min: 0, max: 18 }).toString().padStart(2, "0")}:00`,
			},
			position: faker.person.jobType(),
			sector: faker.commerce.department(),
			turn: {
				entry1: "07:00",
				out1: "12:00",
				entry2: "13:00",
				out2: "17:00",
			},
		},
		entry1: { value: "01:00", status: MarkStatusEnum.normal },
		out1: { value: "02:00", status: MarkStatusEnum.normal },
		entry2: {},
		out2: {},
		entry3: { value: "03:00", status: MarkStatusEnum.dayoff },
		out3: { value: "04:00", status: MarkStatusEnum.dayoff },
		entry4: { value: "03:00", status: MarkStatusEnum.missing },
		out4: { value: "04:00", status: MarkStatusEnum.missing },
		entry5: {
			value: "04:00",
			status: MarkStatusEnum.normal,
			idMark: faker.number.int().toString(),
			justify,
			responsible: `${faker.person.firstName()} ${faker.person.lastName()}`,
		},
		out5: {
			value: "04:00",
			status: MarkStatusEnum.normal,
			idMark: faker.number.int().toString(),
			justify,
			responsible: `${faker.person.firstName()} ${faker.person.lastName()}`,
		},
		entry6: { value: "03:00", status: MarkStatusEnum.dent },
		out6: { value: "04:00", status: MarkStatusEnum.med },
		hrDaytime: "00:00",
		hrTotalDaytime: "00:00",
		hrTotalWorked: "00:00",
		hrExpectedHours: "00:00",
		hrNight: "00:00",
		hrTotalNight: "00:00",
		hrEarlyOut: "00:00",
		hrEarlyEntry: "00:00",
		hrMissings: "00:00",
		hrDelay: "00:00",
		hrDelayInterval: "00:00",
		hrDelayEntry: "00:00",
		hrDaytimeDelayInterval: "00:00",
		hrNightDelayTotal: "00:00",
		hrDelayTotal: "00:00",
		hrAllowance: "00:00",
		hrInterval: "00:00",
		hrEntry50PercentDaytime: "00:00",
		hrEntry50PercentNight: "00:00",
		hrEntry60PercentDaytime: "00:00",
		hrEntry60PercentNight: "00:00",
		hrEntry100PercentDaytime: "00:00",
		hrEntry100PercentNight: "00:00",
		hrTotalExtraDaytime: "00:00",
		hrTotalExtraNight: "00:00",
		hrTotalExtra: "00:00",
		hrExtraInterval: "00:00",
		hrEntryAdvance: "00:00",
		hrDsrConsider: "00:00",
		hrDsrDebited: "00:00",
		hrBankCredDebt: "-00:00",
		hrBankMonth: "00:00",
		hrBankBalance: "00:00",
		desconsiderMarks: mockDesconsiderMark
			? [
				{
					date: "2026-01-01",
					idMark: uuidv4(),
					entryKey: "entry1",
					justify: "",
					responsible: "",
					hour: "08:00",
				},
				{
					date: "2026-01-01",
					idMark: uuidv4(),
					entryKey: "entry1",
					justify: "",
					responsible: "",
					hour: "12:00",
				},
				{
					date: "2026-01-01",
					idMark: uuidv4(),
					entryKey: "entry1",
					justify: "",
					responsible: "",
					hour: "13:00",
				},
				{
					date: "2026-01-01",
					idMark: uuidv4(),
					entryKey: "entry1",
					justify: "",
					responsible: "",
					hour: "17:00",
				},
			]
			: [],
	});
	return Array.from({ length: qtd }).map(() => tm(date, dayWeek, true));
}

export function mockIrregularitiesUser(): IrregularitiesResponse {
	const { ptBR } = require("date-fns/locale/pt-BR");

	const now = new Date();
	const date = format(now, "dd/MM/yy");
	const dayWeek = format(now, "EEEE", { locale: ptBR });
	return {
		// id: faker.number.int().toString(),
		id: uuidv4(),
		period: 2,
		totals: {
			hrMissings: "00:00",
			hrAllowance: "00:00",
			hrBankBalance: "00:00",
			hrBankCredDebt: "00:00",
			hrBankMonth: "00:00",
			hrDaytime: "00:00",
			hrDaytimeDelayInterval: "00:00",
			hrDelay: "00:00",
			hrDelayEntry: "00:00",
			hrDelayInterval: "00:00",
			hrDelayTotal: "00:00",
			hrDsrConsider: "00:00",
			hrDsrDebited: "00:00",
			hrEarlyEntry: "00:00",
			hrEarlyOut: "00:00",
			hrEntry100PercentDaytime: "00:00",
			hrEntry100PercentNight: "00:00",
			hrEntry50PercentDaytime: "00:00",
			hrEntry50PercentNight: "00:00",
			hrEntry60PercentDaytime: "00:00",
			hrEntry60PercentNight: "00:00",
			hrEntryAdvance: "00:00",
			hrExpectedHours: "00:00",
			hrExtraInterval: "00:00",
			hrInterval: "00:00",
			hrNight: "00:00",
			hrNightDelayTotal: "00:00",
			hrTotalDaytime: "00:00",
			hrTotalExtra: "00:00",
			hrTotalExtraDaytime: "00:00",
			hrTotalExtraNight: "00:00",
			hrTotalNight: "00:00",
			hrTotalWorked: "00:00",
			desconsiderMarks: "00:00",
		},
		// },
		// collaborator: {
		// 	email: "",
		// 	id: "",
		// 	lastMark: {
		// 		date: "",
		// 		hour: "",
		// 	},
		// 	name: "",
		// 	position: "",
		// 	sector: "",
		// 	turn: {},
		// },
		// dayFlags: {
		// 	dayOff: {
		// 		hasRecords: false,
		// 		link: "",
		// 	},
		// 	extraTime: {
		// 		hasRecords: false,
		// 		link: "",
		// 	},
		// 	holiday: {
		// 		hasRecords: false,
		// 		link: "",
		// 	},
		// 	requests: {
		// 		hasRecords: false,
		// 		link: "",
		// 	},
		// 	workshiftAdjustments: {
		// 		hasRecords: false,
		// 		link: "",
		// 	},
		// },
		// dayMonth: "",
		// dayWeek: "",
		// turn: {},
		// // period: 6,
		// // totals: {
		// hrDaytime: "00:00",
		// hrTotalDaytime: "00:00",
		// hrTotalWorked: "00:00",
		// hrExpectedHours: "00:00",
		// hrNight: "00:00",
		// hrTotalNight: "00:00",
		// hrEarlyOut: "00:00",
		// hrEarlyEntry: "00:00",
		// hrMissings: "00:00",
		// hrDelay: "00:00",
		// hrDelayInterval: "00:00",
		// hrDelayEntry: "00:00",
		// hrDaytimeDelayInterval: "00:00",
		// hrNightDelayTotal: "00:00",
		// hrDelayTotal: "00:00",
		// hrAllowance: "00:00",
		// hrInterval: "00:00",
		// hrEntry50PercentDaytime: "00:00",
		// hrEntry50PercentNight: "00:00",
		// hrEntry60PercentDaytime: "00:00",
		// hrEntry60PercentNight: "00:00",
		// hrEntry100PercentDaytime: "00:00",
		// hrEntry100PercentNight: "00:00",
		// hrTotalExtraDaytime: "00:00",
		// hrTotalExtraNight: "00:00",
		// hrTotalExtra: "00:00",
		// hrExtraInterval: "00:00",
		// hrEntryAdvance: "00:00",
		// hrDsrConsider: "00:00",
		// hrDsrDebited: "00:00",
		// hrBankCredDebt: "00:00",
		// hrBankMonth: "00:00",
		// hrBankBalance: "00:00",
		// desconsiderMarks: [
		// 	{
		// 		date: "2026-01-01",
		// 		entryKey: "entry1",
		// 		hour: "00:00",
		// 		idMark: uuidv4(),
		// 		justify: "",
		// 		responsible: "",
		// 	},
		// ],
		irregularities: mockIrregularities(20, date, dayWeek),
		columnsToRender: {
			hrDaytime: true,
			hrTotalDaytime: true,
			hrTotalWorked: true,
			hrExpectedHours: true,
			hrNight: true,
			hrTotalNight: true,
			hrEarlyOut: true,
			hrEarlyEntry: true,
			hrMissings: true,
			hrDelay: true,
			hrDelayInterval: true,
			hrDelayEntry: true,
			hrDaytimeDelayInterval: true,
			hrNightDelayTotal: true,
			hrDelayTotal: true,
			hrAllowance: true,
			hrInterval: true,
			hrEntry50PercentDaytime: true,
			hrEntry50PercentNight: true,
			hrEntry60PercentDaytime: true,
			hrEntry60PercentNight: true,
			hrEntry100PercentDaytime: true,
			hrEntry100PercentNight: true,
			hrTotalExtraDaytime: true,
			hrTotalExtraNight: true,
			hrTotalExtra: true,
			hrExtraInterval: true,
			hrEntryAdvance: true,
			hrDsrConsider: true,
			hrDsrDebited: true,
			hrBankCredDebt: true,
			hrBankMonth: true,
			hrBankBalance: true,
			desconsiderMarks: true,
		},
	};
}
