import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { ViewTypeEnum } from "@/domain/view-type";
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
	const [viewtype, setViewtype] = useQueryState("viewtype", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const isMyViewType = viewtype === ViewTypeEnum.MY;
	const [collaboratorId, setCollaboratorId] = useQueryState("collaboratorId", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const [dateTo, setDateTo] = useQueryState("dateTo", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const [dateFrom, setDateFrom] = useQueryState("dateFrom", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	// useEffect(() => {
	// 	if (isMyViewType) {
	// 		setCollaboratorId(userCollaboratorId);
	// 		return;
	// 	}
	// }, [token, isMyViewType, userCollaboratorId, setCollaboratorId]);
	useEffect(() => {
		if (isMyViewType) {
			setCollaboratorId(userCollaboratorId);
			return;
		}
	}, [viewtype, token, isMyViewType, userCollaboratorId, setCollaboratorId]);
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
				disabled={isMyViewType}
			/>
			<DatePickerWithRange
				dateFrom={dateFrom ? new Date(dateFrom) : null}
				dateTo={dateTo ? new Date(dateTo) : null}
				onChangeFromDate={(value) => {
					if (!value) return;
					const formatted = value.toISOString().split("T")[0];
					setDateFrom(formatted);
				}}
				onChangeToDate={(value) => {
					if (!value) return;
					const formatted = value.toISOString().split("T")[0];
					setDateTo(formatted);
				}}
				align="end"
			/>
			<Tabs value={viewtype ?? ""} onValueChange={(value) => setViewtype(value)} data-testid="tabs">
				<TabsList>
					<TabsTrigger value={ViewTypeEnum.MY}>
						<User className="w-4 h-4" />
						Minhas
					</TabsTrigger>
					<TabsTrigger value={ViewTypeEnum.COMPANY}>
						<Building2 className="w-4 h-4" />
						Empresa
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
