import type {
	DelimitationAddress,
	DelimitationAddressManual,
	DelimitationFormType,
	GeoFence,
} from "@/domain/entities/delimitation";
import type { CreateDto, EditDto } from "@/domain/http/http-client";

export interface DelimitationFormContextProps {
	initialType: DelimitationFormType;
	setInitialType: (value: DelimitationFormType) => void;
	delimitationFormValues: DelimitationAddress | DelimitationAddressManual;
	openCreateDelimitationForm: () => void;
	openEditDelimitationForm: (params: OpenEditDelimitationForm) => void;
	submitDelimitation: (params: SubmitDelimitation) => void;
}

export interface OpenEditDelimitationForm {
	geofence: GeoFence;
	index: number;
	type: DelimitationFormType;
}

// export interface EditDelimitation {
// 	delimitationId: string;
// 	index: number;
// }
export interface SubmitDelimitation {
	delimitation: DelimitationAddress | DelimitationAddressManual;
}

export type CreateAndEditGeoFence = CreateDto<GeoFence> | EditDto<GeoFence>;
