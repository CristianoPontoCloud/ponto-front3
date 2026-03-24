import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { ViewTypeEnum } from "@/domain/view-type";
import { CollaboratorViewerTooltipContent } from "@/view/components/entities/collaborator/collaborator-viewer-tooltip-content";
import { DownloadFileToast } from "@/view/components/reutilities-toasts/download-file-toast";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/view/components/ui/tooltip";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

interface MirrorMarkFooterParams {
	selectsMirrorMarks: string[];
}
export function MirrorMarkFooter({ selectsMirrorMarks }: MirrorMarkFooterParams) {
	const [viewtype] = useQueryState("viewtype", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const [collaboratorId] = useQueryState("collaboratorId", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const user = useSession().data?.user;
	const buttonDisabler = selectsMirrorMarks.length === 0;
	const token = user?.token ?? "";
	const companyId = user?.companyId ?? "";
	const collaboratorFacade = useMemo(() => collaboratorsFacadeFactory(token), [token]);
	const collaboratorQuery = useQuery({
		queryKey: ["collaborator", token],
		queryFn: async () => await collaboratorFacade.filtered({ status: "ACTIVE", companyId }),
		retry: false,
		enabled: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		staleTime: Number.POSITIVE_INFINITY,
	});
	const collaboratorFinded = collaboratorQuery.data?.data?.find(({ id }) => id === collaboratorId);
	const collaboratorSession = {
		name: `${user?.firstName ?? ""} ${user?.lastName}`,
		position: user?.positionName ?? "",
		department: faker.commerce.department(),
		email: user?.email ?? "",
		lastMark: "00/00/2025 às 00:00",
	};
	const selectedCollaborator = {
		name: `${collaboratorFinded?.name ?? ""} ${collaboratorFinded?.surname ?? ""}`,
		position: collaboratorFinded?.position?.name ?? "",
		department: collaboratorFinded?.department?.name ?? "",
		email: collaboratorFinded?.email ?? "",
		lastMark: "00/00/2025 às 00:00",
	};
	const collaboratorCase =
		viewtype === ViewTypeEnum.MY ? collaboratorSession : selectedCollaborator;

	return (
		<div className="w-full h-[36px] flex justify-between ">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div className="flex gap-[8px] items-center">
							<UserRound className="w-[16px] h-[16px] " />
							<span>{collaboratorCase.name}</span>
							<Badge className="px-2 py-0 h-[20px] bg-muted text-muted-foreground shadow-none">
								00.000.000-00
							</Badge>
						</div>
					</TooltipTrigger>
					<CollaboratorViewerTooltipContent {...collaboratorCase} className="w-[266px]" />
				</Tooltip>
			</TooltipProvider>
			<Button
				disabled={buttonDisabler}
				onClick={() =>
					toastCustom({
						Component: <DownloadFileToast fileName="Espelho de ponto" loadFile={() => {}} />,
					})
				}
			>
				Baixar selecionados
			</Button>
		</div>
	);
}
