export interface SheetProviderParams {
	children: React.ReactNode;
}

export interface SheetContextProps {
	open: boolean;
	setOpen: (value: boolean) => void;
}
