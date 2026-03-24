import { toastCustom } from "./toast-custom";
import { toastError } from "./toast-error";
import { toastNeutral } from "./toast-neutral";

export const toastController = {
	neutral: toastNeutral,
	custom: toastCustom,
	error: toastError,
};
