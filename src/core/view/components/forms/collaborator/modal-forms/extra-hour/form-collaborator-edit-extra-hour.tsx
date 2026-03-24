import { useErrorToastSubmit } from "@/application/hooks/use-error-toast-submit";
import type { CollaboratorDetails } from "@/domain/entities/collaborator/collaborator";
import type { CollaboratorEditExtraHourFormProps } from "@/domain/entities/collaborator/collaborator-edit-extra-hour";
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
import { useFormCollaboratorEditExtraHour } from "./use-form-collaborator-edit-extra-hour";

export interface FormCollaboratorEditExtraHour {
	collaboratorId: string;
	getSubmitResponse?: (data: CollaboratorDetails["extraHours"]) => void;
	collaboratorViewer: CollaboratorViewerParams;
}

export function FormCollaboratorEditExtraHour({
	collaboratorViewer,
	collaboratorId,
	getSubmitResponse,
}: FormCollaboratorEditExtraHour) {
	const { form, onSubmit, resetModal } = useFormCollaboratorEditExtraHour({
		collaboratorId,
		getSubmitResponse,
	});
	const fullspan = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	useErrorToastSubmit<CollaboratorEditExtraHourFormProps>({ form });
	return (
		<Form {...form}>
			<form className="w-[288px] flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
				<Separator orientation="horizontal" />
				<CollaboratorViewer {...collaboratorViewer} />
				<div className="w-full border-t-[1px] border-dashed border-boder" />
				<GridForm className="my-0">
					<SelectForm
						form={form}
						formFieldName="extraHourId"
						label="Hora extra"
						placeholder="Selecione"
						classNames={{ formItem: fullspan }}
						endpoint="extra-time/findAllFiltered?status=ACTIVE"
						required
					/>
					<DateForm
						form={form}
						formFieldName="startDate"
						label="Início da vigência"
						placeholder="Selecione a data"
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
					<Button type="submit">Confirmar</Button>
				</div>
			</form>
		</Form>
	);
}
