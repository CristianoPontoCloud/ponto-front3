import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useYearPicker } from "./use-year-picker";
interface YearPickerParams {
	yearValue: number;
	onChangeYear: (value: number) => void;
	hasError?: boolean;
	disabled?: boolean;
	placeholder?: string;
	classNames?: {
		buttonTrigger: string;
	};
}

export function YearPicker(params: YearPickerParams) {
	const {
		goToNextYear,
		goToPreviousYear,
		yearList,
		yearMax,
		yearMin,
		isSelectedYear,
		invalidDate,
	} = useYearPicker({ ...params });
	const buttonVariants = tv({
		base: "w-full justify-start px-3 text-muted-foreground hover:text-muted-foreground hover:bg-transparent",
		extend: params.classNames?.buttonTrigger,
		variants: {
			hasError: {
				true: "border-red-500 text-red-500",
				false: "",
			},
		},
	});

	return (
		<div className="space-y-2">
			<Popover>
				<PopoverTrigger asChild className="h-9">
					<Button
						id="month-trigger"
						className={buttonVariants({ hasError: params?.hasError ?? false })}
						variant="outline"
						disabled={params.disabled}
						type="button"
					>
						<Calendar /> {params.yearValue}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="flex flex-col w-[216px] h-[180px] justify-between items-center">
					<div className="w-full flex justify-between items-center px-[1.8px]">
						<Button
							id="previous-year"
							type="button"
							size="icon"
							variant="secondary"
							className="w-9 h-7 p-0 flex justify-center items-center"
							onClick={() => goToPreviousYear()}
						>
							<ChevronLeft />
						</Button>
						<span>{`${yearMin} - ${yearMax}`}</span>
						<Button
							id="next-year"
							type="button"
							size="icon"
							variant="secondary"
							className="w-9 h-7 p-0 flex justify-center items-center"
							onClick={() => goToNextYear()}
						>
							<ChevronRight />
						</Button>
					</div>
					<div className="grid grid-cols-3 gap-x-4 gap-y-2 justify-items-center">
						{yearList.map((year, index) => {
							return (
								<Button
									key={index.toString()}
									size="sm"
									className="text-xs"
									variant={isSelectedYear(year) ? "default" : "ghost"}
									onClick={() => params.onChangeYear(year)}
									disabled={invalidDate(year)}
								>
									{year}
								</Button>
							);
						})}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
