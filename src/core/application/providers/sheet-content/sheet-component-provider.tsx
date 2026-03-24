"use client";
import { useIsMobile } from "@/application/hooks/use-mobile";
import { Separator } from "@/view/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/view/components/ui/sheet";
import { createContext, useContext, useEffect, useState } from "react";
import { useSheet } from "../sheet-provider/sheet-provider";
import type {
	SheetContentControllerContextProps,
	SheetContentControllerParams,
	SheetContentControllerProviderParams,
} from "./sheet-content-type";

const defaultValueContent: SheetContentControllerParams = {
	Body: <></>,
	Header: <></>,
	sheetMaxWidth: "auto",
	sheetMinWidth: "auto",
	sheetWidth: "auto",
};

const defaultValue: SheetContentControllerContextProps = {
	content: defaultValueContent,
	setContent: () => undefined,
	reset: () => undefined,
	setContentAndOpen: () => undefined,
};

const SheetContentControllerContext =
	createContext<SheetContentControllerContextProps>(defaultValue);

export function SheetContentControllerProvider({ children }: SheetContentControllerProviderParams) {
	const [content, setContent] = useState<SheetContentControllerParams>(defaultValueContent);
	const [isClosing, setIsClosing] = useState(false);
	const isMobile = useIsMobile();

	const { open, setOpen } = useSheet();

	function setContentAndOpen(params: SheetContentControllerParams) {
		setContent(params);
		setOpen(true);
	}

	function reset() {
		setContent(defaultValueContent);
		setOpen(false);
	}
	useEffect(() => {
		if (open) {
			setIsClosing(false);
		}
	}, [open]);

	const { Body, Header, description, sheetMaxWidth, sheetMinWidth, sheetWidth } = content;
	return (
		<SheetContentControllerContext.Provider
			value={{ content, setContent, setContentAndOpen, reset }}
		>
			{children}
			<Sheet open={open} onOpenChange={setOpen} modal={true}>
				<SheetContent
					forceMount
					autoFocus={false}
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
					<SheetHeader>
						<SheetTitle>{Header}</SheetTitle>
						{description && <SheetDescription>{description}</SheetDescription>}
					</SheetHeader>
					<Separator className="w-full h-[1px] bg-muted my-4" />
					<div className="relative h-full w-full">{Body}</div>
				</SheetContent>
			</Sheet>
		</SheetContentControllerContext.Provider>
	);
}

export const useContextSheetContentController = () => {
	const context = useContext(SheetContentControllerContext);
	return context;
};
