import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { GridForm } from "@/view/components/formfields/grid-from";
import { IpInputForm } from "@/view/components/formfields/ip-input-form-field";
import { PortIpInputForm } from "@/view/components/formfields/port-ip-input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Trash } from "lucide-react";
import { InputForm } from "../../../formfields/input-form-field";
import { Form } from "../../../ui/form";
import { useEquimentSheetForm } from "./use-equiment-sheet-form";

export default function EquimentSheetForm(params: SheetFormProps) {
	const { form, handleSubmit, onSubmit, id, openModalExlcudeEquipment, markId } =
		useEquimentSheetForm(params);
	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeEquipment()}
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
			<form onSubmit={handleSubmit(onSubmit)} className="h-full">
				<GridForm className="mt-0 mb-0">
					<InputForm
						form={form}
						formFieldName="name"
						label="Nome"
						placeholder="Digite o nome do equipamento"
						classNames={{
							formItem: "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2",
						}}
						required
					/>
					<SelectForm
						endpoint="equipment-mark"
						form={form}
						formFieldName="markId"
						label="Marca"
						placeholder="Selecione a marca"
						classNames={{
							formItem: "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2",
						}}
						required
					/>
					<SelectForm
						endpoint={`equipment-model/findAllFiltered?status=ACTIVE&markId=${markId}`}
						form={form}
						formFieldName="modelId"
						label="Modelo"
						placeholder="Selecione o modelo"
						classNames={{
							formItem: "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2",
						}}
						required
						disabled={markId === ""}
					/>
					<IpInputForm
						form={form}
						formFieldName="ip"
						label="IP"
						placeholder="Informe o IP"
						classNames={{
							formItem: "col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1",
						}}
						required
					/>
					<PortIpInputForm
						form={form}
						formFieldName="port"
						label="Porta"
						placeholder="Informe a porta"
						classNames={{
							formItem: "col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1",
						}}
						required
					/>
					<InputForm
						form={form}
						formFieldName="user"
						label="Usuário"
						classNames={{
							formItem: "col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1",
						}}
						placeholder="Informe o usuário"
					/>
					<InputForm
						form={form}
						formFieldName="password"
						label="Senha"
						placeholder="Informe a senha"
						min={0}
						max={65535}
						maxLength={5}
						classNames={{
							formItem: "col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1",
						}}
					/>
					<InputForm
						form={form}
						classNames={{
							formItem: "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2",
						}}
						formFieldName="serialNumber"
						label="Número de série"
						placeholder="Informe o número de série"
					/>
				</GridForm>
				<SheetFooterSubmit
					className="sm:justify-between items-center"
					onCancel={params.closeSheet}
					LeftChild={<LeftChild />}
				/>
			</form>
		</Form>
	);
}
