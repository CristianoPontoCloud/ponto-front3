import { Button } from "@/view/components/ui/button";
import { toast } from "sonner";
import type { ToastParams } from "./toast-type";
interface toastErrorParams extends ToastParams {
	className?: string;
}
export function toastError({
	tittle,
	action,
	description,
	duration,
	className = "",
	position = "bottom-right",
}: toastErrorParams) {
	toast.custom(
		() => {
			return (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					className="flex justify-between items-center bg-red-600 text-background text-sm gap-4"
					data-testid="toaster-error"
					onClick={(e) => e.preventDefault()}
				>
					<div className="flex flex-col">
						<span className="ml-2 font-semibold">{tittle}</span>
						{description && <p className="ml-2 ">{description}</p>}
					</div>
					{action && (
						<Button
							className="bg-red-600 font-semibold border-background h-9 hover:bg-background hover:text-red-600"
							variant="outline"
							onClick={(e) => {
								e.preventDefault();
								action.onClick();
								toast.dismiss();
							}}
						>
							{action.label}
						</Button>
					)}
				</div>
			);
		},
		{
			unstyled: true,
			duration: duration ?? 999999999,
			position: position,
			classNames: {
				toast: `group toast rounded-lg p-4 right-[0px] bottom-[0px] group-[.toaster]:bg-red-600 group-[.toaster]:pointer-events-auto group-[.toaster]:text-background group-[.toaster]:border-border group-[.toaster]:shadow-lg ${className}`,
				description: "group-[.toast]:text-muted-foreground",
				actionButton:
					"bg-red-600 group-[.toast]:text-background group-[.toast]:border-2 group-[.toast]:border-background !important",
				cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
			},
		},
	);
}
