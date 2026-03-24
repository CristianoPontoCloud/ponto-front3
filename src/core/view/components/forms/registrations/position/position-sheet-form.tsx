import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Trash } from "lucide-react";
import { InputForm } from "../../../formfields/input-form-field";
import { usePositionSheetForm } from "./use-position-sheet-form";

export default function PositionSheetForm(params: SheetFormProps) {
	const { form, handleSubmit, onSubmit, openModalExlcudePosition, id } =
		usePositionSheetForm(params);

	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudePosition()}
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
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(onSubmit)(e);
			}}
			className="h-full flex flex-col justify-between px-1"
		>
			<InputForm
				form={form}
				formFieldName="name"
				label="Nome"
				placeholder="Digite o nome do cargo"
				required
			/>
			<SheetFooterSubmit onCancel={params.closeSheet} LeftChild={<LeftChild />} />
		</form>
	);
}
