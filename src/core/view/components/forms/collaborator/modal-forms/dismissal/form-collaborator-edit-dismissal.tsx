import { useErrorToastSubmit } from "@/application/hooks/use-error-toast-submit";
import type { CollaboratorEditDismissalFormProps } from "@/domain/entities/collaborator/collaborator-edit-dismissal";
import {
	CollaboratorViewer,
	type CollaboratorViewerParams,
} from "@/view/components/entities/collaborator/collaborator-viewer";
import DateForm from "@/view/components/formfields/date-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import SelectForm from "@/view/components/formfields/select-form";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { Separator } from "@/view/components/ui/separator";
import { useFormCollaboratorEditDismissal } from "./use-form-collaborator-edit-dismissal";

export interface FormCollaboratorEditDismissal {
	collaboratorId: string;
	getSubmitResponse?: (data: CollaboratorEditDismissalFormProps) => void;
	collaboratorViewer: CollaboratorViewerParams;
}

export function FormCollaboratorEditDismissal({
	collaboratorViewer,
	collaboratorId,
	getSubmitResponse,
}: FormCollaboratorEditDismissal) {
	const { form, onSubmit, resetModal } = useFormCollaboratorEditDismissal({
		collaboratorId,
		getSubmitResponse,
	});
	const fullspan = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	useErrorToastSubmit<CollaboratorEditDismissalFormProps>({ form });
	return (
		<Form {...form}>
			<form
				className="w-[288px] flex flex-col gap-4"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
			>
				<Separator orientation="horizontal" />
				<CollaboratorViewer {...collaboratorViewer} />
				<div className="w-full border-t-[1px] border-dashed border-boder" />
				<GridForm className="my-0">
					<DateForm
						form={form}
						formFieldName="date"
						label="Data da demissão"
						placeholder="Selecione a data"
						classNames={{ formItem: fullspan }}
						required
					/>
					<SelectForm
						form={form}
						endpoint="dismissal"
						formFieldName="reason"
						label="Motivo da demissão"
						placeholder="Selecione"
						// datas={[
						// 	{ value: "1", label: "Demissão por justa causa" },
						// 	{ value: "2", label: "Demissão sem justa causa" },
						// 	{ value: "3", label: "Redução de custo" },
						// 	{ value: "4", label: "Colaborador solicitou desligamento" },
						// ]}
						classNames={{ formItem: fullspan }}
						required
					/>
					<TextAreaForm
						form={form}
						formFieldName="observation"
						label="Observação (opcional)"
						classNames={{ formItem: fullspan }}
						maxLength={200}
					/>
					<p className={`text-muted-foreground ${fullspan}`}>Máximo: 200 caracteres</p>
				</GridForm>
				<div className="w-full flex justify-end gap-2">
					<Button type="button" variant="outline" onClick={() => resetModal()}>
						Cancel
					</Button>
					<Button type="submit" variant="destructive">
						Demitir
					</Button>
				</div>
			</form>
		</Form>
	);
}
