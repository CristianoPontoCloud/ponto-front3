import { ClockIcon } from "lucide-react";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { useTimePicker } from "./use-time-picker-with-seconds";

export interface TimePickerWithSecondsParams {
	value: string;
	setValue: (value: string) => void;
	hasError: boolean;
	classNames?: {
		buttonTrigger?: string;
	};
}

export function TimePickerWithSeconds(params: TimePickerWithSecondsParams) {
	const {
		hour,
		hoursMap,
		minute,
		minutesAndSecondsMap,
		setHour,
		setMinute,
		showHour,
		seconds,
		setSeconds,
		time,
	} = useTimePicker(params);
	const valueSelected = tv({
		base: "p-1 text-sm hover:bg-transparent mr-1 hover:border-[1px] hover:border-primary my-[1px]",
		variants: {
			selected: {
				true: "bg-primary text-background hover:bg-primary hover:text-background",
				false: "",
			},
		},
	});
	const buttonVariants = tv({
		base: "w-full justify-start hover:bg-transparent",
		extend: params.classNames?.buttonTrigger,
		variants: {
			hasError: {
				true: "border-red-500",
				false: "",
			},
		},
	});
	return (
		<div className="space-y-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id={"time-picker-with-seconds-trigger"}
						variant="outline"
						className={buttonVariants({ hasError: params.hasError })}
						onClick={() => {
							document.body.style.pointerEvents = "";
						}}
						value={time}
						type="button"
					>
						<ClockIcon className="mr-2 h-4 w-4" />
						{showHour ? (
							time
						) : (
							<div id="default-time" className="font-thin text-muted-foreground">
								00:00:00
							</div>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="h-auto w-[180px] p-2">
					<div className="grid grid-cols-3 gap-4 text-center">
						<div className="col-span-1">
							<Label className="text-xs font-medium pr-2">Hr</Label>
							<ScrollArea
								className="h-[200px] w-full overflow-y-auto"
								scrollBar="inside"
								type="always"
								id="hr-container"
							>
								{hoursMap.map((num) => (
									<Button
										size="icon"
										key={num}
										variant="ghost"
										className={valueSelected({ selected: num === hour })}
										onClick={() => setHour(num)}
										id={`hr-${num}`}
									>
										{num}
									</Button>
								))}
							</ScrollArea>
						</div>
						<div className="col-span-1">
							<Label className="text-xs font-medium pr-2">Min</Label>
							<ScrollArea
								className="h-[200px] w-full overflow-y-auto "
								scrollBar="inside"
								type="always"
								id="min-container"
							>
								{minutesAndSecondsMap.map((num) => (
									<Button
										size="icon"
										key={num}
										variant="ghost"
										className={valueSelected({ selected: num === minute })}
										onClick={() => setMinute(num)}
										id={`min-${num}`}
									>
										{num}
									</Button>
								))}
							</ScrollArea>
						</div>
						<div className="col-span-1">
							<Label className="text-xs font-medium pr-2">Seg</Label>
							<ScrollArea
								className="h-[200px] w-full overflow-y-auto "
								scrollBar="inside"
								type="always"
								id="seg-container"
							>
								{minutesAndSecondsMap.map((num) => (
									<Button
										size="icon"
										key={num}
										variant="ghost"
										className={valueSelected({ selected: num === seconds })}
										onClick={() => setSeconds(num)}
										id={`seg-${num}`}
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
