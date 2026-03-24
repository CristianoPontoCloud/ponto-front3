import type { ExportLayoutFormProps } from "@/domain/entities/exports/exports";
import { useFormContext } from "react-hook-form";
import { CheckboxForm } from "../../../formfields/checkbox-form";
import { InputForm } from "../../../formfields/input-form-field";
import SelectForm from "../../../formfields/select-form";
import { DashedSeparator } from "../../../ui/dashed-separator";

export function ExportConfigs() {
	const form = useFormContext<ExportLayoutFormProps>();
	const fullspan = "w-full ";
	return (
		<div className="flex flex-col gap-5 p-4 rounded-lg border w-[320px] h-full">
			<h3 className={`text-sm  ${fullspan}`}>Configurações</h3>
			<InputForm
				form={form}
				formFieldName="name"
				classNames={{ formItem: fullspan }}
				label="Nome do layout"
				placeholder="Informe o nome"
				required
			/>
			<InputForm
				form={form}
				formFieldName="footer"
				classNames={{ formItem: fullspan }}
				label="Rodapé"
				placeholder="informe o rodapé"
			/>
			<InputForm
				form={form}
				formFieldName="header"
				classNames={{ formItem: fullspan }}
				label="Cabeçalho"
				placeholder="informe o cabeçalho"
			/>
			<DashedSeparator />
			<SelectForm
				form={form}
				formFieldName="separatedFields"
				classNames={{ formItem: fullspan }}
				label="Separador entre campos"
				placeholder="Selecione"
				datas={[
					{
						label: "Sem espaço",
						value: "1",
					},
				]}
			/>
			<SelectForm
				form={form}
				formFieldName="separatedDecimal"
				classNames={{ formItem: fullspan }}
				label="Separador decimal"
				placeholder="Selecione"
				datas={[
					{
						label: "Sem separador",
						value: "1",
					},
				]}
			/>
			<DashedSeparator />
			<SelectForm
				form={form}
				formFieldName="reportType"
				classNames={{ formItem: fullspan }}
				label="Tipo de relatório"
				placeholder="Selecione"
				datas={[
					{
						label: "Um evento por linha",
						value: "1",
					},
				]}
			/>
			<SelectForm
				form={form}
				formFieldName="hourFormated"
				classNames={{ formItem: fullspan }}
				label="Formato de horas"
				placeholder="Selecione"
				datas={[
					{
						label: "Sexagesimal",
						value: "1",
					},
				]}
			/>
			<DashedSeparator />
			<span>Múltiplicador</span>
			<CheckboxForm form={form} formFieldName="extraFactor" label="Fator extra" />
			<CheckboxForm form={form} formFieldName="nightFactor" label="Fator noturno" />
		</div>
	);
}
