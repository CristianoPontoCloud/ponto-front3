import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { useSysConfigStore } from "@/application/providers/sys-config/use-sys-config";
import { sysConfigEnumAdapters } from "@/application/usecases/sys-config-paramters-maper";
import type { TurnFormProps } from "@/domain/entities/turns/turns";
import { CheckboxForm } from "@/view/components/formfields/checkbox-form";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { Separator } from "@/view/components/ui/separator";
import Link from "next/link";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export function ToleranceForm() {
	const form = useFormContext<TurnFormProps>();
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	const article58 = form.watch("considerClt58Art");
	const { parameters } = useSysConfigStore();

	return (
		<ScrollArea
			className="w-full h-full pb-10 p-1 flex flex-col gap-4"
			data-testid="form-dsr"
			style={{ height: height - 60 }}
			ref={ref}
		>
			<div className="w-full flex flex-col gap-2">
				<CheckboxForm
					form={form}
					label="Considerar Art. 58 da CLT"
					formFieldName="considerClt58Art"
				/>
				<span className="pl-7 font-thin text-muted-foreground">
					Marque esta opção para considerar atrasos ou adiantamentos até 10 minutos diários de
					acordo com o{" "}
					<Link
						className="text-primary underline"
						href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm#:~:text=JORNADA%20DE%20TRABALHO-,Art.%2058%20%2D,-A%20dura%C3%A7%C3%A3o%20normal"
						target="_blank"
					>
						Artigo 58 da CLT.
					</Link>
				</span>
			</div>

			<GridForm className="w-full pt-0 mt-0">
				<Separator orientation="horizontal" className="col-span-2" />
				<InputForm
					form={form}
					formFieldName="absenceToleranceInMinutes"
					label="Tolerância extra por falta (minutos)"
					placeholder="0"
					description="description"
					onlyNumbers
					disabled={article58}
				/>
				<InputForm
					form={form}
					formFieldName="punchingToleranceInMinutes"
					label="Tolerância extra por batida (minutos)"
					placeholder="0"
					description="description"
					onlyNumbers
					disabled={article58}
				/>
				<InputForm
					form={form}
					formFieldName="dailyMinimumExtraHoursInMinutes"
					label="Limite mínimo diário de horas extra (minutos)"
					placeholder="0"
					description="description"
					onlyNumbers
					disabled={article58}
				/>
				<InputForm
					form={form}
					formFieldName="dailyMinimumAbsentInMinutes"
					label="Limite mínimo diário de falta (minutos)"
					placeholder="0"
					description="description"
					onlyNumbers
					disabled={article58}
				/>

				<SelectForm
					form={form}
					formFieldName="actionUponSurpassingExtraTimeLimitCode"
					label="Quando passar do limite mínimo diário de extras"
					placeholder="Selecione o limite"
					description="description"
					datas={sysConfigEnumAdapters({ field: "actionUponSurpassingLimit", parameters })}
				/>
				<SelectForm
					form={form}
					formFieldName="actionUponSurpassingAbsenceLimitCode"
					label="Quando passar do limite mínimo diário de faltas"
					placeholder="Selecione o limite"
					description="description"
					datas={sysConfigEnumAdapters({ field: "actionUponSurpassingLimit", parameters })}
				/>
			</GridForm>
		</ScrollArea>
	);
}
