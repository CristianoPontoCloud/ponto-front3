import { recoveryPasswordFacadeFactory } from "@/application/factories/enrollment/recovery-password-facade-factory";
import { recoveryPasswordWithEmailSchema } from "@/application/validation/forms/recovery-password";
import type { RecoveryPasswordWithEmailFormProps } from "@/domain/authentication/recovery-password";
import { toastError } from "@/view/components/toaster/toast-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export function useRecoveryPasswordWithEmailForm() {
	const form = useForm<RecoveryPasswordWithEmailFormProps>({
		resolver: zodResolver(recoveryPasswordWithEmailSchema),
		mode: "onSubmit",
	});
	const recoveryPasswordMethod = useMemo(() => recoveryPasswordFacadeFactory(), []);
	const [email, setEmail] = useState<string>("");
	const [seconds, setSeconds] = useState(60);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isActive && seconds > 0) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}, 1000);
		}

		if (seconds === 0) {
			setIsActive(false);
		}

		return () => clearInterval(interval);
	}, [isActive, seconds]);

	const startTimer = () => {
		setIsActive(true);
	};

	function timeParsed() {
		const min = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const sec = String(seconds % 60).padStart(2, "0");
		return `${min}:${sec}`;
	}

	const resetTimer = () => {
		setIsActive(true);
		setSeconds(60);
	};
	async function onSubmit(data: RecoveryPasswordWithEmailFormProps) {
		try {
			const response = await recoveryPasswordMethod.email(data);
			if (!response) {
				throw new Error("error");
			}
			setEmail(data.email);
			startTimer();
		} catch (error) {
			toastError({
				tittle: "error",
			});
			throw error;
		}
	}
	function resetForm() {
		form.reset();
		setIsActive(false);
		setSeconds(60);
	}

	return { form, onSubmit, timeParsed, email, seconds, resetTimer, resetForm };
}
