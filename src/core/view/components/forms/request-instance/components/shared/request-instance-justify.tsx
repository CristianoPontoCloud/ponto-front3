import type { RequestInstanceDetails } from "@/domain/entities/request-instance/request-instance";
import { RequestInstanceStatusEnum } from "@/domain/entities/request-instance/request-instance-status";
import { StaticFieldReader } from "@/view/components/static-field-reader/static-field-reader";
import { DashedSeparator } from "@/view/components/ui/dashed-separator";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";

const ptBR = require("date-fns/locale")?.ptBR;

export function RequestInstanceJustify() {
	const form = useFormContext<RequestInstanceDetails>();
	const {
		createdAt,
		status,
		approvedBy,
		rejectedBy,
		justification,
		approvalJustification,
		rejectionJustification,
	} = form.watch();
	const date = createdAt ? new Date(createdAt) : new Date();
	const dateFormated = format(date, "dd/MM/yyyy", { locale: ptBR });
	const timeFormated = format(date, "HH:mm", { locale: ptBR });
	const { APPROVED, REJECTED } = RequestInstanceStatusEnum;
	const isAccepted = status === APPROVED;
	if (status !== APPROVED && status !== REJECTED) return;
	return (
		<>
			<DashedSeparator />
			<StaticFieldReader
				label={`Solicitação ${isAccepted ? "aceita" : "rejeitada"}`}
				value={`Em ${dateFormated} às ${timeFormated} por ${isAccepted ? approvedBy?.username : rejectedBy?.username}`}
				classNames={{
					label: isAccepted ? "text-lime-600" : "text-red-600",
				}}
			/>
			{approvalJustification && (
				<StaticFieldReader label="Justificativa" value={justification ?? ""} />
			)}
			{rejectionJustification && (
				<StaticFieldReader label="Justificativa" value={justification ?? ""} />
			)}
		</>
	);
}
