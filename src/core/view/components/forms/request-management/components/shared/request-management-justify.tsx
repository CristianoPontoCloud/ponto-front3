import type { RequestManagementFormProps } from "@/domain/entities/request-management/request-management";
import { RequestManagementStatusEnum } from "@/domain/entities/request-management/request-management-status";
import { StaticFieldReader } from "@/view/components/static-field-reader/static-field-reader";
import { DashedSeparator } from "@/view/components/ui/dashed-separator";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
const { ptBR } = require("date-fns/locale/pt-BR");

export function RequestManagementJustify() {
	const form = useFormContext<RequestManagementFormProps>();
	const createdAt = form.watch("createdAt");
	const date = new Date(createdAt);
	const dateFormated = format(date, "dd/MM/yyyy", { locale: ptBR });
	const timeFormated = format(date, "HH:mm", { locale: ptBR });
	const status = form.watch("status");
	const acceptedBy = form.watch("acceptedBy");
	const rejectedBy = form.watch("rejectedBy");
	const justify = form.watch("justify");

	const { ACCEPTED, PENDING } = RequestManagementStatusEnum;
	const isAccepted = status === ACCEPTED;

	if (status === PENDING) return;
	return (
		<>
			<DashedSeparator />
			<StaticFieldReader
				label={`Solicitação ${isAccepted ? "aceita" : "rejeitada"}`}
				value={`Em ${dateFormated} às ${timeFormated} por ${isAccepted ? acceptedBy?.name : rejectedBy?.name}`}
				classNames={{
					label: isAccepted ? "text-lime-600" : "text-red-600",
				}}
			/>
			{(justify !== "" || rejectedBy) && (
				<StaticFieldReader label="Justificativa" value={justify ?? ""} />
			)}
		</>
	);
}
