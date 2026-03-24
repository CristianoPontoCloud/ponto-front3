"use client";
import { CardCheckbox } from "@/view/components/card-checkbox/card-checkbox";
import { RecoveryPasswordForm } from "@/view/components/forms/forget-password-form/recovery-password-form/recovery-password-form";
import { Button } from "@/view/components/ui/button";
import { ForgetPasswordLayout } from "@/view/layouts/foget-password-layout";
import { useForgetPasswordPage } from "./use-forget-password-page";

export function ForgetPasswordPage() {
	const {
		navigateToLoginPage,
		method,
		setMethod,
		isNavigate,
		setIsNavigate,
		recoveryMethods,
		token,
	} = useForgetPasswordPage();

	if (token) return <RecoveryPasswordForm />;

	if (method && isNavigate) {
		return recoveryMethods[method];
	}

	return (
		<ForgetPasswordLayout description="Selicione abaixo o método desejado para redefinir sua senha">
			<div className="w-full flex flex-col justify-center items-center gap-6">
				<CardCheckbox
					className="w-full"
					checked={method === "email"}
					onClick={() => setMethod("email")}
					title="E-mail"
					description="Receba um email de redefinição"
				/>
				<CardCheckbox
					className="w-full"
					checked={method === "phone"}
					onClick={() => setMethod("phone")}
					title="Telefone"
					description="Receba um código de verificação"
				/>
				<div className="w-full flex flex-col gap-2">
					<Button
						type="button"
						className="w-full"
						disabled={method === ""}
						onClick={() => {
							setIsNavigate(true);
						}}
					>
						Avançar
					</Button>
					<Button
						type="button"
						variant="outline"
						className="w-full"
						onClick={() => navigateToLoginPage()}
					>
						Voltar para o login
					</Button>
				</div>
			</div>
		</ForgetPasswordLayout>
	);
}
