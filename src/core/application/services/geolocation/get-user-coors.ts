import type { Coordinates } from "@/domain/entities/address";
import { zeroMarkBr } from "@/domain/mark-zero-br";

export async function getUserCoors(
	isoState?: keyof typeof zeroMarkBr,
): Promise<Coordinates> {
	if (!navigator.geolocation) {
		return zeroMarkBr[isoState ?? "SP"];
	}

	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lat: position.coords.latitude.toString(),
					lng: position.coords.longitude.toString(),
				});
			},
			() => {
				resolve(zeroMarkBr[isoState ?? "SP"]);
			},
		);
	});
}
