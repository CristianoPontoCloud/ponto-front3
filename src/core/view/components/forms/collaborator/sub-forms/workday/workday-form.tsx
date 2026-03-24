import { Tabs, TabsList, TabsTrigger } from "@/view/components/ui/tabs";
import { useWorkDayForm } from "./use-workday-form";

export default function WorkDayForm() {
	const { TabRender, onTabChange } = useWorkDayForm();

	return (
		<div className="w-full flex flex-col gap-4" data-testid="form-collaborator-workday">
			<Tabs
				defaultValue="turn"
				onValueChange={(e) => onTabChange(e as "turn" | "extraHour" | "hourBank")}
				data-testid="tabs"
			>
				<TabsList className="w-full">
					<TabsTrigger value={"turn"} className="w-full" type="button">
						Turno
					</TabsTrigger>
					<TabsTrigger value={"extraHour"} className="w-full" type="button">
						Hora extra
					</TabsTrigger>
					<TabsTrigger value={"hourBank"} className="w-full" type="button">
						Banco de horas
					</TabsTrigger>
				</TabsList>
			</Tabs>
			{TabRender}
			{/* <GridForm className="mt-0">
				<Label className="text-muted-foreground col-span-2">Jornada de trabalho</Label>
				<SelectForm
					form={form}
					placeholder="Selecione o horário"
					formFieldName="hour"
					label="Horário"
					classNames={{ formItem: "w-full" }}
					datas={horarioOption}
					required
				/>
				<DateForm
					form={form}
					placeholder="Selecione a data"
					formFieldName="dtStartValidityHour"
					label="Início da vigência do horário"
					classNames={{ formItem: "w-full" }}
					required
				/>
				<SelectForm
					form={form}
					placeholder="Selecione a posição"
					formFieldName="positionCycle"
					label="Posição do cíclo"
					classNames={{ formItem: "w-full" }}
					datas={cicloOption}
					required
				/>
			</GridForm>
			<Separator className="w-full h-[1px] bg-muted" />
			<GridForm>
				<SelectForm
					form={form}
					placeholder="Selecione"
					formFieldName="extraBankHour"
					label="Extra/banco de horas"
					classNames={{ formItem: "w-full" }}
					datas={extraBancoOption}
					required
				/>
				<DateForm
					form={form}
					placeholder="Selecione a data"
					formFieldName="dtStartValidityExtraHour"
					label="Início da vigência extra/banco de horas"
					classNames={{ formItem: "w-full" }}
					required
				/>
			</GridForm> */}
		</div>
	);
}
