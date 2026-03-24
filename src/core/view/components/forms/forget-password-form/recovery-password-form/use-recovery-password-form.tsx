import { recoveryPasswordFacadeFactory } from "@/application/factories/enrollment/recovery-password-facade-factory";
import { recoveryPasswordSchema } from "@/application/validation/forms/recovery-password";
import type { RecoveryPasswordFormProps } from "@/domain/authentication/recovery-password";
import { toastError } from "@/view/components/toaster/toast-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function useRecoveryPasswordForm() {
	const router = useRouter();
	const [token] = useQueryState("token", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const form = useForm<RecoveryPasswordFormProps>({
		values: {
			confirmPassword: "",
			password: "",
		},
		resolver: zodResolver(recoveryPasswordSchema),
		mode: "onSubmit",
	});
	async function onSubmit(data: RecoveryPasswordFormProps) {
		const password = recoveryPasswordFacadeFactory(token ?? "");
		try {
			await password.update(data);
			router.push("/signin");
		} catch {
			toastError({ tittle: "error" });
		}
	}
	const password = form.watch("password");
	const confirmPassword = form.watch("confirmPassword");

	const isSamePassword = password !== confirmPassword || !password || !confirmPassword;
	useEffect(() => {
		if (password !== confirmPassword) {
			form.setError("confirmPassword", { message: "", type: "" });
			return;
		}
		form.trigger("confirmPassword");
	}, [password, confirmPassword, form]);

	// useEffect(() => {
	// if (!token) return router.push("/signin");
	// const decodedToken = decodeJWT<{ email: string }>(token);
	// if (!decodedToken?.email) return router.push("/signin");
	// }, []);
	return {
		form,
		onSubmit,
		isSamePassword,
	};
}
