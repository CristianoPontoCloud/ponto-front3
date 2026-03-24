import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { useContextExportFieldsAndEventsProvider } from "../../providers/export-fields-and-events-provider";
import type { ExportEventCardParams } from "./export-event-card";

export function ExportEventCardContent({ index }: ExportEventCardParams) {
	const { form } = useContextExportFieldsAndEventsProvider();

	const widht1 = "w-1/3";

	return (
		<div className="w-full flex gap-3 w-">
			<InputForm
				form={form}
				label="Código"
				placeholder="0"
				onlyNumbers
				classNames={{ formItem: "w-[80px]" }}
				formFieldName={`events.${index}.code`}
			/>
			<SelectForm
				form={form}
				label="Preenchimento"
				placeholder="Selecione"
				datas={[
					{ label: "Zeros", value: "ZEROS" },
					{ label: "Espaços", value: "SPACES" },
					{ label: "Traços", value: "TRAITS" },
				]}
				classNames={{ formItem: widht1 }}
				formFieldName={`events.${index}.fill`}
			/>
			<SelectForm
				form={form}
				label="Alinhamento"
				placeholder="Selecione"
				datas={[
					{ label: "Esquerda", value: "LEFT" },
					{ label: "direita", value: "RIGHT" },
				]}
				classNames={{ formItem: widht1 }}
				formFieldName={`events.${index}.align`}
			/>
			<InputForm
				onlyNumbers
				form={form}
				label="Decimais"
				placeholder="0"
				classNames={{ formItem: widht1 }}
				formFieldName={`events.${index}.decimals`}
			/>
		</div>
	);
}
