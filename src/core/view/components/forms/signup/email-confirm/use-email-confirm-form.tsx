"use client";
import { signupFacadeFactory } from "@/application/factories/enrollment/signup-facade-factory";
import { signupConfirmEmailSchema } from "@/application/validation/forms/signup-schema";
import type { SignupEmailConfirmFormProps } from "@/domain/authentication/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export function useSignupEmailConfirmForm() {
	const form = useForm<SignupEmailConfirmFormProps>({
		resolver: zodResolver(signupConfirmEmailSchema),
		values: { email: "" },
		mode: "onSubmit",
	});
	const signupFacade = useMemo(() => signupFacadeFactory(), []);

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
	function resetForm() {
		form.reset();
		setIsActive(false);
		setSeconds(60);
	}
	async function onSubmit(data: SignupEmailConfirmFormProps) {
		const response = await signupFacade.emailCofirm(data);
		setEmail(response?.data.email ?? "");
		resetTimer();
	}

	return { form, onSubmit, startTimer, timeParsed, resetTimer, email, resetForm, seconds };
}
