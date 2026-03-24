import { getCoors } from "@/application/services/geolocation/get-coors";
import { getUserCoors } from "@/application/services/geolocation/get-user-coors";
import { states } from "@/domain/data/state";
import type { Coordinates } from "@/domain/entities/address";
import { useCallback, useEffect, useState } from "react";
import { useDelimitationProvider } from "../delimitation-provider/delimitation-provider";

export function useDelimitationForm() {
	const { delimitationForm } = useDelimitationProvider();
	const [address, setAddress] = useState<string>("");
	const findStateByValue = (value: string) => states.find((state) => state.value === value);
	const setCoors = useCallback(
		({ lat, lng }: Coordinates) => {
			delimitationForm.setValue("latitude", lat);
			delimitationForm.setValue("longitude", lng);
		},
		[delimitationForm],
	);
	const formatAddress = useCallback((arr: string[]) => {
		return arr
			.filter((value) => value !== "" && value !== undefined)
			.map((value, index, filteredArr) => (index === filteredArr.length - 1 ? value : `${value} -`))
			.join(" ");
	}, []);
	// const setCoors = useCallback(() => {}, []);
	// const formatAddress = (arr: string[]) => {
	// 	return arr
	// 		.filter((value) => value !== "" && value !== undefined)
	// 		.map((value, index, filteredArr) => (index === filteredArr.length - 1 ? value : `${value} -`))
	// 		.join(" ");
	// };
	const street = delimitationForm.watch("street") ?? "";
	const state = delimitationForm.watch("state") ?? "";
	const neighborhood = delimitationForm.watch("neighborhood") ?? "";
	const zip = delimitationForm.watch("zip") ?? "";
	const code = delimitationForm.watch("code") ?? "";
	const city = delimitationForm.watch("city") ?? "";
	useEffect(() => {
		if (address === "") return;
		getCoors(address).then((response) => {
			if (response?.lat && response?.lng) {
				setCoors(response);
			}
		});
	}, [address, setCoors]);

	useEffect(() => {
		const delayedUpdateAddress = setTimeout(() => {
			const newAddress = formatAddress([
				street,
				code,
				neighborhood,
				zip,
				city,
				findStateByValue(state)?.label ?? "",
			]);
			setAddress(newAddress);
		}, 2000);

		return () => clearTimeout(delayedUpdateAddress);
	}, [street, state, zip, code, city, neighborhood, formatAddress]);

	useEffect(() => {
		async function getInitialCoors() {
			if (address !== "") return;
			const initCoors = await getUserCoors();
			setCoors(initCoors);
		}
		getInitialCoors();
	}, [address, setCoors]);

	return {
		address,
		setCoors,
	};
}
