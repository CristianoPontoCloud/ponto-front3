import type { Address, Coordinates } from "./address";

export type DelimitationFormType = "address" | "manual";

export interface DelimitationProps {
	name: string;
	radius: string;
	// status: StatusDefaultEnum;
	status: boolean;
	complement: string
	type: 'manual' | 'address'
}

export interface DelimitationAddress extends Address, DelimitationProps { }

export interface DelimitationAddressManual
	extends Coordinates,
	DelimitationProps { }

export type Delimitations = (DelimitationAddress | DelimitationAddressManual)[];


export interface GeoFence {
	id: string
	delimitationName: string,
	latitude: string,
	longitude: string,
	radiusInMeters: number | string
	zip?: string,
	street?: string,
	code?: string,
	neighborhood?: string,
	city?: string,
	state?: string,
	complement?: string
	companyId: string
	active: boolean
}

