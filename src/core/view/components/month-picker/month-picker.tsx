import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMonthPicker } from "./use-month-picker";
interface MonthPickerParams {
	onChangeMonth: (value: string) => void;
	value: string;
	hasError: boolean;
	disabled?: boolean;
	placeholder?: string;
	classNames?: {
		buttonTrigger: string;
	};
}

export function MonthPicker(params: MonthPickerParams) {
	const {
		changeMonth,
		goToNextYear,
		goToPreviousYear,
		monthsList,
		month,
		year,
		isSelectedMonth,
		isMaxYear,
		isMinYear,
		invalidDate,
		monthPickerFullMonthNames,
	} = useMonthPicker({ ...params });
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
						className={buttonVariants({ hasError: params.hasError })}
						variant="outline"
						disabled={params.disabled}
						type="button"
					>
						<Calendar />{" "}
						{`${monthPickerFullMonthNames?.[month.label as keyof typeof monthPickerFullMonthNames] ?? ""}/${year}`}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="flex flex-col w-[216px] h-[180px] justify-between items-center">
					<div className="w-full flex justify-between items-center px-[1.8px]">
						<Button
							id="previous-year"
							type="button"
							size="icon"
							variant="secondary"
							disabled={isMinYear}
							className="w-9 h-7 p-0 flex justify-center items-center"
							onClick={() => goToPreviousYear()}
						>
							<ChevronLeft />
						</Button>
						<span>{year}</span>
						<Button
							id="next-year"
							type="button"
							size="icon"
							variant="secondary"
							disabled={isMaxYear}
							className="w-9 h-7 p-0 flex justify-center items-center"
							onClick={() => goToNextYear()}
						>
							<ChevronRight />
						</Button>
					</div>
					<div className="w-full flex flex-wrap gap-x-4 gap-y-2 justify-center">
						{monthsList.map(({ label, value }, index) => {
							return (
								<Button
									key={index.toString()}
									size="icon"
									className="text-xs"
									variant={isSelectedMonth(value) ? "default" : "ghost"}
									onClick={() => changeMonth(index)}
									disabled={invalidDate(index)}
								>
									{label}
								</Button>
							);
						})}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
