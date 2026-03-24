"use client";
import LoadingButton from "../../buttons/loading-button";
import { CheckboxForm } from "../../formfields/checkbox-form";
import { GridForm } from "../../formfields/grid-from";
import { InputForm } from "../../formfields/input-form-field";
import { PasswordInputForm } from "../../formfields/password-input-form-field";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import { useSigninForm } from "./use-signin-form";
export function SigninForm() {
	const { form, onSubmit, navigateToForgetPasswordPage } = useSigninForm();
	const fullspan = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2";

	return (
		<Form {...form}>
			<form className="w-[320px]" onSubmit={form.handleSubmit(onSubmit)}>
				<GridForm className="m-0 gap-6">
					<InputForm
						form={form}
						formFieldName="identifier"
						label="Identificação"
						placeholder="Insira seu CPF, celular ou e-mail"
						classNames={{ formItem: fullspan }}
					/>
					<GridForm className="m-0 gap-3 col-span-2">
						<PasswordInputForm
							inputParams={{
								form,
								formFieldName: "password",
								label: "Senha",
								placeholder: "Insira sua senha",
								HeadGenericComponent: (
									<Button
										variant="link"
										type="button"
										onClick={() => navigateToForgetPasswordPage()}
										className="p-0 h-fit underline text-muted-foreground"
									>
										Esqueceu sua senha?
									</Button>
								),
							}}
							className="col-span-2"
						/>
						<CheckboxForm
							form={form}
							label="Mantenha-me conectado"
							formFieldName="stayConnected"
							classNameFormItem={fullspan}
						/>
					</GridForm>
					<LoadingButton
						className={fullspan}
						disabled={
							!form.formState.isValid ||
							form.formState.isSubmitting ||
							form.formState.isSubmitSuccessful
						}
						isLoading={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
						loadingCustomMessage={
							form.formState.isSubmitSuccessful ? "Redirecionando..." : "Acessando..."
						}
					>
						Acessar
					</LoadingButton>
				</GridForm>
			</form>
		</Form>
	);
}
