import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { approvalFlowTypeMap } from "@/domain/entities/department";
import { InputForm } from "@/view/components//formfields/input-form-field";
import { CheckboxForm } from "@/view/components/formfields/checkbox-form";
import { GridForm } from "@/view/components/formfields/grid-from";
import { LabelForm } from "@/view/components/formfields/label-form";
import MultiSelectForm from "@/view/components/formfields/mult-select-form";
import SelectForm from "@/view/components/formfields/select-form";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SwitchForm } from "@/view/components/formfields/switch-form-field";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { Separator } from "@/view/components/ui/separator";
import { Plus, Trash } from "lucide-react";
import { useRef } from "react";
import { useDepartmentSheetForm } from "./use-department-sheet-form";

export default function DepartmentSheetForm(params: SheetFormProps) {
	const {
		form,
		handleSubmit,
		onSubmit,
		id,
		openModalExlcudeCostCenter,
		usersForApproval,
		onAddUserForApproval,
		managersList,
		deleteUserForApproval,
		hasErrorOnUserForApproval,
	} = useDepartmentSheetForm(params);
	const headerRef = useRef<HTMLButtonElement | null>(null);
	const height = useBottomOffset(headerRef);
	const approvalFlow = form.watch("approvalFlow")
	const checkboxDisabler = !approvalFlow
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
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="h-full px-1">
				<GridForm className="mt-0">
					<InputForm
						form={form}
						formFieldName="name"
						label="Nome"
						required
						placeholder="Digite o nome do departamento"
						classNames={{
							formItem: "sm:col-span-2 md:col-span-2 lg:col-span-2",
						}}
					/>
					<div className="flex items-center col-span-full gap-2">
						<SwitchForm formFieldName="approvalFlow" form={form} />
						<LabelForm
							formFieldName="approvalFlow"
							label="Fluxo de aprovação"
							description="descrição"
						/>
					</div>
				</GridForm>
				<GridForm>
					<CheckboxForm
						formFieldName="requests"
						form={form}
						label="Solicitações"
						disable={checkboxDisabler}
					/>
					<CheckboxForm
						formFieldName="offlineMarkings"
						form={form}
						label="Marcações offline"
						disable={checkboxDisabler}
					/>
					<CheckboxForm
						formFieldName="geographicalDelimitation"
						form={form}
						label="Delimitação geográfica"
						disable={checkboxDisabler}
					/>
					<CheckboxForm
						formFieldName="unrecognizedPhoto"
						form={form}
						label="Foto não reconhecida"
						disable={checkboxDisabler}
					/>
					<CheckboxForm
						formFieldName="fakeGPS"
						form={form}
						label="GPS falso"
						disable={checkboxDisabler}
					/>
				</GridForm>
				<Separator />
				<GridForm>
					<SelectForm
						form={form}
						formFieldName="approvalFlowType"
						label="Ordem de aprovação"
						classNames={{ formItem: "col-span-full sm:col-span-2 md:col-span-2 lg:col-span-2" }}
						placeholder="Selecione uma ordem de aprovação"
						datas={approvalFlowTypeMap}
						required
					/>
					<MultiSelectForm
						form={form}
						formFieldName="selectUser"
						label="Usuários para adicionar"
						classNames={{ formItem: "col-span-full sm:col-span-2 md:col-span-2 lg:col-span-2" }}
						placeholder="Selecione os usuários"
						options={managersList}
						description={`Selecione um usuário e depois clique em adicionar para inclui-lo na lista de  "Usuários para de aprovar"`}
					/>
					<Button
						variant="outline"
						type="button"
						className="col-span-full"
						ref={headerRef}
						onClick={() => onAddUserForApproval()}
					>
						<Plus />
						Adicionar
					</Button>
				</GridForm>
				<div className="flex justify-between items-center mb-2">
					<LabelForm
						formFieldName="usersForApproval"
						label="Usuários para aprovar"
						hasError={hasErrorOnUserForApproval()}

					/>
					{usersForApproval.length > 0 ? (
						<Button
							type="button"
							className="px-2 py-1 h-fit text-xs bg-transparent hover:bg-red-500/5 text text-red-500"
							onClick={() => {
								form.setValue("usersForApproval", []);
							}}
						>
							remover todos
						</Button>
					) : (
						<></>
					)}
				</div>
				<ScrollArea className="flex flex-col rounded-md" style={{ height: height - 165 }}>
					{usersForApproval?.map((uuidCollaborator, index) => {
						const collaborator = managersList.find(({ value }) => value === uuidCollaborator);
						return (
							<div
								key={index.toString()}
								className="w-full flex justify-between items-center hover:bg-muted-foreground/5 rounded-md"
							>
								<span className="pl-2">{`${index + 1}º  ${collaborator?.label ?? ""}`}</span>
								<Button
									variant="ghost"
									size="icon"
									className="hover:bg-red-500/15"
									type="button"
									onClick={() => deleteUserForApproval(uuidCollaborator)}
								>
									<Trash className="text-red-500" />
								</Button>
							</div>
						);
					})}
				</ScrollArea>
				<SheetFooterSubmit onCancel={params.closeSheet} LeftChild={<LeftChild />} />
			</form>
		</Form>
	);
}
