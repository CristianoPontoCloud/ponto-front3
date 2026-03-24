"use client";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/view/components/ui/dialog";
import { createContext, useContext, useEffect, useState } from "react";
import type { ModalContentProps, ModalContextProps, ModalProviderParams } from "./modal-type";

const defaultValue: ModalContextProps = {
	open: false,
	setOpen: () => null,
	modal: {
		title: "",
		content: <></>,
		description: "",
		footer: <></>,
	},
	setModal: () => null,
	resetModal: () => null,
	setModalAndOpen: () => null,
};

const ModalContext = createContext<ModalContextProps>(defaultValue);

export function ModalProvider({ children }: ModalProviderParams) {
	const [open, setOpen] = useState<boolean>(false);
	const [modal, setModal] = useState<ModalContentProps>(defaultValue.modal);
	function resetModal() {
		setOpen(false);
		setModal({});
	}
	function setModalAndOpen(modal: ModalContentProps) {
		setModal(modal);
		setOpen(true);
	}
	useEffect(() => {
		document.body.style.pointerEvents = "";
	}, []);
	return (
		<ModalContext.Provider value={{ open, setOpen, setModal, modal, resetModal, setModalAndOpen }}>
			{children}
			<Dialog open={open}>
				<DialogContent
					className={`w-fit ${modal.classNames?.content ?? ""}`}
					closeClassName={modal.classNames?.close}
					closeSvgClassName={modal.classNames?.closeSvg}
					onInteractOutside={(e) => {
						const { originalEvent } = e.detail;
						if (
							originalEvent.target instanceof Element &&
							originalEvent.target.closest(".group.toast")
						) {
							e.preventDefault();
						}
					}}
				>
					{(modal.title || modal?.description) && (
						<DialogHeader className={modal.classNames?.header ?? ""}>
							{modal.title && (
								<DialogTitle className={modal.classNames?.title ?? ""}>{modal.title}</DialogTitle>
							)}
							{modal?.description && (
								<DialogDescription className={modal.classNames?.description ?? ""}>
									{modal.description}
								</DialogDescription>
							)}
						</DialogHeader>
					)}
					{modal.content}
					{modal?.footer && (
						<DialogFooter className={modal.classNames?.footer ?? ""}>
							<DialogClose asChild>{modal.footer}</DialogClose>
						</DialogFooter>
					)}
				</DialogContent>
			</Dialog>
		</ModalContext.Provider>
	);
}

export const useModal = () => {
	const context = useContext(ModalContext);

	if (context.setOpen === defaultValue.setOpen) {
		throw new Error("useModal deve ser usado dentro de um ModalProvider");
	}

	return context;
};
