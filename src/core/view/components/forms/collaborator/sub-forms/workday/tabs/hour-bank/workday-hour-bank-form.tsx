import { useTopOffset } from "@/application/hooks/use-top-off-set";
import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import DateForm from "@/view/components/formfields/date-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import SelectForm from "@/view/components/formfields/select-form";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export function WorkdayHourBankForm() {
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	const form = useFormContext<CollaboratorFormProps>();
	const fullspan = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	return (
		<ScrollArea style={{ height: height - 90 }} ref={ref}>
			<GridForm className="m-0">
				<SelectForm
					form={form}
					placeholder="Selecione a banco de horas"
					label="Banco de horas"
					formFieldName={`hourBanks.${0}.hourBankId`}
					endpoint="hour-bank/findAllFiltered?status=ACTIVE"
					classNames={{ formItem: fullspan }}
				/>
				<DateForm
					form={form}
					placeholder="Selecione a data"
					label="Início de vigência"
					formFieldName={`hourBanks.${0}.startDate`}
					classNames={{ formItem: fullspan }}
				/>
				<TextAreaForm
					form={form}
					formFieldName={`hourBanks.${0}.observation`}
					label="Observação (opcional)"
					classNames={{ formItem: fullspan }}
					maxLength={200}
				/>
				<p className={`text-muted-foreground ${fullspan}`}>Máximo: 200 caracteres</p>
			</GridForm>
		</ScrollArea>
	);
}
