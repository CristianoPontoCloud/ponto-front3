import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { InputForm } from "@/view/components//formfields/input-form-field";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Trash } from "lucide-react";
import { useCostCenterSheetForm } from "./use-cost-center-sheet-form";

export default function CostCenterSheetForm(params: SheetFormProps) {
	const { form, handleSubmit, onSubmit, openModalExlcudeCostCenter, id } =
		useCostCenterSheetForm(params);
	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeCostCenter()}
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
		// <Form {...form}>
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(onSubmit)(e);
			}}
			className="h-full flex flex-col justify-between p-[2px]"
		>
			<div className="flex flex-col gap-4">
				<InputForm
					form={form}
					formFieldName="name"
					label="Nome"
					placeholder="Digite o nome do centro de custo"
					required
				/>
			</div>
			<SheetFooterSubmit onCancel={params.closeSheet} LeftChild={<LeftChild />} />
		</form>
		// </Form>
	);
}
