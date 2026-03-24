import type { ChildrenReactNode } from "@/domain/children";
import type { RequestInstance } from "@/domain/entities/request-instance/request-instance";
import { CollaboratorViewer } from "@/view/components/entities/collaborator/collaborator-viewer";
import { DashedSeparator } from "@/view/components/ui/dashed-separator";
import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";
import { RequestInstanceJustify } from "../shared/request-instance-justify";

interface RequestInstanceBodyLayoutSheetFormParams extends ChildrenReactNode {
	onSubmit?: (data: RequestInstance) => Promise<void>;
	className?: string;
}
export function RequestInstanceBodyLayoutSheetForm({
	onSubmit,
	children,
	className = "",
}: RequestInstanceBodyLayoutSheetFormParams) {
	const form = useFormContext<RequestInstance>();
	const user = useSession().data?.user;
	const isNewRequest = form.watch("id") === "";
	const userCollaborator = {
		id: user?.id,
		name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
		position: user?.positionName ?? "",
	};
	// const collaboratorCase = isNewRequest ? userCollaborator : form.watch("collaborator");
	const collaboratorCase = isNewRequest ? userCollaborator : userCollaborator;
	return (
		<form
			className={`flex flex-col gap-4 items-center top-1 ${className}`}
			onSubmit={onSubmit ? form.handleSubmit(onSubmit) : () => {}}
		>
			<CollaboratorViewer {...collaboratorCase} />
			<DashedSeparator />
			{children}
			<RequestInstanceJustify />
		</form>
	);
}
