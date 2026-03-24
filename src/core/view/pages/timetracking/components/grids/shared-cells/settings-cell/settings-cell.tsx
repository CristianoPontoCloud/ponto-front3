import type { DayFlag, MarkDayFlags, MarkSettingIds } from "@/domain/entities/marks/settings/mark-setting-ids";
import type { CollaboratorWithTurnParams } from "@/domain/entities/time-tracking/timetraking-collaborator";
import { Button } from "@/view/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/view/components/ui/popover";
import { Separator } from "@/view/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/view/components/ui/tooltip";
import {
	AlarmClockPlus,
	CalendarFold,
	CalendarHeart,
	FolderClock,
	Settings,
	ShieldCheck,
	X,
} from "lucide-react";
import { tv } from "tailwind-variants";
import { useTimetrackingSettingCell } from "./use-timetracking-settings-cell";

export interface TimetrackingGridSettingIconCellParams {
	collaborator: CollaboratorWithTurnParams;
	date?: string;
	dayFlags: MarkDayFlags;
	settingIds: MarkSettingIds;
}

export function TimetrackingGridSettingIconCell({
	collaborator,
	date,
	dayFlags,
	settingIds
}: TimetrackingGridSettingIconCellParams) {
	const {
		canCloseOnBlur,
		open,
		setCanCloseOnBlur,
		setOpen,
		openTurnSheet,
		openHourBankSheet,
		openRequestSheet,
		caseDayoff,
		caseHoliday,
		dayoffHasRecord,
		holidayHasRecord,
		hourbankHasRecord,
		requestHasRecord,
		turnHasRecord,
	} = useTimetrackingSettingCell({ collaborator, date, dayFlags, settingIds });
	const hasRecords = Object.values(dayFlags ?? {}).some(({ hasRecords }: DayFlag) => hasRecords) ?? false;
	const settingsIconVariants = tv({
		base: "w-4 h-4",
		variants: {
			hasRecords: {
				true: "text-blue-600",
				fals: "",
			},
		},
	});
	function hasNotification(record: boolean) {
		if (!record) return;
		return <div className="h-2 w-2 rounded-full bg-blue-600" />;
	}

	return (
		<div className="w-full h-full flex justify-center items-center">
			<Popover open={open} onOpenChange={setOpen}>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger asChild>
							<PopoverTrigger className="w-full h-full flex justify-center items-center">
								<Settings className={settingsIconVariants({ hasRecords })} />
							</PopoverTrigger>
						</TooltipTrigger>
						<TooltipContent
							align="start"
							className="bg-black text-xs text-white dark:bg-white dark:text-black"
						>
							<p className="font-semibold">Ajustes</p>
							<span>Clique para gerenciar</span>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<PopoverContent
					className="w-[230px] p-0"
					align="start"
					onInteractOutside={(e) => {
						if (canCloseOnBlur) {
							e.preventDefault();
						}
					}}
				>
					<div className="w-full flex justify-between items-center p-4">
						<span>Ajustes</span>
						<X
							className="w-4 h-4 cursor-pointer"
							onClick={(e) => {
								e.stopPropagation();
								setOpen(false);
							}}
						/>
					</div>
					<Separator orientation="horizontal" />
					<div className="w-full flex flex-col p-4 gap-2">
						<Button
							variant="outline"
							type="button"
							className="w-full justify-start"
							onMouseEnter={() => setCanCloseOnBlur(true)}
							onMouseLeave={() => setCanCloseOnBlur(false)}
							onClick={() => openTurnSheet()}
						>
							<AlarmClockPlus /> Alteração de turno {hasNotification(turnHasRecord)}
						</Button>
						<Button
							variant="outline"
							type="button"
							className="w-full justify-start"
							onMouseEnter={() => setCanCloseOnBlur(true)}
							onMouseLeave={() => setCanCloseOnBlur(false)}
							onClick={() => openHourBankSheet()}
						>
							<FolderClock /> Banco de horas {hasNotification(hourbankHasRecord)}
						</Button>
						<Button
							variant="outline"
							type="button"
							className="w-full justify-start"
							onMouseEnter={() => setCanCloseOnBlur(true)}
							onMouseLeave={() => setCanCloseOnBlur(false)}
							onClick={() => caseHoliday()}
						>
							<CalendarFold /> Feriado {hasNotification(holidayHasRecord)}
						</Button>
						<Button
							variant="outline"
							type="button"
							className="w-full justify-start"
							onMouseEnter={() => setCanCloseOnBlur(true)}
							onMouseLeave={() => setCanCloseOnBlur(false)}
							onClick={() => caseDayoff()}
						>
							<CalendarHeart /> Folga
							{hasNotification(dayoffHasRecord)}
						</Button>
						<Button
							variant="outline"
							type="button"
							className="w-full justify-start"
							onMouseEnter={() => setCanCloseOnBlur(true)}
							onMouseLeave={() => setCanCloseOnBlur(false)}
							onClick={() => openRequestSheet()}
						>
							<ShieldCheck /> Solicitações {hasNotification(requestHasRecord)}
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
