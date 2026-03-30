import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { ScopeEnum } from "@/domain/scope";
import { Combobox } from "@/view/components/combo-box/combo-box";
import { Tabs, TabsList, TabsTrigger } from "@/view/components/ui/tabs";
import { YearPicker } from "@/view/components/year-picker/year-picker";
import { useQuery } from "@tanstack/react-query";
import { Building2, User, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";

export function MirrorMarkFilters() {
	const user = useSession().data?.user;
	const userCollaboratorId = user?.collaboratorId ?? "";
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
	const collaboratorList =
		collaboratorQuery.data?.data?.map(({ id, name, surname }) => ({
			value: id,
			label: `${name} ${surname}`,
		})) ?? [];
	const [scope, setscope] = useQueryState("scope", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const isMyscope = scope === ScopeEnum.MY;
	const [collaboratorId, setCollaboratorId] = useQueryState("collaboratorId", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const [year, setYear] = useQueryState("year", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	// useEffect(() => {
	// 	if (isMyscope) {
	// 		setCollaboratorId(userCollaboratorId);
	// 		return;
	// 	}
	// }, [token, isMyscope, setCollaboratorId]);
	useEffect(() => {
		if (isMyscope) {
			setCollaboratorId(userCollaboratorId);
			return;
		}
	}, [scope, token, isMyscope, setCollaboratorId, userCollaboratorId]);
	return (
		<div className={"w-full  flex gap-2 justify-end"}>
			<Combobox
				classNames={{ buttonTrigger: "w-[300px]" }}
				onChangeValue={(value: string) => {
					setCollaboratorId(value);
				}}
				datas={collaboratorList}
				value={collaboratorId ?? ""}
				IconLeftOnList={
					<div className="h-[24px] w-[24px] flex items-center justify-center rounded-full bg-muted-foreground">
						<UserRound className="text-muted w-[12px] h-[12px]" />
					</div>
				}
				disabled={isMyscope}
			/>
			<YearPicker
				onChangeYear={(value) => {
					setYear(`${value}`);
				}}
				yearValue={Number(year ?? new Date().getFullYear())}
			/>
			<Tabs value={scope ?? ""} onValueChange={(value) => setscope(value)} data-testid="tabs">
				<TabsList>
					<TabsTrigger value={ScopeEnum.MY}>
						<User className="w-4 h-4" />
						Minhas
					</TabsTrigger>
					<TabsTrigger value={ScopeEnum.COMPANY}>
						<Building2 className="w-4 h-4" />
						Empresa
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
