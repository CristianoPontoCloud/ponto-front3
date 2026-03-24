import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { InputSearch } from "../search-input/search-input";

export function DataManagerSearch({ renderingSearch = true }: { renderingSearch?: boolean }) {
	const [name, setSearch] = useQueryState("name", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});

	const [inputValue, setInputValue] = useState(name ?? "");

	useEffect(() => {
		const timeout = setTimeout(() => {
			const trimmed = inputValue.trim();
			setSearch(trimmed === "" ? null : trimmed);
		}, 500);

		return () => clearTimeout(timeout);
	}, [inputValue, setSearch]);
	if (!renderingSearch) return;

	return <InputSearch setValue={setInputValue} value={inputValue} />;
}
