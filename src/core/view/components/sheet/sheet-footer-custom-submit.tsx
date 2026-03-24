import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { LoaderCircle } from "lucide-react";
import { type ReactNode, useCallback, useEffect } from "react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";
import { toastController } from "../toaster/toast-controller";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SheetFooter } from "../ui/sheet";

type ErrorCustomMessage<T extends FieldValues> = { key: Path<T>; message: string };

type ErrorFieldMap<T extends FieldValues> = Array<ErrorCustomMessage<T>>;

interface SheetFooterCustomSubmitParams<T extends FieldValues> {
	LeftChild?: ReactNode;
	labelSubmit?: string;
	hasSeparator?: boolean;
	sheetHasDescription?: boolean;
	className?: string;
	errorsMap?: ErrorFieldMap<T>;
	classNameToast?: string;
	onCancel?: () => void;
	handleSubmit: VoidFunction;
}

export function SheetFooterCustomSubmit<T extends FieldValues>({
	LeftChild,
	labelSubmit = "Salvar",
	hasSeparator = false,
	sheetHasDescription = false,
	className,
	errorsMap,
	classNameToast,
	onCancel,
	handleSubmit,
}: SheetFooterCustomSubmitParams<T>) {
	const { setOpen } = useSheet();
	const {
		formState: { isSubmitting, errors, submitCount },
	} = useFormContext();
	const sheetFoorterVariants = tv({
		base: `flex flex-col w-full absolute bg-background sm:justify-between p-1 items-center pb-6 ${className}`,
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
	const getErrors = useCallback(() => {
		return Object.keys(errors);
	}, [errors]);
	const cancelUseCase = useCallback(() => {
		if (onCancel) return onCancel();
		setOpen(false);
	}, [onCancel, setOpen]);
	// function cancelUseCase() {
	// 	if (onCancel) return onCancel();
	// 	setOpen(false);
	// }
	const defaultErrorMessage = useCallback(() => {
		if (getErrors().length > 0) {
			toastController.error({
				tittle: "Ops! Não foi possível salvar.",
				description: "Preencha os campos obrigatórios para concluir o cadastro",
				action: {
					label: "OK",
					onClick: () => {},
				},
				className: classNameToast,
			});
		}
	}, [classNameToast, getErrors]);
	// function defaultErrorMessage() {
	// 	if (getErrors().length > 0) {
	// 		toastController.error({
	// 			tittle: "Ops! Não foi possível salvar.",
	// 			description: "Preencha os campos obrigatórios para concluir o cadastro",
	// 			action: {
	// 				label: "OK",
	// 				onClick: () => console.log("teste"),
	// 			},
	// 			className: classNameToast,
	// 		});
	// 	}
	// }
	const errorArrayFieldCase = useCallback(
		(key: string, messageToast: ErrorCustomMessage<T> | undefined): boolean => {
			if (Array.isArray(errors?.[key]) && messageToast === undefined) {
				for (const values of errors[key]) {
					for (const keyValue of Object.keys(values)) {
						messageToast = errorsMap?.find((item) => item.key === keyValue);
						if (messageToast !== undefined) break;
					}
					if (messageToast !== undefined) break;
				}
				if (messageToast) {
					toastController.error({
						tittle: "Ops! Não foi possível salvar.",
						description: messageToast?.message,
						action: {
							label: "OK",
							onClick: () => {},
						},
						className: classNameToast,
					});
				}
				return true;
			}
			return false;
		},
		[errors, classNameToast, errorsMap],
	);
	// function errorArrayFieldCase(
	// 	key: string,
	// 	messageToast: ErrorCustomMessage<T> | undefined,
	// ): boolean {
	// 	if (Array.isArray(errors?.[key]) && messageToast === undefined) {
	// 		for (const values of errors[key]) {
	// 			for (const keyValue of Object.keys(values)) {
	// 				messageToast = errorsMap?.find((item) => item.key === keyValue);
	// 				if (messageToast !== undefined) break;
	// 			}
	// 			if (messageToast !== undefined) break;
	// 		}
	// 		if (messageToast) {
	// 			toastController.error({
	// 				tittle: "Ops! Não foi possível salvar.",
	// 				description: messageToast?.message,
	// 				action: {
	// 					label: "OK",
	// 					onClick: () => console.log("teste"),
	// 				},
	// 				className: classNameToast,
	// 			});
	// 		}
	// 		return true;
	// 	}
	// 	return false;
	// }
	useEffect(() => {
		if (errorsMap?.length) {
			let messageToast: ErrorCustomMessage<T> | undefined = undefined;
			const errorKeys = getErrors();
			for (const key of errorKeys) {
				if (errorArrayFieldCase(key, messageToast)) break;
				messageToast = errorsMap?.find((item) => item.key === key);
				if (messageToast) break;
			}
			if (messageToast) {
				toastController.error({
					tittle: "Ops! Não foi possível salvar.",
					description: messageToast?.message,
					action: {
						label: "OK",
						onClick: () => console.log("teste"),
					},
					className: classNameToast,
				});
			}
			return;
		}
		defaultErrorMessage();
	}, [submitCount, classNameToast, defaultErrorMessage, errorArrayFieldCase, errorsMap, getErrors]);
	return (
		<SheetFooter
			className={sheetFoorterVariants({
				sheetHasDescription: sheetHasDescription,
				hasSeparator: hasSeparator,
			})}
		>
			{hasSeparator && <Separator className="my-2" />}
			<div className={`flex w-full items-center  ${LeftChild ? "justify-between" : "justify-end"}`}>
				{LeftChild}
				<div className="flex gap-2">
					<Button id="cancel" variant="outline" type="button" onClick={() => cancelUseCase()}>
						Cancelar
					</Button>
					<Button
						id="submit"
						variant="default"
						type="button"
						disabled={isSubmitting}
						data-testid="button-submit"
						onClick={() => handleSubmit()}
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
