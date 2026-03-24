import { cpfMaks } from "@/domain/global-helpers/masks/cpf-mask";
import { Badge } from "@/view/components/ui/badge";
import { UserRound } from "lucide-react";
import { useContextTimeTracking } from "../../../provider/time-tracking-provider";
export function TimetrackingInfo() {
	const { collaboratorsQuery, headerForm } = useContextTimeTracking();
	const collaboratorId = headerForm.watch("collaboratorId");
	const collaborator = collaboratorsQuery?.data?.find(({ id }) => id === collaboratorId);
	const name = `${collaborator?.name ?? ""} ${collaborator?.surname ?? ""}`;
	return (
		<div className="flex gap-2 text-muted-foreground items-center">
			<UserRound className="w-4 h-4" /> {name ?? ""}
			<Badge className="px-2 py-0 h-[20px] bg-muted text-muted-foreground shadow-none">
				{cpfMaks(collaborator?.cpf ?? "")}
			</Badge>
		</div>
	);
}
