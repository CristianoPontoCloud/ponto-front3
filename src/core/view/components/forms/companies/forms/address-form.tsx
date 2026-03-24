import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { states } from "@/domain/data/state";
import type { CompanyFormProps } from "@/domain/entities/companies";
import { CepInputForm } from "@/view/components/formfields/cep-input-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { Label } from "@/view/components/ui/label";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export function CompaniesAddressForm() {
	const form = useFormContext<CompanyFormProps>();
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);

	return (
		<ScrollArea
			className="p-1 mr-2"
			data-testid="form-company-address"
			ref={ref}
			tabIndex={-1}
			style={{ height: height - 60 }}
		>
			<GridForm className="mt-0" gridCol="4">
				<Label className="text-muted-foreground text-sm col-span-full">Endereço da empresa</Label>
				<CepInputForm
					form={form}
					label="CEP"
					formFieldName="zip"
					placeholder="CEP"
					classNames={{
						formItem: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1",
					}}
					required
					onlyNumbers
				/>
				<InputForm
					form={form}
					label="Rua"
					formFieldName="street"
					placeholder="Informe a rua"
					classNames={{
						formItem: "col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3",
					}}
					required
				/>

				<InputForm
					form={form}
					label="Número"
					formFieldName="number"
					placeholder="Número"
					onlyNumbers
					classNames={{
						formItem: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1",
					}}
				/>
				<InputForm
					form={form}
					label="Bairro"
					formFieldName="neighborhood"
					classNames={{
						formItem: "col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3",
					}}
					placeholder="Informe o bairro"
					required
				/>
				<InputForm
					form={form}
					label="Cidade"
					formFieldName="city"
					placeholder="Informe a cidade"
					required
					classNames={{
						formItem: "col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3",
					}}
				/>
				<SelectForm
					form={form}
					label="Estado"
					formFieldName="state"
					placeholder="Selecione"
					required
					datas={states}
					classNames={{
						formItem: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl-1",
					}}
				/>
				<TextAreaForm
					form={form}
					label="Complemento"
					formFieldName="complement"
					placeholder="Informe o complemento"
					classNames={{
						formItem: "col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4",
					}}
				/>
			</GridForm>
		</ScrollArea>
	);
}
