import { toastController } from "@/view/components/toaster/toast-controller";
import { useCallback, useEffect } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type ErrorCustomMessage<T extends FieldValues> = { key: Path<T>; message: string };
type ErrorFieldMap<T extends FieldValues> = Array<ErrorCustomMessage<T>>;

interface useErrorToastSubmitParams<T extends FieldValues> {
	classNameToast?: string;
	errorsMap?: ErrorFieldMap<T>;
	form: UseFormReturn<T>;
}
export function useErrorToastSubmit<T extends FieldValues>({
	classNameToast,
	errorsMap,
	form,
}: useErrorToastSubmitParams<T>) {
	const {
		formState: { errors, submitCount },
	} = form;
	const getErrors = useCallback(() => {
		return Object.keys(errors);
	}, [errors]);
	const defaultErrorMessage = useCallback(() => {
		if (getErrors().length > 0) {
			toastController.error({
				tittle: "Ops! Não foi possível salvar.",
				description: "Preencha os campos obrigatórios.",
				action: {
					label: "OK",
					onClick: () => {},
				},
				className: classNameToast,
			});
		}
	}, [getErrors, classNameToast]);
	const errorArrayFieldCase = useCallback(
		(key: string, messageToast: ErrorCustomMessage<T> | undefined) => {
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
	// function defaultErrorMessage() {
	// 	if (getErrors().length > 0) {
	// 		toastController.error({
	// 			tittle: "Ops! Não foi possível salvar.",
	// 			description: "Preencha os campos obrigatórios.",
	// 			action: {
	// 				label: "OK",
	// 				onClick: () => console.log("teste"),
	// 			},
	// 			className: classNameToast,
	// 		});
	// 	}
	// }
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
	// 					onClick: () => {},
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
						onClick: () => {},
					},
					className: classNameToast,
				});
			}
			return;
		}
		defaultErrorMessage();
	}, [submitCount, classNameToast, defaultErrorMessage, errorArrayFieldCase, errorsMap, getErrors]);
}
