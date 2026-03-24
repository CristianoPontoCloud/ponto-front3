"use client";
import type { ChildrenReactNode } from "@/domain/children";
import type { Coordinates } from "@/domain/entities/address";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { APIProvider, Map, type MapProps } from "@vis.gl/react-google-maps";

const MAPS_KEY: string = process.env.MAPS_KEY ?? "";
const MAPS_ID: string = process.env.MAPS_ID ?? "";

interface MapsParams extends ChildrenReactNode {
	mapProps?: Omit<MapProps, "center" | "defaultZoom">;
	libsApiProvider?: string[];
	className?: string;
	center?: Coordinates;
	defaultZoom?: number;
}

const mapsDefaultConfig: MapProps = {
	gestureHandling: "greedy",
	disableDefaultUI: true,
	fullscreenControl: false,
	mapTypeControl: false,
	streetViewControl: false,
	zoomControl: false,
	scaleControl: false,
	clickableIcons: false,
	className: "w-full h-[200px] maps",
	defaultZoom: 15,
	style: {
		borderRadius: "20px",
	},
};

export function Maps({
	mapProps,
	libsApiProvider = ["marker"],
	children = <></>,
	center,
	className,
	defaultZoom,
}: MapsParams) {
	function centerCase(): Record<"lat" | "lng", number> | undefined {
		if (center)
			return {
				lat: Number(center.lat),
				lng: Number(center.lng),
			};
		return undefined;
	}
	const props: MapProps = {
		...mapsDefaultConfig,
		className: `${mapsDefaultConfig.className} ${className ?? ""}`,
		center: centerCase(),
		defaultZoom: defaultZoom ? defaultZoom : mapsDefaultConfig.defaultZoom,
		...mapProps,
	};
	return (
		<APIProvider apiKey={MAPS_KEY} libraries={libsApiProvider}>
			<Map mapId={MAPS_ID} {...props}>
				{children}
			</Map>
		</APIProvider>
	);
}
