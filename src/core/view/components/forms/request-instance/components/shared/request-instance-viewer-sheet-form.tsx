import { requestsFacadeFactory } from "@/application/factories/registrations/requests-facade-factory";
import type { RequestInstanceDetails } from "@/domain/entities/request-instance/request-instance";
import { getRequestInstaceType } from "@/domain/entities/request-instance/request-instance-type";
import { StaticFieldReader } from "@/view/components/static-field-reader/static-field-reader";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { findRequestName } from "./find-request-instancet-name";
const ptBR = require("date-fns/locale")?.ptBR;

export function RequestInstanceViewerSheetForm() {
	const form = useFormContext<RequestInstanceDetails>();
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const requestFacade = useMemo(() => requestsFacadeFactory(token), [token]);
	const requestQuery = useQuery({
		queryKey: ["select-request", token],
		queryFn: async () => requestFacade.filtered(),
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		staleTime: Number.POSITIVE_INFINITY,
	});
	const { startDate, endDate, startTime, endTime, justification, type, createdAt, requestId } =
		form.watch();
	const date = new Date(createdAt);
	const dateFormated = format(date, "dd/MM/yyyy", { locale: ptBR });
	const timeFormated = format(date, "HH:mm", { locale: ptBR });
	const formatedDateStart = startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "";
	const formatedDateEnd = endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "";

	return (
		<div className="flex flex-col gap-4 w-full">
			<StaticFieldReader
				label={findRequestName({ requestId, requestList: requestQuery.data?.data ?? [] })}
				value={`Realizada em ${dateFormated} às ${timeFormated}`}
			/>
			<StaticFieldReader label="Tipo" value={getRequestInstaceType(type).label} />
			<div className="flex gap-6">
				<StaticFieldReader
					label="Data ínicio"
					value={formatedDateStart}
					classNames={{ wrapper: "w-1/2" }}
				/>
				<StaticFieldReader
					label="Data fim"
					value={formatedDateEnd}
					classNames={{ wrapper: "w-1/2" }}
				/>
			</div>
			<div className="flex gap-6">
				<StaticFieldReader
					label="Hora ínicio"
					value={startTime}
					classNames={{ wrapper: "w-1/2" }}
				/>
				{endTime && (
					<StaticFieldReader label="Hora fim" value={endTime} classNames={{ wrapper: "w-1/2" }} />
				)}
			</div>
			<StaticFieldReader label="Observação do colaborador" value={justification} />
		</div>
	);
}
