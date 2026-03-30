import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { parseTimestampToLocaleDate } from "@/domain/global-helpers/time-tools";
import { ScopeEnum } from "@/domain/scope";
import { Combobox } from "@/view/components/combo-box/combo-box";
import { DatePickerWithRange } from "@/view/components/ui/date-range-picker";
import { Tabs, TabsList, TabsTrigger } from "@/view/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Building2, User, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";

export function ReceiptsFilters() {
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
	const [to, setTo] = useQueryState("to", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const [from, setFrom] = useQueryState("from", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	// useEffect(() => {
	// 	if (isMyscope) {
	// 		setCollaboratorId(userCollaboratorId);
	// 		return;
	// 	}
	// }, [token, isMyscope, userCollaboratorId, setCollaboratorId]);
	useEffect(() => {
		if (isMyscope) {
			setCollaboratorId(userCollaboratorId);
			return;
		}
		if (!isMyscope) {
			setCollaboratorId("")
		}

	}, [scope, token, isMyscope, userCollaboratorId, setCollaboratorId]);
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
			<DatePickerWithRange
				dateFrom={from ? new Date(parseTimestampToLocaleDate(from)) : null}
				dateTo={to ? new Date(parseTimestampToLocaleDate(to)) : null}
				onChangeFromDate={(value) => {
					if (!value) return;
					const formatted = value.toISOString().split("T")[0];
					setFrom(formatted);
				}}
				onChangeToDate={(value) => {
					if (!value) return;
					const formatted = value.toISOString().split("T")[0];
					setTo(formatted);
				}}
				align="end"
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
