import { PhoneInputForm } from "@/view/components/formfields/phone-input-form-field";
import { ForgetPasswordLayout } from "@/view/layouts/foget-password-layout";
import { PhoneCall } from "lucide-react";
import { Button } from "../../../ui/button";
import { Form } from "../../../ui/form";
import { ConfirmationCodeSmsForm } from "./confirmation-form";
import { useRecoveryPasswordWithPhoneForm } from "./use-recovery-password-with-phone-form";
interface RecoveryPasswordWithPhoneFormParams {
	resetRecoveryMethod: VoidFunction;
}
export function RecoveryPasswordWithPhoneForm({
	resetRecoveryMethod,
}: RecoveryPasswordWithPhoneFormParams) {
	const { form, onSubmit, timeParsed, phone, resetTimer, seconds, resetForm } =
		useRecoveryPasswordWithPhoneForm();
	if (form.formState.isSubmitSuccessful) {
		return (
			<ConfirmationCodeSmsForm
				phone={phone}
				resetRecoveryPhoneForm={resetForm}
				resetTimer={resetTimer}
				seconds={seconds}
				timeParsed={timeParsed()}
			/>
		);
	}
	return (
		<ForgetPasswordLayout description="Insira seu telefone abaixo para receber o código de verificação">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
					<PhoneInputForm
						form={form}
						formFieldName="phone"
						label="Telefone"
						className="w-full"
						placeholder="Insira seu telefone"
						classNames={{
							input: "pl-[40px]",
						}}
						OutsideRightChild={() => (
							<PhoneCall className="w-4 h-4 absolute left-3 hover:bg-transparent" />
						)}
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
