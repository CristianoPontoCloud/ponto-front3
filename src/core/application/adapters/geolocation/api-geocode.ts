import axios from "axios";

const MAPS_GEOCODE_API = process.env.MAPS_GEOCODE_API;
const MAPS_KEY = process.env.MAPS_KEY;

if (!MAPS_GEOCODE_API || !MAPS_KEY) {
	throw new Error("MAPS_GEOCODE_API ou MAPS_KEY não estão definidos.");
}

export const apiGeocodeAddressToCoors = axios.create({
	baseURL: MAPS_GEOCODE_API,
});

apiGeocodeAddressToCoors.interceptors.request.use(
	(config) => {
		config.url = `${config.url}&key=${MAPS_KEY}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
