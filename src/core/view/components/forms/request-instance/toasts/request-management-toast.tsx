import { requestsFacadeFactory } from "@/application/factories/registrations/requests-facade-factory";
import type { RequestInstance } from "@/domain/entities/request-instance/request-instance";
import type { RequestInstanceStatusEnum } from "@/domain/entities/request-instance/request-instance-status";
// import type { RequestInstanceFormProps } from "@/domain/entities/request-management/request-management";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ShieldCheck, ShieldX, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { toast } from "sonner";
import { findRequestName } from "../components/shared/find-request-instancet-name";

interface RequestInstanceToastParams {
	data: RequestInstance;
	status: RequestInstanceStatusEnum | "CREATED";
}
export function RequestInstanceToast({
	data: { requestId, startDate, endDate, startTime, endTime },
	status,
}: RequestInstanceToastParams) {
	const titleCases: Record<RequestInstanceStatusEnum | "CREATED", string> = {
		REJECTED: "rejeitada",
		CREATED: "criada",
		PENDING: "pendente",
		APPROVED: "aceita",
		CANCELLED: "cancelada",
	};
	const title = `Solicitação ${titleCases[status]}`;
	const token = useSession().data?.user.token ?? "";
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
	const requestList = requestQuery.data?.data ?? [];
	return (
		<div className="flex gap-3 relative">
			<Button
				variant="ghost"
				onClick={() => toast.dismiss()}
				className="absolute w-4 h-4 top-0 right-0 p-0 hover:bg-background"
			>
				<X className="w-[16px] h-[16px]" />
			</Button>
			<div className="w-[32px] h-[32px] rounded-sm border flex justify-center items-center">
				{status !== "REJECTED" && <ShieldCheck className="text-lime-600 w-[16px] h-[16px]" />}
				{status === "REJECTED" && <ShieldX className="text-red-500 w-[16px] h-[16px]" />}
			</div>
			<div className="flex flex-col gap-4 pr-6">
				<div className="flex flex-col gap-[4px]">
					<span>{title}</span>
					<span className="text-muted-foreground font-semibold">
						{findRequestName({ requestId, requestList })}
					</span>
				</div>
				<div className="flex text-muted-foreground gap-4">
					<Separator orientation="vertical" className="h-full w-[2px]" />
					<div className="flex flex-col gap-[4px]">
						{startDate && (
							<span>
								Data início: {format(startDate, "dd/MM/yyyy")} - {startTime}
							</span>
						)}
						{endDate && (
							<span>
								Data fim: {format(endDate, "dd/MM/yyyy")} - {endTime}
							</span>
						)}
					</div>
				</div>
				<Button
					variant="ghost"
					onClick={() => toast.dismiss()}
					className="w-fit p-0 hover:bg-background"
				>
					Desfazer
				</Button>
			</div>
		</div>
	);
}
