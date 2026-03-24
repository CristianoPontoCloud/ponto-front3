import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { dismissalApplicantMap } from "@/domain/entities/dismissal";
import SelectForm from "@/view/components/formfields/select-form";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Trash } from "lucide-react";
import { InputForm } from "../../../formfields/input-form-field";
import { Form } from "../../../ui/form";
import { useDismissalSheetForm } from "./use-dismissal-sheet-form";

export default function DismissalSheetForm(params: SheetFormProps) {
	const { form, handleSubmit, onSubmit, id, openModalExlcudeDismissal } =
		useDismissalSheetForm(params);
	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeDismissal()}
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
			<form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between px-1">
				<div className="flex flex-col gap-4">
					<InputForm
						form={form}
						formFieldName="name"
						label="Motivo"
						placeholder="Digite o motivo de demissão"
						required
					/>
					<SelectForm
						form={form}
						formFieldName="applicant"
						label="Solicitante"
						placeholder="Selecione o solicitante"
						required
						datas={dismissalApplicantMap}
					/>
				</div>
				<SheetFooterSubmit onCancel={params.closeSheet} LeftChild={<LeftChild />} />
			</form>
		</Form>
	);
}
