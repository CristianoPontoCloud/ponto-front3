import { UserRound } from "lucide-react";

interface MarkPerfilCollaboratorParams {
	id: string;
	name: string;
	position: string;
}
export function MarkPerfilCollaborator({ name, position }: MarkPerfilCollaboratorParams) {
	return (
		<>
			<div className="w-full flex gap-4">
				<div className="rounded-lg w-12 h-12 flex items-center justify-center bg-muted dark:bg-muted-foreground ">
					<UserRound className="text-muted-foreground dark:text-muted" />
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-semibold">{name}</p>
					<p>{position}</p>
				</div>
			</div>
			<div className="w-full border-t-[1px] border-dashed border-boder" />
		</>
	);
}
