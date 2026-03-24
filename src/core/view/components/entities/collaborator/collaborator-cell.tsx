import { getUrlImgApi } from "@/application/helpers/get-base-url-img-api";
import { CollaboratorStatusEnum } from "@/domain/entities/collaborator/collaborator-status";
import { Avatar, AvatarFallback, AvatarImage } from "@/view/components/ui/avatar";
import { UserRound } from "lucide-react";
import { tv } from "tailwind-variants";

interface CollaboratorCellParams {
	src?: string;
	name: string;
	status: CollaboratorStatusEnum;
}
export function CollaboratorCell({ name, src = "", status }: CollaboratorCellParams) {
	const avatarImageVariants = tv({
		variants: {
			isDismissal: {
				true: "filter grayscale",
			},
		},
	});
	return (
		<div className="flex gap-2 items-center z-0">
			<Avatar className="w-8 h-8 flex items-center justify-center">
				<AvatarImage
					src={getUrlImgApi(src)}
					className={avatarImageVariants({
						isDismissal: status === CollaboratorStatusEnum.dismissed,
					})}
				/>
				<AvatarFallback>
					<UserRound className="w-4 h-4" />
				</AvatarFallback>
			</Avatar>
			{name}
		</div>
	);
}
