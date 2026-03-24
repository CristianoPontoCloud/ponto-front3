import { useErrorToastSubmit } from "@/application/hooks/use-error-toast-submit";
import type { CollaboratorExcludeFormProps } from "@/domain/entities/collaborator/collaborator-exclude";
import {
	CollaboratorViewer,
	type CollaboratorViewerParams,
} from "@/view/components/entities/collaborator/collaborator-viewer";
import { GridForm } from "@/view/components/formfields/grid-from";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { Separator } from "@/view/components/ui/separator";
import { useFormCollaboratorExclude } from "./use-form-collaborator-edit-exclude";

export interface FormCollaboratorExclude {
	collaboratorId: string;
	collaboratorViewer: CollaboratorViewerParams;
}

export function FormCollaboratorExclude({
	collaboratorViewer,
	collaboratorId,
}: FormCollaboratorExclude) {
	const { form, onSubmit, resetModal } = useFormCollaboratorExclude({
		collaboratorId,
	});
	const fullspan = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	useErrorToastSubmit<CollaboratorExcludeFormProps>({ form });
	return (
		<Form {...form}>
			<form
				className="w-[332px] flex flex-col gap-4"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
			>
				<Separator orientation="horizontal" />
				<CollaboratorViewer {...collaboratorViewer} />
				<div className="w-full border-t-[1px] border-dashed border-boder" />
				<GridForm className="my-0">
					<p className={fullspan}>
						<span className="font-semibold">Atenção:</span> a exclusão deste colaborador é uma ação
						irreversível e não poderá ser desfeita.
					</p>
					<TextAreaForm
						form={form}
						formFieldName="justify"
						label="Justificativa"
						required
						classNames={{ formItem: fullspan }}
						maxLength={200}
					/>
					<div className={`text-muted-foreground ${fullspan} flex justify-between`}>
						<p>Mín: 10 caracteres</p>
						<p>Máx: 200 caracteres</p>
					</div>
				</GridForm>
				<div className="w-full flex justify-end gap-2">
					<Button type="button" variant="outline" onClick={() => resetModal()}>
						Cancel
					</Button>
					<Button type="submit" variant="destructive">
						Excluir
					</Button>
				</div>
			</form>
		</Form>
	);
}
