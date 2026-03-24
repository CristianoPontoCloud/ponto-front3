import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { requestComputeAsMap, requestTypeMap } from "@/domain/entities/request";
import { CheckboxForm } from "@/view/components/formfields/checkbox-form";
import SelectForm from "@/view/components/formfields/select-form";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { Trash } from "lucide-react";
import { InputForm } from "../../../formfields/input-form-field";
import { Form } from "../../../ui/form";
import { useRequestSheetForm } from "./use-request-sheet-form";

export default function RequestSheetForm(values: SheetFormProps) {
	const { form, handleSubmit, onSubmit, id, openModalExlcudeRequest } = useRequestSheetForm(values);
	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeRequest()}
					>
						<Trash className="text-red-500" />
					</Button>
				)}
				<SelectStatusForm
					formFieldName="status"
					form={form}
					classNames={{
						formItem: "w-fit",
					}}
				/>
			</div>
		);
	}
	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full ">
				<div className="flex flex-col gap-4">
					<InputForm
						form={form}
						formFieldName="name"
						label="Nome"
						placeholder="Digite o nome da solicitação"
						required
					/>
					<InputForm
						form={form}
						formFieldName="abbreviation"
						label="Abreviação"
						placeholder="Digite a abreviação"
						required
					/>
					<SelectForm
						form={form}
						formFieldName="type"
						label="Tipo"
						placeholder="Selecione o tipo"
						datas={requestTypeMap}
						required
					/>
					<SelectForm
						form={form}
						formFieldName="computeAs"
						label="Computa como"
						placeholder="Selecione"
						datas={requestComputeAsMap}
						required
					/>
					<div className="flex flex-wrap gap-4 items-center w-full">
						<CheckboxForm form={form} formFieldName="discountDSR" label="Desconta DSR" />
						<Separator orientation="vertical" className="h-6 w-[1px]" />
						<CheckboxForm
							form={form}
							formFieldName="makeAvailableCollaborator"
							label="Disponibilizar para o colaborador"
						/>
					</div>
				</div>
				<SheetFooterSubmit LeftChild={<LeftChild />} />
			</form>
		</Form>
	);
}
