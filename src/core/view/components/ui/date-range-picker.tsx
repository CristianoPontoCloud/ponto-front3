"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/view/components/ui/button";
import { Calendar } from "@/view/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/view/components/ui/popover";
import { cn } from "@/view/lib/utils";
import type { Matcher } from "react-day-picker";
const { ptBR } = require("date-fns/locale/pt-BR");

interface DatePickerWithRangeParams {
	classNames?: {
		buttonTrigger: string;
		divWrapper: string;
	};
	dateFrom: Date | null | undefined;
	dateTo: Date | null | undefined;
	onChangeFromDate: (date: Date | undefined) => void;
	onChangeToDate: (date: Date | undefined) => void;
	// form: UseFormReturn<T>;
	// keyFormFrom: Path<T>;
	// keyFormTo: Path<T>;
	placeholder?: string;
	hasError?: boolean;
	disabled?: boolean;
	invalidDates?: Matcher | Matcher[] | undefined;
	limitDays?: number;
	align?: "center" | "end" | "start";
}

export function DatePickerWithRange({
	classNames,
	placeholder,
	disabled,
	invalidDates,
	align,
	dateFrom,
	dateTo,
	onChangeFromDate,
	onChangeToDate,
}: DatePickerWithRangeParams) {
	return (
		<div className={cn("grid gap-2", classNames?.divWrapper)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						disabled={disabled}
						className={cn(
							"w-full justify-start text-left font-normal",
							!dateTo && !dateFrom && "text-muted-foreground",
						)}
					>
						<CalendarIcon />
						{dateFrom ? (
							dateTo ? (
								<>
									{format(dateFrom, "dd/MM/yyyy", { locale: ptBR })} -{" "}
									{format(dateTo, "dd/MM/yyyy", { locale: ptBR })}
								</>
							) : (
								format(dateFrom, "dd/MM/yyyy", { locale: ptBR })
							)
						) : (
							<span>{placeholder ?? "Selecione as datas"}</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align={align}>
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={dateFrom ?? undefined}
						selected={{
							from: dateFrom ?? undefined,
							to: dateTo ?? undefined,
						}}
						onSelect={(date) => {
							onChangeFromDate(date?.from);
							onChangeToDate(date?.to);
						}}
						disabled={invalidDates}
						numberOfMonths={2}
						locale={ptBR}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
