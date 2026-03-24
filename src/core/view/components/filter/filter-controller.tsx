import { statusDefaultList } from "@/domain/usecases/status-default";
import type { ValueLabelIcon } from "@/domain/value-label";
import { useQueryState } from "nuqs";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
export interface FiltersControllerParams {
	customFieldName?: string;
	customFilters?: ValueLabelIcon[];
	classNames?: {
		tabs?: string;
		list?: string;
		trigger?: string;
	};
}

export default function FiltersController({
	customFilters,
	customFieldName,
	classNames,
}: FiltersControllerParams) {
	const [filter, setFilter] = useQueryState(customFieldName ?? "status", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});

	const handleTabChange = (value: string) => {
		setFilter(value);
	};

	const filters = customFilters ?? [
		...statusDefaultList.map((params) => ({ ...params, icon: undefined })),
		{
			label: "Todos",
			value: "ANY",
			icon: undefined,
		},
	];

	return (
		<Tabs
			value={filter ?? ""}
			onValueChange={handleTabChange}
			className={classNames?.tabs}
			data-testid="tabs"
		>
			<TabsList className={classNames?.list}>
				{filters.map((filter, index) => (
					<TabsTrigger
						key={index.toString()}
						value={filter.value}
						className={`gap-2 ${classNames?.trigger ?? ""}`}
						data-testid={`filter-${filter.label}`}
					>
						{filter?.icon ?? null}
						{filter.label}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
}
