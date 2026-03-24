import { timeTrackingTypeList } from "@/domain/entities/time-tracking/header-form";
import type { ValueLabel } from "@/domain/value-label";
import ComboboxForm from "@/view/components/formfields/combo-box-form";
import SelectForm from "@/view/components/formfields/select-form";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { Columns3, ListFilter, Printer, UserRound } from "lucide-react";
import { useContextTimeTracking } from "../../provider/time-tracking-provider";
import { useTimeTrackingHeaderForm } from "./use-time-tracking-header-form";

export function TimeTrackingHeader() {
	const { headerForm, collaboratorsQuery } = useContextTimeTracking();

	// function MonthlyFields() {
	// 	return (
	// 		<>
	// 			<MonthPickerForm
	// 				form={headerForm}
	// 				formFieldName="monthlyDate"
	// 				classNames={{ formItem: "w-[242px]" }}
	// 			/>
	// 		</>
	// 	);
	// }
	// function DailyFields() {
	// 	return (
	// 		<>
	// 			<DateForm
	// 				form={headerForm}
	// 				formFieldName="dailyDate"
	// 				classNames={{ formItem: "w-[242px]" }}
	// 			/>
	// 		</>
	// 	);
	// }
	// function TimeTrackingFields() {
	// 	return (
	// 		<>
	// 			<DatePickerRangeForm
	// 				keyDateFrom="dateFrom"
	// 				keyDateTo="dateTo"
	// 				invalidDates={INVALID_DATES}
	// 				form={headerForm}
	// 				classNames={{ formItem: "w-fit" }}
	// 				align="end"
	// 			/>
	// 		</>
	// 	);
	// }
	const { Fields, openUserPreferenceHrDetails } = useTimeTrackingHeaderForm();
	return (
		<Form {...headerForm}>
			<form className="w-full flex items-center justify-between">
				<h1 className="text-2xl font-semibold mr-4">Apurações</h1>
				<div className="flex gap-2 w-full justify-end">
					<SelectForm
						form={headerForm}
						formFieldName="type"
						classNames={{ formItem: "max-w-[150px]" }}
						datas={timeTrackingTypeList}
					/>
					<ComboboxForm
						form={headerForm}
						formFieldName="collaboratorId"
						placeholder="Selecione um collaborador"
						classNames={{
							formItem: "w-full",
							popoverContent: "w-[30vw]",
							commandList: "max-h-[400px] !important",
						}}
						IconLeftOnList={
							<div className="bg-muted-foreground/15 w-6 h-6 flex justify-center items-center rounded-full ">
								<UserRound className="text-muted-foreground" />
							</div>
						}
						datas={
							collaboratorsQuery?.data?.map(
								({ id, name, surname }): ValueLabel => ({ label: `${name} ${surname}`, value: id }),
							) ?? []
						}
						isLoading={collaboratorsQuery?.isLoading}
					/>
					<Fields />
					<Button type="button" size="icon" variant="outline" className="w-14">
						<ListFilter />
					</Button>
					<Button
						type="button"
						size="icon"
						variant="outline"
						className="w-14"
						onClick={() => openUserPreferenceHrDetails()}
					>
						<Columns3 />
					</Button>
					<Button type="button" size="icon" variant="outline" className="w-14">
						<Printer />
					</Button>
					{/* <ScreenToggle className="w-14" /> */}
				</div>
			</form>
		</Form>
	);
}
