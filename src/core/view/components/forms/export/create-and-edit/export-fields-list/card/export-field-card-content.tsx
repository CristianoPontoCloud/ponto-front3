import { ExportFieldsEnum } from "@/domain/entities/exports/exports-fields";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { useContextExportFieldsAndEventsProvider } from "../../providers/export-fields-and-events-provider";
import type { ExportFieldCardParams } from "./export-field-card";

export function ExportFieldCardContent({ fieldParams: { type }, index }: ExportFieldCardParams) {
	const { form } = useContextExportFieldsAndEventsProvider();
	const datas = Array.from({ length: 10 }).map((_, index) => ({
		label: (index + 1).toString(),
		value: (index + 1).toString(),
	}));
	const widht1 = "w-1/6";
	const widht2 = "w-2/6";
	const widht3 = "w-3/6";

	// function isSequencial(field: ExportFields): field is ExportFieldDecimal {
	// 	return "decimalPlaces" in field;
	// }

	// function isStartDate(field: ExportFields): field is ExportFieldDate {
	// 	return "startDate" in field;
	// }

	// function isFixedText(field: ExportFields): field is ExportFieldText {
	// 	return "text" in field;
	// }
	function DefaultFields() {
		return (
			<>
				<SelectForm
					form={form}
					label="Tamanho"
					placeholder="0"
					datas={datas}
					classNames={{ formItem: widht1 }}
					formFieldName={`fields.${index}.size`}
				/>
				<SelectForm
					form={form}
					label="Pos. inicial"
					placeholder="0"
					datas={datas}
					classNames={{ formItem: widht1 }}
					formFieldName={`fields.${index}.startPosition`}
				/>
				<SelectForm
					form={form}
					label="Pos. final"
					placeholder="0"
					datas={datas}
					classNames={{ formItem: widht1 }}
					formFieldName={`fields.${index}.endPosition`}
				/>
			</>
		);
	}
	function FillAndAlignFields() {
		return (
			<>
				<SelectForm
					form={form}
					datas={[
						{ label: "Zeros", value: "ZEROS" },
						{ label: "Espaços", value: "SPACES" },
						{ label: "Traços", value: "TRAITS" },
					]}
					label="Preenchimento"
					placeholder="selecione"
					classNames={{ formItem: widht2 }}
					formFieldName={`fields.${index}.fill`}
				/>
				<SelectForm
					form={form}
					label="Alinhamento"
					placeholder="selecione"
					datas={[
						{ label: "Esquerda", value: "LEFT" },
						{ label: "direita", value: "RIGHT" },
					]}
					classNames={{ formItem: widht2 }}
					formFieldName={`fields.${index}.align`}
				/>
			</>
		);
	}
	if (type === ExportFieldsEnum.DECIMAL) {
		return (
			<div className="w-full flex gap-3">
				<DefaultFields />
				<FillAndAlignFields />
				<InputForm
					form={form}
					label="Casas decimais"
					placeholder="0"
					onlyNumbers
					classNames={{ formItem: widht2 }}
					formFieldName={`fields.${index}.decimalPlaces`}
				/>
			</div>
		);
	}
	if (type === ExportFieldsEnum.DATE) {
		return (
			<div className="w-full flex gap-3">
				<DefaultFields />
				<FillAndAlignFields />
				<SelectForm
					form={form}
					label="Formato"
					placeholder="selecione"
					datas={[
						{ label: "ddmmaa", value: "ddmmaa" },
						{ label: "ddmmaaaa", value: "ddmmaaaa" },
						{ label: "aaaamm", value: "aaaamm" },
						{ label: "mmaaaa", value: "mmaaaa" },
						{ label: "aaaammdd", value: "aaaammdd" },
						{ label: "mm", value: "mm" },
						{ label: "aaaa", value: "aaaa" },
						{ label: "aaaa-mm-dd", value: "aaaa-mm-dd" },
						{ label: "dd/mm/aaaa", value: "dd/mm/aaaa" },
						{ label: "dd/mm/aa", value: "dd/mm/aa" },
					]}
					classNames={{ formItem: widht2 }}
					formFieldName={`fields.${index}.format`}
				/>
			</div>
		);
	}
	if (type === ExportFieldsEnum.TEXT) {
		return (
			<div className="w-full flex gap-3">
				<DefaultFields />
				<FillAndAlignFields />
				<InputForm
					form={form}
					label="Texto"
					placeholder="Digite aqui"
					classNames={{ formItem: widht3 }}
					formFieldName={`fields.${index}.text`}
				/>
			</div>
		);
	}
	if (type === ExportFieldsEnum.DEFAULT) {
		return (
			<div className="w-full flex gap-3">
				<DefaultFields />
				<FillAndAlignFields />
			</div>
		);
	}
}
