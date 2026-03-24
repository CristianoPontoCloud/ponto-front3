import type { GeoFence } from "@/domain/entities/delimitation";
import { Button } from "@/view/components/ui/button";
import { Switch } from "@/view/components/ui/switch";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/view/components/ui/tooltip";
import { SquarePen, Trash } from "lucide-react";
import { tv } from "tailwind-variants";
import { useDelimitationProvider } from "../delimitation-provider/delimitation-provider";
interface DelimitationHeaderParams {
	geofence: GeoFence;
}
export function DelimitationHeaderCard({ geofence }: DelimitationHeaderParams) {
	const { openModalExcludeDelimitation, openEditDelimitationForm, changeStatusDelimitation } =
		useDelimitationProvider();
	const { active, radiusInMeters, delimitationName, id } = geofence;
	const toolTipContentClassName = "bg-black text-white dark:bg-white dark:text-black";
	const radiusVariants = tv({
		base: "py-[1px] px-2 rounded-lg bg-primary/10 text-xs",
		variants: {
			active: {
				true: "opacity-100",
				false: "opacity-50",
			},
		},
	});
	const opacityVariants = tv({
		variants: {
			active: {
				true: "opacity-100",
				false: "opacity-50",
			},
		},
	});

	function Exclude() {
		return (
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							type="button"
							onClick={(e) => {
								e.preventDefault();
								openModalExcludeDelimitation(id);
							}}
						>
							<Trash className="text-red-500" />
						</Button>
					</TooltipTrigger>
					<TooltipContent className={toolTipContentClassName}>Excluir</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}
	function Edit() {
		return (
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							type="button"
							onClick={() => openEditDelimitationForm(id)}
						>
							<SquarePen />
						</Button>
					</TooltipTrigger>
					<TooltipContent className={toolTipContentClassName}>Editar</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}
	return (
		<div className="flex justify-between items-center p-4">
			<label htmlFor={delimitationName} className={opacityVariants({ active })}>
				{delimitationName}
			</label>
			<div className="flex items-center gap-2">
				<div className={radiusVariants({ active })}>
					<p className="font-semibold text-primary">{`${radiusInMeters}m`}</p>
				</div>
				<Exclude />
				<Edit />
				<Switch
					id={delimitationName}
					checked={active}
					onCheckedChange={(newStatus) =>
						changeStatusDelimitation({ newStatus, delimitationId: id })
					}
					className={opacityVariants({ active })}
				/>
			</div>
		</div>
	);
}
