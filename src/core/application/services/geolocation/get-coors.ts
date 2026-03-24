import { apiGeocodeAddressToCoors } from "@/application/adapters/geolocation/api-geocode";

export async function getCoors(address: string) {
	const response = await apiGeocodeAddressToCoors.get("", {
		params: {
			address: address,
		},
	});

	if (response.data.status === "OK") {
		const location = response.data.results[0].geometry.location;
		return { lat: `${location.lat}`, lng: `${location.lng}` };
	}
}
