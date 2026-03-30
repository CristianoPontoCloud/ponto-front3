import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import type { TurnDay } from "@/domain/entities/turns/turn-day";
import { type TurnFormProps, TurnTypeEnum, TurnsDetails } from "@/domain/entities/turns/turns";
import type { ValueLabel } from "@/domain/value-label";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";
import { turnCycleDaysUseCase } from "../../../../../../domain/usecases/turn-cycle-days-use-case";
import { TurnGrid } from "../turn-grid/turn-grid";

export function TurnForm() {
	const form = useFormContext<TurnFormProps>();
	const ref = useRef<HTMLDivElement>(null);
	const height = useBottomOffset(ref);
	const TurnsTypeData: ValueLabel[] = (Object.keys(TurnsDetails) as TurnTypeEnum[]).map((key) => ({
		label: TurnsDetails[key],
		value: key,
	}));

	const disableCycleDays = form.watch("patternType") !== TurnTypeEnum.custom;

	const turnType = form.watch("patternType");
	const frozenValuesRef = useRef<{
		name: string;
		days: TurnDay[];
		cycleDays: string;
		periods: string;
		patternType: TurnTypeEnum;
	} | null>(null);

	if (!frozenValuesRef.current) {
		frozenValuesRef.current = {
			name: form.getValues("name"),
			days: [...form.getValues("days")],
			cycleDays: form.getValues("cycleLengthDays"),
			periods: form.getValues("periods"),
			patternType: form.getValues("patternType") as TurnTypeEnum,
		};
	}
	// function resetDays() {
	// 	if (!frozenValuesRef.current) return;

	// 	const { days, cycleDays, periods, patternType } = frozenValuesRef.current;

	// 	form.setValue("patternType", patternType);
	// 	form.setValue("cycleLengthDays", cycleDays);
	// 	form.setValue("periods", periods);
	// 	form.setValue("days", days);
	// }
	const id = form.watch("id");

	const nameVariants = tv({
		base: "col-span-6 sm:col-span-12 md:col-span-6",
		variants: {
			id: {
				// true: "lg:col-span-5",
				true: "lg:col-span-6",
				false: "lg:col-span-6",
			},
		},
	});
	const periodVariants = tv({
		base: "col-span-6 sm:col-span-4 md:col-span-2",
		variants: {
			id: {
				// true: "lg:col-span-1",
				true: "lg:col-span-2",
				false: "lg:col-span-2",
			},
		},
	});
	const { setValue, getValues } = form
	useEffect(() => {
		if (!turnType) return;
		setValue("cycleLengthDays", turnCycleDaysUseCase(turnType, getValues("cycleLengthDays")));
	}, [turnType, setValue]);

	return (
		<div className="w-full h-full p-1 pt-0 mr-2 flex flex-col gap-4" data-testid="form-turn">
			<div ref={ref}>
				<GridForm className="m-0 p-0 pr-3" gridCol="12">
					<InputForm
						form={form}
						formFieldName="name"
						label="Nome do turno"
						placeholder="Digite o nome do turno"
						classNames={{
							formItem: nameVariants({ id: id !== "" }),
						}}
						description="description"
					/>
					<SelectForm
						form={form}
						formFieldName="patternType"
						label="Tipo"
						placeholder="Selecione o tipo"
						classNames={{ formItem: "col-span-6 sm:col-span-4 md:col-span-2 lg:col-span-2" }}
						datas={TurnsTypeData}
						description="description"
						disabled={!!id}
					/>
					<InputForm
						form={form}
						formFieldName="cycleLengthDays"
						label="Dias de ciclo"
						placeholder="Digite a quantidade de dias"
						classNames={{ formItem: "col-span-6 sm:col-span-4 md:col-span-2 lg:col-span-2" }}
						onlyNumbers
						disabled={disableCycleDays}
						required
						min={1}
						max={365}
						description="description"
					/>
					<SelectForm
						form={form}
						datas={[
							{ label: "1", value: "1" },
							{ label: "2", value: "2" },
							{ label: "3", value: "3" },
							{ label: "4", value: "4" },
							{ label: "5", value: "5" },
							{ label: "6", value: "6" },
						]}
						formFieldName="periods"
						label="Períodos"
						placeholder="Selecione os períodos"
						classNames={{
							formItem: periodVariants({ id: id !== "" }),
						}}
					/>
					{/* {id && (
						<FormItem
							className={
								"w-full flex flex-col justify-end col-span-2 sm:col-span-6 md:col-span-6 lg:col-span-2"
							}
						>
							<Button variant="outline" onClick={() => resetDays()} type="button">
								Reverter
								<RefreshCcw />
							</Button>
						</FormItem>
					)} */}
				</GridForm>
			</div>
			<TurnGrid form={form} height={height - 110} />
		</div>
	);
}
