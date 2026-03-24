import type { Coordinates } from "@/domain/entities/address";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { SvgPin } from "../svgs/svg-pin";

type AdvandecMarkerParams = Parameters<typeof AdvancedMarker>["0"];

interface MapsMarkParams extends Omit<AdvandecMarkerParams, "title" | "position"> {
	coors: Coordinates;
	classNamePin?: string;
}

export function MapsMark({ coors, classNamePin = "" }: MapsMarkParams) {
	const parserdCoors = {
		lat: Number(coors?.lat),
		lng: Number(coors?.lng),
	};
	return (
		<AdvancedMarker position={parserdCoors} title={"AdvancedMarker with customized pin."}>
			<SvgPin className={classNamePin} />
		</AdvancedMarker>
	);
}
