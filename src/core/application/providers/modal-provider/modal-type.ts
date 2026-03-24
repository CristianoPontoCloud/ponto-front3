import type { ReactNode } from "react";

export interface ModalProviderParams {
	children: React.ReactNode;
}
export interface ModalContentProps {
	title?: string
	description?: string
	content?: ReactNode
	footer?: ReactNode
	customClose?: ReactNode
	classNames?: {
		content?: string
		header?: string
		footer?: string
		title?: string
		close?: string
		closeSvg?: string
		description?: string
	}
}
export interface ModalContextProps {
	open: boolean;
	setOpen: (value: boolean) => void;
	modal: ModalContentProps;
	setModal: (value: ModalContentProps) => void;
	setModalAndOpen: (value: ModalContentProps) => void;
	resetModal: VoidFunction;
}
