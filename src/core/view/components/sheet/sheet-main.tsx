import { Plus } from "lucide-react";
import { Button } from "../ui/button";

import { useIsMobile } from "@/application/hooks/use-mobile";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { type ReactNode, useEffect, useState } from "react";
import { type FieldValues, FormProvider, type UseFormReturn } from "react-hook-form";
import { Separator } from "../ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

export interface SheetMainParams<T extends FieldValues> {
	FormComponent: ReactNode;
	title: string | ReactNode;
	description?: string;
	labelOpenSheet: string;
	sheetWidth?: string;
	sheetMinWidth?: string;
	sheetMaxWidth?: string;
	form: UseFormReturn<T>;
}

export default function SheetMain<T extends FieldValues>({
	FormComponent,
	labelOpenSheet,
	description,
	title,
	sheetWidth = "auto",
	sheetMinWidth = "auto",
	sheetMaxWidth = "auto",
	form,
}: SheetMainParams<T>) {
	const { open, setOpen } = useSheet();
	const [isClosing, setIsClosing] = useState(false);
	const isMobile = useIsMobile();
	useEffect(() => {
		if (open) {
			setIsClosing(false);
		}
	}, [open]);

	return (
		<Sheet open={open} modal={true}>
			<SheetTrigger asChild>
				<Button
					variant="default"
					className="flex gap-2"
					onClick={() => setOpen(true)}
					data-testid="open-sheet-button"
				>
					<Plus />
					{labelOpenSheet}
				</Button>
			</SheetTrigger>
			<SheetContent
				forceMount
				autoFocus={false}
				onFocus={(e) => e.preventDefault()}
				onOpenAutoFocus={(e) => e.preventDefault()}
				onCloseAutoFocus={(e) => e.preventDefault()}
				onInteractOutside={(e) => {
					const { originalEvent } = e.detail;
					if (
						originalEvent.target instanceof Element &&
						originalEvent.target.closest(".group.toast")
					) {
						e.preventDefault();
					}
				}}
				style={{
					maxHeight: "100%",
					width: isMobile ? "100%" : sheetWidth,
					maxWidth: isMobile ? "100%" : sheetMaxWidth,
					minWidth: isMobile ? "100%" : sheetMinWidth,
					right: `${isClosing ? `-${sheetMinWidth}` : "0"}`,
				}}
			>
				<FormProvider {...form}>
					<SheetHeader>
						<SheetTitle>{title}</SheetTitle>
						{description && <SheetDescription>{description}</SheetDescription>}
					</SheetHeader>
					<Separator className="w-full h-[1px] bg-muted my-4" />
					<div className="relative h-full w-full">{FormComponent}</div>
				</FormProvider>
			</SheetContent>
		</Sheet>
	);
}
