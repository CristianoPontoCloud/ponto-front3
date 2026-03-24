import type { ValueLabel } from "@/domain/value-label";

export enum RequestInstanceTypeEnum {
	ESPECIFIC_DAY = "Período Especifico",
	FULL_DAY = "Dia Inteiro",
	HOURS_ADJUSTMENT = "Ajuste de Horas",
	REQUEST = "REQUEST",
	OFFLINE_MARK = "OFFLINE_MARK",
	GEO_DELIMITATION = "GEO_DELIMITATION",
	FAKE_GPS = "FAKE_GPS",
	NO_RECOGNIZE_PHOTO = "NO_RECOGNIZE_PHOTO",
}
const {
	ESPECIFIC_DAY,
	FULL_DAY,
	HOURS_ADJUSTMENT,
	FAKE_GPS,
	GEO_DELIMITATION,
	NO_RECOGNIZE_PHOTO,
	OFFLINE_MARK,
	REQUEST,
} = RequestInstanceTypeEnum;

export const requestInstaceTypeMap: Record<RequestInstanceTypeEnum, ValueLabel> = {
	[ESPECIFIC_DAY]: {
		label: ESPECIFIC_DAY,
		value: ESPECIFIC_DAY,
	},
	[FULL_DAY]: {
		label: FULL_DAY,
		value: FULL_DAY,
	},
	[HOURS_ADJUSTMENT]: {
		label: HOURS_ADJUSTMENT,
		value: HOURS_ADJUSTMENT,
	},
	[REQUEST]: {
		label: "Solicitação",
		value: REQUEST,
	},
	[OFFLINE_MARK]: {
		label: "Marcação offline",
		value: OFFLINE_MARK,
	},
	[GEO_DELIMITATION]: {
		label: "Delimitação geográfica",
		value: GEO_DELIMITATION,
	},
	[FAKE_GPS]: {
		label: "GPS falso",
		value: FAKE_GPS,
	},
	[NO_RECOGNIZE_PHOTO]: {
		label: "Foto não reconhecida",
		value: NO_RECOGNIZE_PHOTO,
	},
};

export function getRequestInstaceTypeDataToSelect() {
	return Object.values(requestInstaceTypeMap).filter(
		({ value }) => value !== ESPECIFIC_DAY && value !== FULL_DAY && value !== HOURS_ADJUSTMENT,
	);
}

export function getRequestInstaceType(status: RequestInstanceTypeEnum) {
	return requestInstaceTypeMap[status];
}
