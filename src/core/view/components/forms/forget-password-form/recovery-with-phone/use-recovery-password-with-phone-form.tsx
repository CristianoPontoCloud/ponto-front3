import {
	confirmationSmsCodeSchema,
	recoveryPasswordWithPhoneSchema,
} from "@/application/validation/forms/recovery-password";
import type {
	ConfirmationSmsCodeFormProps,
	RecoveryPasswordWithPhoneFormProps,
} from "@/domain/authentication/recovery-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useRecoveryPasswordWithPhoneForm() {
	const form = useForm<RecoveryPasswordWithPhoneFormProps>({
		resolver: zodResolver(recoveryPasswordWithPhoneSchema),
		mode: "onSubmit",
	});
	const confirmationForm = useForm<ConfirmationSmsCodeFormProps>({
		resolver: zodResolver(confirmationSmsCodeSchema),
		mode: "onSubmit",
	});
	const [phone, setPhone] = useState<string>("");
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
	async function onSubmit(data: RecoveryPasswordWithPhoneFormProps) {
		setPhone(data.phone);
		startTimer();
	}
	function resetForm() {
		form.reset();
		setIsActive(false);
		setSeconds(60);
	}

	return { form, onSubmit, timeParsed, phone, seconds, resetTimer, resetForm, confirmationForm };
}
