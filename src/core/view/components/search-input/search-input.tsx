import { Search, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export interface InputSearchParams {
	value: string;
	setValue: (value: string) => void;
}

export function InputSearch({ setValue, value }: InputSearchParams) {
	// if (!renderingSearch) return;
	// const [name, setSearch] = useQueryState("name", {
	// 	history: "replace",
	// 	shallow: true,
	// 	clearOnDefault: false,
	// });

	// const [inputValue, setInputValue] = useState(name ?? "");

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		const trimmed = inputValue.trim();
	// 		setSearch(trimmed === "" ? null : trimmed);
	// 	}, 500);

	// 	return () => clearTimeout(timeout);
	// }, [inputValue, setSearch]);

	return (
		<div className="relative flex items-center" data-testid="search-div">
			<div className="flex gap-1 items-center h-9 relative">
				<Input
					id="search"
					maxLength={50}
					type="text"
					max={50}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					value={value}
				/>
				{!value && (
					<label
						className="absolute left-3 text-muted-foreground flex items-center gap-1 select-none"
						htmlFor="name"
					>
						<Search className="w-5 h-5" /> Buscar
					</label>
				)}
				{value && (
					<Button
						variant="ghost"
						className="w-6 h-6 p-0 opacity-50 absolute right-1 rounded-full flex justify-center items-center"
						onClick={(e) => {
							e.preventDefault();
							setValue("");
						}}
					>
						<XIcon />
					</Button>
				)}
			</div>
		</div>
	);
}
