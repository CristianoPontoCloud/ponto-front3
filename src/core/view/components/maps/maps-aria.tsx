import type { Coordinates } from "@/domain/entities/address";
import { Circle } from "./use-radius";

type CircleParams = Parameters<typeof Circle>["0"];

interface MapsAreaParams
	extends Omit<
		CircleParams,
		| "strokeColor"
		| "strokeOpacity"
		| "strokeWeight"
		| "fillColor"
		| "fillOpacity"
		| "center"
		| "radius"
	> {
	coors: Coordinates;
	radius: number;
}

export function MapsArea(params: MapsAreaParams) {
	return (
		<Circle
			{...params}
			center={{
				lat: Number(params.coors.lat),
				lng: Number(params.coors.lng),
			}}
			strokeColor={"#DC2626"}
			strokeOpacity={1}
			strokeWeight={3}
			fillColor={"#DC2626"}
			fillOpacity={0.4}
		/>
	);
}
