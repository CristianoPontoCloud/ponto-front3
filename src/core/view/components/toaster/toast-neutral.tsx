import { toast } from "sonner";
import type { ToastParams } from "./toast-type";

export function toastNeutral({
	tittle,
	action,
	description,
	duration,
}: ToastParams) {
	toast(tittle, {
		duration,
		action,
		description,
		position: "bottom-right",
		classNames: {
			toast:
				"group toast right-[0px] bottom-[0px] group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton:
				"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton:
				"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
		},
	});
}
