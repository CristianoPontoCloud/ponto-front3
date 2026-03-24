import { useFormContext } from "react-hook-form";
import { CollaboratorBadgeStatus } from "../../entities/collaborator/collaborator-badge-status";

export function CollaboratorHeaderSheetForm() {
	const form = useFormContext();
	const name = form.watch("name");
	const status = form.watch("status");
	const id = form.watch("id");
	if (id) {
		return (
			<div className="flex gap-3 items-center">
				<p className="font-semibold">{name}</p>
				<CollaboratorBadgeStatus statusValue={status} />
			</div>
		);
	}
	return "Cadastro de colaborador";
}
