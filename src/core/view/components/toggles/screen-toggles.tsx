import { useScreen } from "@/application/providers/screen/screen-provider";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ScreenToggle({ className = "w-fit" }: { className?: string }) {
	const { fullScreen, isFullScreen, exitFullScreen } = useScreen();
	const tooltipContentStyle = "bg-black text-white dark:bg-white dark:text-black";
	if (isFullScreen)
		return (
			<Tooltip>
				<TooltipTrigger asChild className={className}>
					<Button type="button" size="icon" variant="outline" onClick={() => exitFullScreen()}>
						<Minimize />
					</Button>
				</TooltipTrigger>
				<TooltipContent align="end" className={tooltipContentStyle}>
					Minimizar visualização
				</TooltipContent>
			</Tooltip>
		);

	return (
		<Tooltip>
			<TooltipTrigger asChild className={className}>
				<Button type="button" size="icon" variant="outline" onClick={() => fullScreen()}>
					<Maximize />
				</Button>
			</TooltipTrigger>
			<TooltipContent align="end" className={tooltipContentStyle}>
				Maximizar visualização
			</TooltipContent>
		</Tooltip>
	);
}
