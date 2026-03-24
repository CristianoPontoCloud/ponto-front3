import type { UserRole } from "@/domain/entities/user-role";
import { Avatar, AvatarFallback, AvatarImage } from "@/view/components/ui/avatar";
import { Badge } from "@/view/components/ui/badge";
import { UserRound } from "lucide-react";

interface UserRoleViewerParams {
	userRole: UserRole;
}

export function UserRoleViewer({ userRole: { role, user } }: UserRoleViewerParams) {
	return (
		<div className="px-2 w-full flex justify-between items-center">
			<div className="flex justify-between items-center gap-2">
				<Avatar className="h-8 w-8 rounded-full bg-muted text-muted-foreground">
					<AvatarImage src={""} alt={user.username} />
					<AvatarFallback className="rounded-full">
						<div className=" p-6 rounded-full ">
							<UserRound className=" h-5 w-5" />
						</div>
					</AvatarFallback>
				</Avatar>
				{user.email}
			</div>

			<Badge className="px-2 py-1 bg-muted text-muted-foreground">{role.name}</Badge>
		</div>
	);
}
