import { useTopOffset } from "@/application/hooks/use-top-off-set";
import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import DateForm from "@/view/components/formfields/date-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import SelectForm from "@/view/components/formfields/select-form";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export function WorkdayExtraHourForm() {
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	const form = useFormContext<CollaboratorFormProps>();
	const fullspan = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	return (
		<ScrollArea style={{ height: height - 90 }} ref={ref}>
			<GridForm className="m-0">
				{/* <DashedSeparator className="col-span-2" /> */}
				<SelectForm
					form={form}
					placeholder="Selecione a hora extra"
					label="Hora extra"
					formFieldName={`extraHours.${0}.extraHourId`}
					classNames={{ formItem: fullspan }}
					endpoint="extra-time/findAllFiltered?status=ACTIVE"
					// datas={[{ label: "nome da hora extra", value: "1" }]}
					required
				/>
				<DateForm
					form={form}
					placeholder="Selecione a data"
					label="Início de vigência"
					formFieldName={`extraHours.${0}.startDate`}
					classNames={{ formItem: fullspan }}
					required
				/>
				<TextAreaForm
					form={form}
					formFieldName={`extraHours.${0}.observation`}
					label="Observação (opcional)"
					classNames={{ formItem: fullspan }}
					maxLength={200}
				/>
				<p className={`text-muted-foreground ${fullspan}`}>Máximo: 200 caracteres</p>
			</GridForm>
		</ScrollArea>
	);
}
