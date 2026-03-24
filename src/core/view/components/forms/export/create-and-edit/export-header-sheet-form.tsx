import type { ExportLayoutFormProps } from "@/domain/entities/exports/exports";
import { useFormContext } from "react-hook-form";
import { Badge } from "../../../ui/badge";

export function ExportHeaderSheetForm() {
	const form = useFormContext<ExportLayoutFormProps>();
	const id = form.watch("id");
	return (
		<div className="flex gap-2 items-center">
			<h2>{id ? "Gerenciar" : "Novo"} layout TXT</h2>
			<Badge className="bg-muted text-muted-foreground h-[20px] w-fit px-2 py-1 text-xs">
				folha de pagamento
			</Badge>
		</div>
	);
}
