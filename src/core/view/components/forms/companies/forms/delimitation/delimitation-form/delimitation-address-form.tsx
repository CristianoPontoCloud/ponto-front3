import { states } from "@/domain/data/state";
import { CepInputForm } from "@/view/components/formfields/cep-input-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { useDelimitationProvider } from "../delimitation-provider/delimitation-provider";

export function DelimitationAddressForm() {
	const { delimitationForm } = useDelimitationProvider();
	return (
		<div className="flex flex-col gap-4 w-full">
			<GridForm className="m-0" gridCol="12">
				<CepInputForm
					form={delimitationForm}
					label="CEP"
					formFieldName="zip"
					required
					placeholder="CEP"
					classNames={{
						formItem: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-3 xl:col-span-3",
					}}
					onlyNumbers
				/>
				<InputForm
					form={delimitationForm}
					label="Rua"
					formFieldName="street"
					required
					classNames={{
						formItem: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9  xl:col-span-9",
					}}
					placeholder="Informe a rua"
				/>
				<InputForm
					form={delimitationForm}
					label="Número"
					formFieldName="code"
					placeholder="Número"
					onlyNumbers
					classNames={{
						formItem: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-3 xl:col-span-3",
					}}
				/>
				<InputForm
					form={delimitationForm}
					label="Bairro"
					formFieldName="neighborhood"
					classNames={{
						formItem: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9  xl:col-span-9",
					}}
					required
					placeholder="Informe o bairro"
				/>
				<InputForm
					form={delimitationForm}
					label="Cidade"
					formFieldName="city"
					placeholder="Informe a cidade"
					required
					classNames={{
						formItem: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-8  xl:col-span-8",
					}}
				/>
				<SelectForm
					form={delimitationForm}
					label="Estado"
					formFieldName="state"
					placeholder="Selecione"
					required
					datas={states}
					classNames={{
						formItem: "col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4",
					}}
				/>
			</GridForm>
		</div>
	);
}
