"use client";
import { InputForm } from "@/view/components/formfields/input-form-field";
import { Button } from "@/view/components/ui/button";
import { SignupEmailConfirmLayout } from "@/view/layouts/signup-email-confirm-layout";
import { Mail } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useSignupEmailConfirmForm } from "./use-email-confirm-form";

export function SignupEmailConfirmForm() {
	const { form, onSubmit, timeParsed, email, resetForm, seconds } = useSignupEmailConfirmForm();
	if (form.formState.isSubmitSuccessful) {
		return (
			<SignupEmailConfirmLayout
				header={
					<div className="w-full flex flex-col justify-center items-center gap-2">
						<h1 className="text-2xl font-bold">E-mail enviado</h1>
						<span className="text-muted-foreground text-center">
							Verifique sua caixa de entrada para
							<br />
							obter o link de cadastro
						</span>
						<span className="text-muted-foreground text-center font-semibold">{email}</span>
					</div>
				}
			>
				{timeParsed()}
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 justify-center">
						<Button
							variant="secondary"
							type="button"
							className="w-full"
							onClick={() => resetForm()}
						>
							Atualizar e-mail
						</Button>
						<Button variant="secondary" type="submit" className="w-full" disabled={seconds > 0}>
							Reenviar
						</Button>
					</form>
				</FormProvider>
			</SignupEmailConfirmLayout>
		);
	}
	return (
		<SignupEmailConfirmLayout
			header={
				<>
					<h1 className="text-2xl font-semibold">Bem-vindo!</h1>
					<span className="text-muted-foreground">Insira seu e-mail abaixo para se cadastrar</span>
				</>
			}
		>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
					<InputForm
						form={form}
						formFieldName="email"
						placeholder="Digite seu e-mail"
						classNames={{ input: "pl-[40px]" }}
						OutsideLeftChild={() => <Mail className="w-4 h-4 absolute left-[12px]" />}
					/>
					<Button className="w-full" disabled={!form.formState.isValid}>
						Inscreva-se
					</Button>
				</form>
			</FormProvider>
		</SignupEmailConfirmLayout>
	);
}
