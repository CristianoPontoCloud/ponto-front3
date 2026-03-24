import { Separator } from "@/view/components/ui/separator";
import { ForgetPasswordLayout } from "@/view/layouts/foget-password-layout";
import { MailOpen } from "lucide-react";
import { InputForm } from "../../../formfields/input-form-field";
import { Button } from "../../../ui/button";
import { Form } from "../../../ui/form";
import { useRecoveryPasswordWithEmailForm } from "./use-recovery-password-with-email-form";
interface RecoveryPasswordWithEmailFormParams {
	resetRecoveryMethod: VoidFunction;
}
export function RecoveryPasswordWithEmailForm({
	resetRecoveryMethod,
}: RecoveryPasswordWithEmailFormParams) {
	const { form, onSubmit, timeParsed, email, resetTimer, seconds, resetForm } =
		useRecoveryPasswordWithEmailForm();
	if (form.formState.isSubmitSuccessful) {
		return (
			<div className="w-[320px] flex flex-col justify-center items-center gap-6">
				<div className="bg-primary/15 w-[48px] h-[48px] rounded-lg flex justify-center items-center">
					<MailOpen className="text-primary" />
				</div>
				<h1 className="text-2xl">Cheque seu e-mail</h1>
				<span className="text-muted-foreground text-center">
					Siga as instruções enviadas ao e-mail informado para redefinir sua senha
					<br />
					<span className="text-muted-foreground text-center font-semibold">{email}</span>
				</span>
				<Separator orientation="horizontal" />
				{timeParsed()}

				<Separator orientation="horizontal" />
				<span className="text-muted-foreground text-center">
					Ainda não recebeu o e-mail de recuperação?
					<br />
					Verifique sua caixa de entrada ou spam.
				</span>
				<div className="flex gap-2">
					<Button variant="link" className="p-0" type="button" onClick={() => resetForm()}>
						Atualizar e-mail
					</Button>
					<Button
						variant="link"
						className="p-0"
						type="button"
						disabled={seconds > 0}
						onClick={() => resetTimer()}
					>
						Reenviar
					</Button>
				</div>
				<Separator orientation="horizontal" />
				<div>
					Precisando de ajuda?{" "}
					<Button className="underline text-primary p-0" variant="link" type="button">
						Fale com o suporte
					</Button>
				</div>
			</div>
		);
	}
	return (
		<ForgetPasswordLayout description="Insira seu e-mail abaixo para redefinir sua senha">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
					<InputForm
						form={form}
						formFieldName="email"
						label="E-mail"
						className="w-full"
						placeholder="Insira seu email"
					/>
					<div className="w-full flex flex-col gap-2">
						<Button className="w-full" disabled={!form.formState.isValid}>
							Enviar
						</Button>
						<Button
							className="w-full"
							variant="outline"
							type="button"
							onClick={() => resetRecoveryMethod()}
						>
							Voltar
						</Button>
					</div>
				</form>
			</Form>
		</ForgetPasswordLayout>
	);
}
