import type { SignupFormProps } from "@/domain/authentication/signup";
import { useFormContext } from "react-hook-form";
import { PasswordInputForm } from "../../formfields/password-input-form-field";
import { PasswordStrengthChecker } from "../../password-strength-checker/password-strength-checker";

export function SignupCreatePasswordForm() {
	const form = useFormContext<SignupFormProps>();

	return (
		<>
			<PasswordInputForm
				inputParams={{
					form,
					formFieldName: "password",
					label: "Nova senha",
					placeholder: "Insira sua nova senha",
				}}
				className="w-full"
			/>
			<PasswordInputForm
				inputParams={{
					form,
					formFieldName: "confirmPassword",
					label: "Confirm a senha",
					placeholder: "Confirme sua nova senha",
				}}
				className="w-full"
			/>
			<div className="text-left">
				<PasswordStrengthChecker password={form.watch("password")} />
			</div>
		</>
	);
}
