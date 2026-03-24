import type {
	EntryAndOutKey,
	MarkEntriesAndOutsDetails,
	MarkStatusEnum,
} from "@/domain/entities/marks/marks";
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
import { AlarmClockOff, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, X } from "lucide-react";
import { useMarkEntriesNormalCell } from "./use-entries-normal-cell";

export interface MarkEntriesNormalCellParams {
	details: MarkEntriesAndOutsDetails;
	collaborator: CollaboratorWithTurnParams;
	entryKey: EntryAndOutKey;
	date: Date;
	status: MarkStatusEnum;
	idMark?: string;
	refetchGridValues: () => void;
	moveRightDisabled?: boolean;
	moveLeftDisabled?: boolean;
	movePreviousDateDisabled?: boolean;
	moveNextDateDisabled?: boolean;
	disconsiderDisabled?: boolean;
}

export function MarkEntriesNormalCell({
	details,
	collaborator,
	entryKey,
	date,
	idMark,
	refetchGridValues,
	moveRightDisabled = false,
	moveLeftDisabled = false,
	movePreviousDateDisabled = false,
	moveNextDateDisabled = false,
	status,
	disconsiderDisabled,
}: MarkEntriesNormalCellParams) {
	const {
		canCloseOnBlur,
		moveEntryLeft,
		moveEntryNextDay,
		moveEntryPreviousDay,
		moveEntryRight,
		open,
		setCanCloseOnBlur,
		setOpen,
		openSheetDisconsiderMark,
	} = useMarkEntriesNormalCell({
		details,
		collaborator,
		entryKey,
		date,
		idMark,
		status,
		refetchGridValues,
	});

	if (!details.value) {
		return <div className="w-full h-full flex justify-center items-center">-</div>;
	}

	function ToolTipContentBody() {
		return (
			<>
				<p className="font-semibold">Marcação original</p>
				<span>Clique para gerenciar</span>
			</>
		);
	}

	return (
		<div className="w-full h-full flex items-center justify-center">
			<Popover open={open} onOpenChange={setOpen}>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger asChild>
							<PopoverTrigger className="hover:underline">{details.value}</PopoverTrigger>
						</TooltipTrigger>
						<TooltipContent
							align="start"
							className="w-[155px] bg-black text-xs text-white dark:bg-white dark:text-black"
						>
							<ToolTipContentBody />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<PopoverContent
					className="w-[258px] p-0"
					align="start"
					onInteractOutside={(e) => {
						if (canCloseOnBlur) {
							e.preventDefault();
						}
					}}
				>
					<div className="w-full flex justify-between items-center p-4">
						<span>Marcação</span>
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
							onClick={() => openSheetDisconsiderMark()}
							disabled={disconsiderDisabled}
						>
							<AlarmClockOff /> Desconsiderar
						</Button>
						<Button
							variant="outline"
							type="button"
							className="w-full justify-start"
							onMouseEnter={() => setCanCloseOnBlur(true)}
							onMouseLeave={() => setCanCloseOnBlur(false)}
							onClick={() => moveEntryRight()}
							disabled={moveRightDisabled}
						>
							<ArrowRight /> Mover para a direita
						</Button>
						<Button
							variant="outline"
							type="button"
							className="w-full justify-start"
							onMouseEnter={() => setCanCloseOnBlur(true)}
							onMouseLeave={() => setCanCloseOnBlur(false)}
							onClick={() => moveEntryLeft()}
							disabled={moveLeftDisabled}
						>
							<ArrowLeft /> Mover para a esquerda
						</Button>
						<Button
							variant="outline"
							type="button"
							className="w-full justify-start"
							onMouseEnter={() => setCanCloseOnBlur(true)}
							onMouseLeave={() => setCanCloseOnBlur(false)}
							onClick={() => moveEntryPreviousDay()}
							disabled={movePreviousDateDisabled}
						>
							<ArrowUp /> Mover para o dia anterior
						</Button>
						<Button
							variant="outline"
							type="button"
							className="w-full justify-start"
							onMouseEnter={() => setCanCloseOnBlur(true)}
							onMouseLeave={() => setCanCloseOnBlur(false)}
							onClick={() => moveEntryNextDay()}
							disabled={moveNextDateDisabled}
						>
							<ArrowDown /> Mover para o próximo dia
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
