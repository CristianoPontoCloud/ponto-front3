import { Button } from "@/view/components/ui/button";
import type { ReactNode } from "react";
import { toast } from "sonner";

export interface ToastCustomParams {
	classNames?: string;
	Component?: ReactNode;
	action?: {
		label: string;
		onClick: VoidFunction;
	};
	duration?: number;
}

export function toastCustom({ classNames, Component, action, duration }: ToastCustomParams) {
	toast.custom(
		() => {
			return (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					className={`flex items-center text-sm gap-4 ${classNames ?? ""}`}
					data-testid="toaster-custom"
					onClick={(e) => e.preventDefault()}
				>
					{Component}
					{action && (
						<Button
							className="font-semibold h-9"
							variant="secondary"
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
			duration: duration ?? 7000,
			position: "bottom-right",
			classNames: {
				toast:
					"group toast rounded-lg p-4 right-[0px] bottom-[0px] group-[.toaster]:bg-background group-[.toaster]:border-[1px] group-[.toaster]:pointer-events-auto  group-[.toaster]:border-border group-[.toaster]:shadow-lg",
				description: "group-[.toast]:text-muted-foreground",
				actionButton:
					"bg-red-600  group-[.toast]:border-2 group-[.toast]:border-background !important",
				cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
			},
		},
	);
}
