import { Clock, MoveRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { useTimeRangePicker } from "./use-time-range-picker";
export interface TimeRangePickerParams<T extends FieldValues> {
	startTimeKeyForm: Path<T>;
	endTimeKeyForm: Path<T>;
	currentEditField: Path<T>;
	setCurrentEditField: Dispatch<SetStateAction<Path<T>>>;
	form: UseFormReturn<T>;
	field: ControllerRenderProps<T, Path<T>>;
	hasError: boolean;
	classNames?: {
		buttonTrigger?: string;
	};
}
export function TimeRangePicker<T extends FieldValues>(params: TimeRangePickerParams<T>) {
	const {
		hour,
		hoursMap,
		minute,
		minutesAndSecondsMap,
		setHour,
		setMinute,
		startTime,
		changeToEnd,
		changeToStart,
		endHourDisable,
		endMinuteDisable,
		showStartValue,
		showEndValue,
	} = useTimeRangePicker(params);
	const valueSelected = tv({
		base: "p-1 text-sm  hover:bg-transparent mr-1 hover:border-[1px] hover:border-primary my-[1px]",
		variants: {
			selected: {
				true: "bg-primary text-background hover:bg-primary hover:text-background",
				false: "",
			},
		},
	});
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
						id="time-picker-range"
						className={buttonVariants({ hasError: params.hasError })}
						variant="outline"
						type="button"
					>
						<div className="flex items-center gap-3">
							<Clock />
							<span id="start">{showStartValue("Inicial")}</span>
							<MoveRight />
							<span id="end">{showEndValue("Final")}</span>
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="flex flex-col gap-4 w-[190px]">
					<div className="flex gap-4 w-full">
						<Button
							id="time-start"
							type="button"
							className="w-full"
							variant={params.currentEditField === params.startTimeKeyForm ? "default" : "outline"}
							onClick={() => changeToStart()}
						>
							Inicial
						</Button>
						<Button
							id="time-end"
							type="button"
							className="w-full"
							variant={params.currentEditField === params.endTimeKeyForm ? "default" : "outline"}
							disabled={startTime.length !== 5}
							onClick={() => changeToEnd()}
						>
							Final
						</Button>
					</div>
					<div className="grid grid-cols-2 gap-4 text-center">
						<div className="col-span-1">
							<Label className="text-xs font-medium pr-2">Hr</Label>
							<ScrollArea
								className="h-[200px] w-fit overflow-y-auto"
								scrollBar="inside"
								id="hr-container"
							>
								{hoursMap.map((num) => (
									<Button
										size="icon"
										key={num}
										variant="ghost"
										className={valueSelected({ selected: num === hour })}
										onClick={() => setHour(num)}
										id={`h-${num}`}
										disabled={endHourDisable(num)}
									>
										{num}
									</Button>
								))}
							</ScrollArea>
						</div>
						<div className="col-span-1">
							<Label className="text-xs font-medium pr-2">Min</Label>
							<ScrollArea
								className="h-[200px] w-fit overflow-y-auto "
								scrollBar="inside"
								id="min-container"
							>
								{minutesAndSecondsMap.map((num) => (
									<Button
										size="icon"
										key={num}
										variant="ghost"
										className={valueSelected({ selected: num === minute })}
										onClick={() => setMinute(num)}
										id={`m-${num}`}
										disabled={endMinuteDisable(num)}
									>
										{num}
									</Button>
								))}
							</ScrollArea>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
