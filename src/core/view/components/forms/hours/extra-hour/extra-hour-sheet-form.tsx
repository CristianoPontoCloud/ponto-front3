import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Trash } from "lucide-react";
import { useRef } from "react";
import { FormProvider } from "react-hook-form";
import { ExtraHourGrid } from "./rules-grid/extra-hour-grid";
import { SheetRulesManager } from "./rules-manager-form/rules-manager";
import useExtraHourSheetForm from "./use-extra-hour-sheet-form";

export function ExtraHourLayoutSheetForm(params: SheetFormProps) {
	const { handleSubmit, methods, onSubmit, bracketsGridController, openModalExlcudeExtraHour, id } =
		useExtraHourSheetForm(params);
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeExtraHour()}
					>
						<Trash className="text-red-500" />
					</Button>
				)}
				<SelectStatusForm
					formFieldName="status"
					form={methods}
					classNames={{
						formItem: "w-fit",
					}}
				/>
			</div>
		);
	}
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				data-testid="form-extra-hour"
				className="h-full flex flex-col gap-4 px-1"
			>
				<GridForm className="my-0" gridCol="12">
					<InputForm
						form={methods}
						formFieldName="name"
						label="Nome"
						placeholder="Digite o nome da hora extra"
						required
						classNames={{
							formItem: "col-span-6 sm:col-span-6 md:col-span-10 lg:col-span-10 ",
						}}
					/>

					<div
						className="flex items-end h-full w-full col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2"
						ref={headerRef}
					>
						<SheetRulesManager controller={bracketsGridController} />
					</div>
				</GridForm>

				<ExtraHourGrid form={methods} actions={bracketsGridController} height={height - 90} />

				<SheetFooterSubmit LeftChild={<LeftChild />} />
			</form>
		</FormProvider>
	);
}
