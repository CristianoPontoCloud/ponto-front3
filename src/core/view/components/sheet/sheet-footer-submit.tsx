import { useErrorToastSubmit } from "@/application/hooks/use-error-toast-submit";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useContextSheetOverSheetContentController } from "@/application/providers/sheet-over-sheet-content/sheet-over-sheet-component-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { LoaderCircle } from "lucide-react";
import { type ReactNode, useRef } from "react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SheetFooter } from "../ui/sheet";

type ErrorCustomMessage<T extends FieldValues> = { key: Path<T>; message: string };

type ErrorFieldMap<T extends FieldValues> = Array<ErrorCustomMessage<T>>;

interface SheetFooterSubmitParams<T extends FieldValues> {
	LeftChild?: ReactNode;
	labelSubmit?: string;
	hasSeparator?: boolean;
	sheetHasDescription?: boolean;
	className?: string;
	errorsMap?: ErrorFieldMap<T>;
	classNameToast?: string;
	onCancel?: () => void;
}

export function SheetFooterSubmit<T extends FieldValues>({
	LeftChild,
	labelSubmit = "Salvar",
	hasSeparator = false,
	sheetHasDescription = false,
	className,
	errorsMap,
	classNameToast,
	onCancel,
}: SheetFooterSubmitParams<T>) {
	const { setOpen } = useSheet();
	const { reset } = useContextSheetOverSheetContentController();
	const { setModalAndOpen, resetModal } = useModal();
	const submitRef = useRef<HTMLButtonElement>(null);
	const form = useFormContext();
	// const {
	// 	formState: { isSubmitting, isDirty },
	// } = form;
	const isDirty = form.formState.isDirty;
	const isSubmitting = form.formState.isSubmitting;
	const sheetFoorterVariants = tv({
		base: `flex flex-col w-full absolute bg-background sm:justify-between pt-1 items-center pb-6 ${className}`,
		variants: {
			hasSeparator: {
				true: "flex-col",
				false: "",
			},
			sheetHasDescription: {
				true: "bottom-[60px]",
				false: "bottom-[34px]",
			},
		},
	});

	function cancelUseCase() {
		if (onCancel) {
			onCancel();
			resetModal();
			reset();
			return;
		}
		setOpen(false);
		reset();
		resetModal();
	}

	function openCancelModal() {
		setModalAndOpen({
			title: "Sair sem salvar?",
			content: (
				<div className="w-[352px] text-muted-foreground">
					<p>
						<span className="font-semibold">Atenção:</span> você possui alterações não salvas. Se
						sair agora, todo o progresso sera perdido.
					</p>
				</div>
			),
			footer: (
				<div className="flex gap-2 justify-end items-center">
					<Button
						id="close-and-discart"
						type="button"
						variant="destructive"
						onClick={() => cancelUseCase()}
					>
						Sair e descartar
					</Button>
					<Button
						id="save-and-continue"
						type="button"
						variant="outline"
						onClick={() => {
							resetModal();
							submitRef.current?.click();
						}}
					>
						salvar
					</Button>
				</div>
			),
		});
	}

	useErrorToastSubmit({ errorsMap, classNameToast, form });
	return (
		<SheetFooter
			id="sheet-footer-submit"
			className={sheetFoorterVariants({
				sheetHasDescription: sheetHasDescription,
				hasSeparator: hasSeparator,
			})}
		>
			{hasSeparator && <Separator className="my-2" />}
			<div className={`flex w-full items-center  ${LeftChild ? "justify-between" : "justify-end"}`}>
				{LeftChild}
				<div className="flex gap-2">
					<Button
						id="cancel"
						variant="outline"
						type="button"
						onClick={() => {
							if (isDirty) {
								return openCancelModal();
							}
							cancelUseCase();
						}}
					>
						Cancelar
					</Button>
					<Button
						ref={submitRef}
						variant="default"
						type="submit"
						disabled={isSubmitting}
						data-testid="button-submit"
					>
						{isSubmitting ? (
							<>
								Salvando...
								<LoaderCircle className="animate-spin" />
							</>
						) : (
							labelSubmit
						)}
					</Button>
				</div>
			</div>
		</SheetFooter>
	);
}
