import type { ValueLabel } from "@/domain/value-label";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface SelectTabsParams {
	options: ValueLabel[];
	value: string;
	onValueChange: (value: string) => void;
	classNames?: {
		tabsList?: string;
		trigger?: string;
		tabs?: string;
	};
}
export function SelectTabs({
	options,
	value,
	onValueChange,
	classNames = { tabsList: "", trigger: "", tabs: "" },
}: SelectTabsParams) {
	const { tabsList, trigger, tabs } = classNames;
	return (
		<Tabs value={value} onValueChange={onValueChange} className={`w-full ${tabs}`}>
			<TabsList className={`w-full ${tabsList}`}>
				{options.map(({ label, value }, index) => {
					return (
						<TabsTrigger
							name={`tabs-trigger-${label}`}
							value={value}
							key={index.toString()}
							className={`w-full ${trigger}`}
						>
							{label}
						</TabsTrigger>
					);
				})}
			</TabsList>
		</Tabs>
	);
}
