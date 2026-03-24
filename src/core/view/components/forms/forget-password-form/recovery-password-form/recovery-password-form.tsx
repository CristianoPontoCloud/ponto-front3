import { PasswordInputForm } from "@/view/components/formfields/password-input-form-field";
import { PasswordStrengthChecker } from "@/view/components/password-strength-checker/password-strength-checker";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { LockOpen } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useRecoveryPasswordForm } from "./use-recovery-password-form";

export function RecoveryPasswordForm() {
	const { form, onSubmit, isSamePassword } = useRecoveryPasswordForm();
	return (
		<FormProvider {...form}>
			<div className="w-[320px] flex flex-col justify-center items-center gap-6">
				<div className="bg-primary/15 w-[48px] h-[48px] rounded-lg flex justify-center items-center">
					<LockOpen className="text-primary" />
				</div>
				<h1 className="text-2xl">Nova senha</h1>
				<span className="text-muted-foreground text-center">
					Preencha os campos abaixo
					<br />
					definir uma nova senha de acesso
				</span>
				<Separator orientation="horizontal" />
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full flex flex-col items-center gap-6"
				>
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
					<PasswordStrengthChecker password={form.watch("password")} />
					<Button className="w-full" type="submit" disabled={isSamePassword}>
						Redefinir senha
					</Button>
				</form>
				<Separator orientation="horizontal" />
				<div>
					Precisando de ajuda?{" "}
					<Button className="underline text-primary p-0" variant="link">
						Fale com o suporte
					</Button>
				</div>
			</div>
		</FormProvider>
	);
}
