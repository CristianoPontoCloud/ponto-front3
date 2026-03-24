import type { CollaboratorWithTurnParams } from "@/domain/entities/time-tracking/timetraking-collaborator";
import { CollaboratorViewerTooltipContent } from "@/view/components/entities/collaborator/collaborator-viewer-tooltip-content";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/view/components/ui/tooltip";
import { format } from "date-fns";
import { UserRound } from "lucide-react";

export function TimetrackingGridCollaboratorIconCell(
	params: Omit<CollaboratorWithTurnParams, "turn">,
) {
	const hasntMark = params.lastMark === null || params.lastMark === undefined;
	const lastMarkStr = hasntMark
		? "Sem marcação"
		: `${format(params.lastMark?.date, "dd/MM/yyyy")} ás ${params.lastMark?.hour}`;
	return (
		<div style={{ color: "white" }}>
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger className="group">
						<div className="w-full h-full flex gap-2 items-center ">
							<div className="bg-muted-foreground/15 w-8 h-8 flex justify-center items-center rounded-full relative">
								<UserRound className="text-muted-foreground w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
							</div>
							<div>
								<span className="text-black dark:text-white group-hover:underline">
									{params.name}
								</span>
							</div>
						</div>
					</TooltipTrigger>
					<CollaboratorViewerTooltipContent
						{...{ ...params, lastMark: lastMarkStr, department: params.sector }}
					/>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
