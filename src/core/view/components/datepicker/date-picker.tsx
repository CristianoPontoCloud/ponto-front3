import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import { CalendarIcon } from "lucide-react";
import type { DayPickerBase } from "react-day-picker";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

interface DatePickerProps {
	onDateSelect: (date: Date) => void;
	name?: string;
	value: Date | null;
	hasError?: boolean;
	id: string;
	invalidDates?: DayPickerBase["disabled"];
	disabled?: boolean;
}

function DatePicker({
	onDateSelect,
	value,
	name,
	hasError,
	id,
	disabled,
	invalidDates,
}: DatePickerProps) {
	const [selectedDate, setSelectedDate] = useState<Date | null>(value);
	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			setSelectedDate(date);
			onDateSelect(date);
		}
	};

	const inputVariants = tv({
		base: "w-full h-9 justify-start px-3 text-left text-sm font-medium",
		variants: {
			hasError: {
				true: "border-red-500",
				false: "",
			},
			disabled: {
				true: "cursor-not-allowed",
			},
		},
	});
	useEffect(() => {
		setSelectedDate(value);
	}, [value]);
	console.log(typeof selectedDate)
	console.log(selectedDate)
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					id={id}
					variant="outline"
					className={inputVariants({ hasError, disabled: !!disabled })}
					type="button"
					disabled={disabled}
				>
					<CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
					{selectedDate ? (
						format(selectedDate, "dd/MM/yyyy")
					) : (
						<span className="text-sm text-muted-foreground truncate">{name}</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0 z-[999] bg-popover border-[1px] border-solid border-muted rounded-md">
				<Calendar
					mode="single"
					locale={ptBR}
					selected={selectedDate || undefined}
					onSelect={handleDateSelect}
					disabled={invalidDates}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
