import { z } from "zod";
import "../../error-messages";

const personalData = {
	name: z.string().min(3),
	surname: z.string().min(3),
	email: z.string().email().or(z.literal('')).optional(),
	pis: z.string().optional(),
	hasNoPis: z.boolean().optional(),
	cpf: z.string().min(11),
	company: z.string().min(1).optional(),
	dtAdmission: z.date(),
	dtStartSystem: z.date(),
	department: z.string().min(1),
	costCenter: z.string().min(1),
	position: z.string().min(1),
	positionTrust: z.string().optional(),
	registration: z.string().optional(),
	sheet: z.string().optional(),
	ctps: z.string().optional(),
	clt: z.string().optional(),
};

const aditionalData = {
	rg: z.string().optional(),
	dtBirthday: z.date().optional(),
	gender: z.string().optional(),
	nationality: z.string().optional(),
	placeOfBirth: z.string().optional(),
	civilState: z.string().optional(),
	socialName: z.string().optional(),
	cnh: z.string().optional(),
	categoryCnh: z.string().optional(),
	dtMaturityCnh: z.date().optional(),
	zipcode: z.string().optional(),
	neighborhood: z.string().optional(),
	street: z.string().optional(),
	code: z.string().optional(),
	complement: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	telephone: z.string().optional(),
	extension: z.string().optional(),
	cell: z.string().optional(),
	whatsApp: z.string().optional(),
	fathersName: z.string().optional(),
	fathersTelephone: z.string().optional(),
	mothersName: z.string().optional(),
	mothersTelephone: z.string().optional(),
};

const turnsData = z.object({
	turnId: z.string().min(1),
	startDate: z.date(),
	endDate: z.date().nullable().optional(),
	positionCycle: z.string().min(1),
	observation: z.string().max(200).optional(),
})

const extraHourData = z.object({
	extraHourId: z.string().min(1),
	startDate: z.date(),
	endDate: z.date().nullable().optional(),
	observation: z.string().max(200).optional(),
})

const hourBankData = z.object({
	hourBankId: z.string().optional(),
	startDate: z.date().nullable().optional(),
	endDate: z.date().nullable().optional(),
	observation: z.string().max(200).optional(),
})

const workdayData = {
	turns: z.array(turnsData).min(1),
	extraHours: z.array(extraHourData).min(1),
	hourBanks: z.array(hourBankData).min(1)
};

const devicePermissionData = z.object({
	badge: z.boolean(),
	barCode: z.boolean(),
	biometricRecognition: z.boolean(),
	facialRecognition: z.boolean(),
	hasAccess: z.boolean(),
	photo: z.boolean(),
	pin: z.boolean(),
	throwJustify: z.boolean(),
	qrCode: z.boolean(),
	pointMark: z.boolean(),
});

const accessesData = {
	perfil: z.string().min(1),
	username: z.string().min(3),
	password: z.string().min(6),
	alterPasswordFirstLogin: z.boolean().optional(),
	geo: z.array(z.string()).optional(),
	fuso: z.string().optional(),
	mobile: devicePermissionData,
	web: devicePermissionData
};

export const collaboratorSchema = z.object({
	...personalData,
	...aditionalData,
	...workdayData,
	...accessesData,
	id: z.number().optional(),
	collaboratorIsActive: z.boolean().optional(),
});
