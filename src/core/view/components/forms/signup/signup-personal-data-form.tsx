import type { SignupFormProps } from "@/domain/authentication/signup";
import { useFormContext } from "react-hook-form";
import { InputForm } from "../../formfields/input-form-field";
import { PhoneInputForm } from "../../formfields/phone-input-form-field";
import SelectForm from "../../formfields/select-form";

export function SignupPersonalDataForm() {
	const form = useFormContext<SignupFormProps>();
	return (
		<>
			<InputForm form={form} formFieldName="firstName" placeholder="Digite seu nome" label="Nome" />
			<InputForm
				form={form}
				formFieldName="lastName"
				placeholder="Digite seu sobrenome"
				label="Sobrenome"
			/>
			<PhoneInputForm
				form={form}
				formFieldName="phone"
				placeholder="Digite seu telefone"
				label="Telefone"
			/>
			<SelectForm
				form={form}
				formFieldName="positionId"
				placeholder="Selecione seu cargo"
				label="Cargo"
				endpoint="position/findAllPreBuilt"
			/>
		</>
	);
}
