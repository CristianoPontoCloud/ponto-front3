import { UserRound } from "lucide-react";
import { Separator } from "../../ui/separator";
import { TooltipContent } from "../../ui/tooltip";

interface CollaboratorViewerTooltipContentParams {
	name: string;
	email: string;
	position: string;
	department: string;
	lastMark: string;
	className?: string;
	align?: "center" | "end" | "start" | undefined;
}

export function CollaboratorViewerTooltipContent({
	email,
	lastMark,
	name,
	position,
	department,
	align = "center",
	className = "",
}: CollaboratorViewerTooltipContentParams) {
	return (
		<TooltipContent
			className={`w-fit h-fit p-0 bg-background flex flex-col text-black shadow-md dark:text-white !important dark:border-border dark:border-[1px] ${className}`}
			align={align}
		>
			<div className="w-full flex items-center gap-2 py-3 px-4">
				<div className="bg-muted-foreground/15 w-11 h-11 flex justify-center items-center rounded-full">
					<UserRound className="text-muted-foreground w-4 h-4" />
				</div>
				<div className="flex flex-col justify-between">
					<span className="text-sm">{name}</span>
					<span className="text-xs text-muted-foreground">{email}</span>
				</div>
			</div>
			<Separator orientation="horizontal" />
			<div className="w-full flex flex-col gap-1 p-4">
				<span className="text-xs text-muted-foreground">Cargo</span>
				<span>{position}</span>
				<span className="text-xs text-muted-foreground">Setor</span>
				<span>{department}</span>
				<span className="text-xs text-muted-foreground">Últ. marcação</span>
				<span>{lastMark}</span>
			</div>
		</TooltipContent>
	);
}
