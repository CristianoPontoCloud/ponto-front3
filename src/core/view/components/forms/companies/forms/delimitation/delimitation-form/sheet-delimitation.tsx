import { useIsMobile } from "@/application/hooks/use-mobile";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import {
	SheetOverSheet,
	SheetOverSheetContent,
	SheetOverSheetHeader,
	SheetOverSheetTitle,
	SheetOverSheetTrigger,
} from "@/view/components/ui/sheet-over-sheet";
import { Plus } from "lucide-react";
import { useDelimitationProvider } from "../delimitation-provider/delimitation-provider";
import { DelimitationForm } from "./delimitation-form";

// interface SheetDelimitationParams {
// 	openSheetDelimitation: boolean;
// 	setOpenSheetDelimitation: Dispatch<SetStateAction<boolean>>;
// 	delimitationForm: DelimitationFormParams;
// 	openModalExcludeDelimitation: (index: number) => void;
// }

export function SheetDelimitation() {
	const { openSheetDelimitation, setOpenSheetDelimitation, delimitationForm } =
		useDelimitationProvider();
	const isMobile = useIsMobile();
	const isEdit = delimitationForm.watch("id");

	return (
		<SheetOverSheet open={openSheetDelimitation}>
			<SheetOverSheetTrigger asChild>
				<Button
					variant="outline"
					type="button"
					className=""
					onClick={() => {
						setOpenSheetDelimitation(true);
					}}
				>
					<Plus /> Delimitação
				</Button>
			</SheetOverSheetTrigger>
			<SheetOverSheetContent
				setClose={() => {
					setOpenSheetDelimitation(false);
				}}
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
					width: isMobile ? "100%" : "auto",
					minWidth: "93vw",
					height: "100%",
				}}
			>
				<SheetOverSheetHeader className="px-1">
					<SheetOverSheetTitle>
						{isEdit ? "Editar delimitação" : "Nova delimitação"}
						{/* delimitação */}
					</SheetOverSheetTitle>
				</SheetOverSheetHeader>
				<Separator className="w-full h-[1px] bg-muted my-4 px-1" />
				<div className="relative h-full w-full">
					<DelimitationForm />
				</div>
			</SheetOverSheetContent>
		</SheetOverSheet>
	);
}
