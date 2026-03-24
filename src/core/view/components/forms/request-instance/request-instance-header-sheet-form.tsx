import { ShieldAlert } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { RequestInstanceBadgeStatus } from "../../entities/request-instance/request-instance-badge-status";

export function RequestInstanceHeaderSheetForm() {
	const form = useFormContext();
	const status = form.watch("status");
	const id = form.watch("id");
	return (
		<div className="flex gap-3 items-center ">
			<ShieldAlert />
			{!id && <p className="font-semibold text-lg">Nova solicitação</p>}
			{id && <p className="font-semibold text-lg">Solicitação</p>}
			{id && <RequestInstanceBadgeStatus statusValue={status} />}
		</div>
	);
}
