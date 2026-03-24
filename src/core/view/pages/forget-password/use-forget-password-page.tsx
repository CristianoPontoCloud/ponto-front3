"use client";
import { RecoveryPasswordWithEmailForm } from "@/view/components/forms/forget-password-form/recovery-with-email/recovery-password-with-email-form";
import { RecoveryPasswordWithPhoneForm } from "@/view/components/forms/forget-password-form/recovery-with-phone/recovery-password-with-phone-form";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";

export function useForgetPasswordPage() {
	const [method, setMethod] = useState<"email" | "phone" | "">("");
	const [token] = useQueryState("token", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const router = useRouter();
	const [isNavigate, setIsNavigate] = useState<boolean>(false);
	function reset() {
		setMethod("");
		setIsNavigate(false);
	}

	const recoveryMethods = {
		email: <RecoveryPasswordWithEmailForm resetRecoveryMethod={() => reset()} />,
		phone: <RecoveryPasswordWithPhoneForm resetRecoveryMethod={() => reset()} />,
	};
	function navigateToLoginPage() {
		router.push("/login");
	}

	return {
		method,
		setMethod,
		recoveryMethods,
		isNavigate,
		navigateToLoginPage,
		setIsNavigate,
		token,
	};
}
