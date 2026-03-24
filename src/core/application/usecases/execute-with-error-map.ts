import { toastError } from "@/view/components/toaster/toast-error";

export type ErrorMap = Record<string, () => boolean>;

interface ExecuteWithErrorMapParams {
	fn: () => Promise<void>;
	errorMap: ErrorMap;
}

export async function executeWithErrorMap({ fn, errorMap }: ExecuteWithErrorMapParams) {
	try {
		await fn();
	} catch (error) {
		const handled = error instanceof Error && errorMap[error.message]?.();

		if (!handled) {
			toastError({ tittle: "Erro de servidor" });
		}
	}
}
