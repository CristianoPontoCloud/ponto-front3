import { turnsFacadeFactory } from "@/application/factories/hours/turns-facade-factory";
import { useTopOffset } from "@/application/hooks/use-top-off-set";
import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import type { ValueLabel } from "@/domain/value-label";
import DateForm from "@/view/components/formfields/date-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import SelectForm from "@/view/components/formfields/select-form";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export function WorkdayTurnForm() {
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	const form = useFormContext<CollaboratorFormProps>();
	const fullspan = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	const halfspan = "col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1";
	const turnId = form.watch(`workShiftAssignments.${0}.workShift.id`) ?? "";
	const token = useSession().data?.user.token ?? "";
	const turnsFacade = useMemo(() => turnsFacadeFactory(token), [token]);
	const [cycleDaysData, setCycleDaysData] = useState<ValueLabel[]>([]);
	const { refetch } = useQuery({
		queryKey: ["turn"],
		queryFn: async () => {
			const turn = await turnsFacade.findById(turnId);
			const cycleDays = turn?.policy.cycleLengthDays ? Number(turn?.policy.cycleLengthDays) : 0;
			const cycleDaysValues: ValueLabel[] = Array.from({ length: cycleDays }).map((_, index) => {
				const day = (index + 1).toString();
				return {
					value: day,
					label: day,
				};
			});
			setCycleDaysData(cycleDaysValues);
		},
		retry: false,
		enabled: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		staleTime: Number.POSITIVE_INFINITY,
	});
	useEffect(() => {
		async function getTurn() {
			if (turnId !== "") {
				await refetch();
			}
		}
		getTurn();
	}, [turnId, refetch]);

	return (
		<ScrollArea style={{ height: height - 90 }} ref={ref}>
			<GridForm className="m-0">
				<SelectForm
					form={form}
					placeholder="Selecione o turno"
					label="Turno"
					formFieldName={`workShiftAssignments.${0}.workShift.id`}
					classNames={{ formItem: fullspan }}
					endpoint="work-shift/findAllFiltered?status=ACTIVE"
					required
				/>
				<DateForm
					form={form}
					placeholder="Selecione a data"
					label="Início de vigência"
					formFieldName={`workShiftAssignments.${0}.startDate`}
					classNames={{ formItem: halfspan }}
					required
				/>
				<SelectForm
					form={form}
					placeholder="Selecione o cíclo"
					label="Posição do ciclo"
					formFieldName={`workShiftAssignments.${0}.cycleOffset`}
					classNames={{ formItem: halfspan }}
					datas={cycleDaysData}
					required
					disabled={cycleDaysData.length === 0}
				/>
				<TextAreaForm
					form={form}
					formFieldName={`workShiftAssignments.${0}.obs`}
					label="Observação (opcional)"
					classNames={{ formItem: fullspan }}
					maxLength={200}
				/>
				<p className={`text-muted-foreground ${fullspan}`}>Máximo: 200 caracteres</p>
			</GridForm>
		</ScrollArea>
	);
}
