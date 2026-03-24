"use client";
import { useIsMobile } from "@/application/hooks/use-mobile";
import { Separator } from "@/view/components/ui/separator";
import { SheetOverSheet, SheetOverSheetContent, SheetOverSheetDescription, SheetOverSheetHeader, SheetOverSheetTitle } from "@/view/components/ui/sheet-over-sheet";
import { createContext, useContext, useEffect, useState } from "react";
import type { SheetOverSheetContentControllerContextProps, SheetOverSheetContentControllerParams, SheetOverSheetContentControllerProviderParams } from "./sheet-over-sheet-content-type";


const defaultValueContent: SheetOverSheetContentControllerParams = {
	Body: <></>,
	Header: <></>,
	sheetMaxWidth: 'auto',
	sheetMinWidth: 'auto',
	sheetWidth: 'auto',
}

const defaultValue: SheetOverSheetContentControllerContextProps = {
	open: false,
	content: defaultValueContent,
	setContent: () => undefined,
	reset: () => undefined,
	setContentAndOpen: () => undefined
};

const SheetOverSheetContentControllerContext = createContext<SheetOverSheetContentControllerContextProps>(defaultValue);

export function SheetOverSheetContentControllerProvider({ children }: SheetOverSheetContentControllerProviderParams) {
	const [content, setContent] = useState<SheetOverSheetContentControllerParams>(defaultValueContent)
	const [open, setOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const isMobile = useIsMobile();

	function setContentAndOpen(params: SheetOverSheetContentControllerParams) {
		setContent(params)
		setOpen(true)
	}

	function reset() {
		setContent(defaultValueContent)
		setOpen(false)
	}
	useEffect(() => {
		if (open) {
			setIsClosing(false);
		}
	}, [open]);

	const { Body, Header, description, sheetMaxWidth, sheetMinWidth, sheetWidth } = content
	return (
		<SheetOverSheetContentControllerContext.Provider value={{ content, setContent, setContentAndOpen, reset, open }}>
			{children}
			<SheetOverSheet open={open} onOpenChange={setOpen} modal={true}>
				<SheetOverSheetContent
					forceMount
					autoFocus={false}
					setClose={() => setOpen(false)}
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
					<SheetOverSheetHeader>
						<SheetOverSheetTitle>{Header}</SheetOverSheetTitle>
						{description && <SheetOverSheetDescription>{description}</SheetOverSheetDescription>}
					</SheetOverSheetHeader>
					<Separator className="w-full h-[1px] bg-muted my-4" />
					<div className="relative h-full w-full">
						{Body}
					</div>
				</SheetOverSheetContent>
			</SheetOverSheet>
		</SheetOverSheetContentControllerContext.Provider>
	);
}

export const useContextSheetOverSheetContentController = () => {
	const context = useContext(SheetOverSheetContentControllerContext);
	return context;
};
