import { useWebSocketAdapter } from "@/application/adapters/web-socket/use-web-socket-adapter";
import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { mirrorMarkFacadeFactory } from "@/application/factories/mirror-mark-factory";
import { cpfMaks } from "@/domain/global-helpers/masks/cpf-mask";
import { ScopeEnum } from "@/domain/scope";
import { CollaboratorViewerTooltipContent } from "@/view/components/entities/collaborator/collaborator-viewer-tooltip-content";
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
	selectsIdsMirrorMarks: string[];
}
export function MirrorMarkFooter({ selectsIdsMirrorMarks }: MirrorMarkFooterParams) {
	// const [year] = useQueryState("year", {
	// 	history: "replace",
	// 	shallow: true,
	// 	clearOnDefault: false,
	// });
	const [scope] = useQueryState("scope", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const [collaboratorId] = useQueryState("collaboratorId", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const websocketAdapter = useWebSocketAdapter();
	const user = useSession().data?.user
	const token = user?.token ?? ""
	const companyId = user?.companyId ?? ""
	const buttonDisabler = selectsIdsMirrorMarks.length === 0;
	const facade = useMemo(() => ({ collaborator: collaboratorsFacadeFactory(token), mirrorMark: mirrorMarkFacadeFactory(token) }), [token]);
	const collaboratorQuery = useQuery({
		queryKey: ["collaborator", token],
		queryFn: async () => await facade.collaborator.filtered({ status: "ACTIVE", companyId }),
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
		cpf: collaboratorFinded?.cpf ? cpfMaks(collaboratorFinded?.cpf) : ""

	};
	const selectedCollaborator = {
		name: `${collaboratorFinded?.name ?? ""} ${collaboratorFinded?.surname ?? ""}`,
		position: collaboratorFinded?.position?.name ?? "",
		department: collaboratorFinded?.department?.name ?? "",
		email: collaboratorFinded?.email ?? "",
		lastMark: "00/00/2025 às 00:00",
		cpf: collaboratorFinded?.cpf ? cpfMaks(collaboratorFinded?.cpf) : ""
	};
	const collaboratorCase =
		scope === ScopeEnum.MY ? collaboratorSession : selectedCollaborator;


	async function onDownLoadFiles() {
		// const mirrorMarks = await facade.mirrorMark.filtered({
		// 	year: year ?? "",
		// 	collaboratorId: collaboratorId ?? "",
		// 	scope: scope ?? "",
		// 	companyId,
		// })
		// const fullSelectedMirrorMarks = mirrorMarks.data?.filter((mirrorMark) => {
		// 	return selectsIdsMirrorMarks?.find((id) => mirrorMark.id === id)
		// })

		// const periods: Array<{ from: string, to: string }> = []

		// for (const mirroMark of mirrorMarks?.data ?? []) {
		// 	for (const id)
		// }
		// const from = fullSelectedMirrorMarks?.[fullSelectedMirrorMarks?.length - 1].periodFrom ?? ""
		// const to = fullSelectedMirrorMarks?.[0].periodTo ?? ""

		const { data } = await facade.mirrorMark.generate({
			periods: [],
			scope: scope as ScopeEnum,
			tz: "America/Sao_Paulo",
			companyId,
			collaboratorId
		})
		if (!data?.socketChannel) return
		const channelName = data?.socketChannel
		websocketAdapter.connectAndListen({
			eventCallback: (params) => {
				console.log(params)
				// const publicUrl = params?.data?.publicUrl;
				// if (!publicUrl) throw new Error();
				// setLink(publicUrl);
			},
			channelName,
		});
		// toastCustom({
		// 	Component: <DownloadFileToast
		// 		fileName="Espelho de ponto"
		// 		loadFile={(setLink) => {
		// 			websocketAdapter.connectAndListen<any>({
		// 				eventCallback: (params) => {
		// 					console.log(params)
		// 					const publicUrl = params?.data?.publicUrl;
		// 					if (!publicUrl) throw new Error();
		// 					setLink(publicUrl);
		// 				},
		// 				channelName,
		// 			});
		// 		}}
		// 	/>,
		// 	duration: 999999
		// })
	}
	return (
		<div className="w-full h-[36px] flex justify-between ">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div className="flex gap-[8px] items-center">
							<UserRound className="w-[16px] h-[16px] " />
							<span>{collaboratorCase.name}</span>
							<Badge className="px-2 py-0 h-[20px] bg-muted text-muted-foreground shadow-none">
								{collaboratorCase.cpf}
							</Badge>
						</div>
					</TooltipTrigger>
					<CollaboratorViewerTooltipContent {...collaboratorCase} className="w-[266px]" />
				</Tooltip>
			</TooltipProvider>
			<Button
				disabled={buttonDisabler}
				onClick={() => onDownLoadFiles()}
			>
				Baixar selecionados
			</Button>
		</div>
	);
}
