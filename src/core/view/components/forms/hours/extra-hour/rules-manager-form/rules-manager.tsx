import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";

import { extraHourAccumulatedMap } from "@/domain/entities/extra-hour/enums/extra-hour-accumulated-enum";
import {
	ExtraHourDayEnum,
	extraHourDayMap,
} from "@/domain/entities/extra-hour/enums/extra-hour-days-enum";
import { extraHourHolidaysMap } from "@/domain/entities/extra-hour/enums/extra-hour-holidays-enum";
import { extraHourNightMap } from "@/domain/entities/extra-hour/enums/extra-hour-nightly-enum";
import { GridForm } from "@/view/components/formfields/grid-from";
import SelectForm from "@/view/components/formfields/select-form";
import { WeekDaysSelectForm } from "@/view/components/formfields/week-days-select-form-field";
import { Button } from "@/view/components/ui/button";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { Separator } from "@/view/components/ui/separator";
import {
	SheetOverSheet,
	SheetOverSheetContent,
	SheetOverSheetHeader,
	SheetOverSheetTitle,
	SheetOverSheetTrigger,
} from "@/view/components/ui/sheet-over-sheet";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { FormProvider } from "react-hook-form";
import { ExtraHourRulesManagerGrid } from "../ranges-manager-grid/range-manager-grid";
import type { extraHourRulesGridController } from "../rules-grid/extra-hour-grid-controller";
import { RulesManagerSheetFooter } from "./rules-manager-footer";
import { useRulesManager } from "./use-rules-manager";

interface SheetRulesManagerParams {
	controller: extraHourRulesGridController;
}

export function SheetRulesManager({ controller }: SheetRulesManagerParams) {
	const { rulesManagerForm, createNewRule, submitRules } = useRulesManager(controller);
	const grid = "col-span-6 sm:col-span-6 md:col-span-2 lg:col-span-2";
	const headerRef = useRef<HTMLDivElement>(null);
	const height = useBottomOffset(headerRef);
	return (
		<SheetOverSheet open={controller.openOverSheet}>
			<SheetOverSheetTrigger asChild>
				<Button
					variant="outline"
					type="button"
					className="w-full"
					onClick={() => {
						controller.openNewRulesGrid();
					}}
				>
					<Plus /> Regra
				</Button>
			</SheetOverSheetTrigger>
			<SheetOverSheetContent
				setClose={() => controller.setOpenOverSheet(false)}
				forceMount
				autoFocus={false}
				onInteractOutside={(e) => {
					const { originalEvent } = e.detail;
					if (
						originalEvent.target instanceof Element &&
						originalEvent.target.closest(".group.toast")
					) {
						e.preventDefault();
					}
				}}
				style={{
					minWidth: "92vw",
					height: "100%",
				}}
			>
				<SheetOverSheetHeader className="px-1">
					<SheetOverSheetTitle>
						{controller.isEditRule ? "Gerenciar regra" : "Nova regra"}
					</SheetOverSheetTitle>
				</SheetOverSheetHeader>
				<Separator className="w-full h-[1px] bg-muted my-4 px-1" />
				<ScrollArea className="relative h-full w-full">
					<FormProvider {...rulesManagerForm}>
						<form className="h-full px-1">
							<GridForm className="mt-0" gridCol="11">
								<div
									className={"col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4 flex gap-4"}
									ref={headerRef}
								>
									<SelectForm
										form={rulesManagerForm}
										label="Dias"
										formFieldName="day"
										datas={extraHourDayMap}
										description="description"
									/>
									<WeekDaysSelectForm
										form={rulesManagerForm}
										label="Dia específico"
										formFieldName="specificDays"
										description="description"
										disabled={rulesManagerForm.watch("day") !== ExtraHourDayEnum.SPECIFIC_DAYS}
									/>
								</div>
								<SelectForm
									form={rulesManagerForm}
									label="Feriado"
									formFieldName="holiday"
									classNames={{ formItem: grid }}
									description="description"
									datas={extraHourHolidaysMap}
								/>
								<SelectForm
									form={rulesManagerForm}
									label="Noturno"
									formFieldName="nightly"
									classNames={{ formItem: grid }}
									description="description"
									datas={extraHourNightMap}
								/>

								<SelectForm
									form={rulesManagerForm}
									label="Acumulação"
									formFieldName="accumulated"
									classNames={{ formItem: grid }}
									description="description"
									datas={extraHourAccumulatedMap}
								/>
								<div className="flex items-end h-full w-full ">
									<Button
										variant="outline"
										type="button"
										className="w-full"
										onClick={() => createNewRule()}
									>
										<Plus /> faixa
									</Button>
								</div>
							</GridForm>
							<ExtraHourRulesManagerGrid
								overSheetIsOpen={controller.openOverSheet}
								form={rulesManagerForm}
								height={height}
							/>
							<RulesManagerSheetFooter
								closeOverSheet={() => controller.setOpenOverSheet(false)}
								submitRules={() => submitRules()}
							/>
						</form>
					</FormProvider>
				</ScrollArea>
			</SheetOverSheetContent>
		</SheetOverSheet>
	);
}
