import { IrregularitiesTypeEnum } from "@/domain/entities/irregularities/irregularities";
import DatePickerRangeForm from "@/view/components/formfields/date-picker-range-form-field";
import { SearchForm } from "@/view/components/formfields/search-form-field";
import { ScreenToggle } from "@/view/components/toggles/screen-toggles";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/view/components/ui/tabs";
import { Building2, Columns3, ListFilter, Printer, UserRound } from "lucide-react";
import type { DayPickerBase } from "react-day-picker";
import { useContextIrregularities } from "./irregularities-provider";

export function IrregularitiesHeader() {
	const { COMPANY, MY } = IrregularitiesTypeEnum;
	const invalidDatesDatePickerRange: DayPickerBase["disabled"] = [
		(date) => date > new Date(),
		(date) => {
			const today = new Date();
			const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

			return date < threeMonthsAgo;
		},
	];
	const { form } = useContextIrregularities();
	const type = form.watch("type");

	return (
		<Form {...form}>
			<form className="w-full flex items-center justify-between">
				<h1 className="text-2xl font-semibold mr-4">Ocorrências</h1>
				<div className="flex gap-2 w-full justify-end">
					<SearchForm
						form={form}
						formFieldName="search"
						classNames={{ formItem: "min-w-[300px] w-[20vw] " }}
					/>
					<DatePickerRangeForm
						keyDateFrom="dateFrom"
						keyDateTo="dateTo"
						invalidDates={invalidDatesDatePickerRange}
						form={form}
						classNames={{ formItem: "min-w-[234px] w-fit" }}
						align="end"
					/>
					<Button type="button" size="icon" variant="outline" className="w-10">
						<ListFilter />
					</Button>
					<Button type="button" size="icon" variant="outline" className="w-10" onClick={() => {}}>
						<Columns3 />
					</Button>
					<Button type="button" size="icon" variant="outline" className="w-10">
						<Printer />
					</Button>
					<Tabs
						value={type}
						onValueChange={(e) => {
							form.setValue("type", e as IrregularitiesTypeEnum);
						}}
						data-testid="tabs"
					>
						<TabsList className="w-full">
							<TabsTrigger value={MY} className="w-full gap-1" type="button">
								<UserRound className="w-[15px] h-[15px]" /> Minhas
							</TabsTrigger>
							<TabsTrigger value={COMPANY} className="w-full gap-1" type="button">
								<Building2 className="w-[15px] h-[15px]" /> Empresa
							</TabsTrigger>
						</TabsList>
					</Tabs>
					<ScreenToggle className="w-10" />
				</div>
			</form>
		</Form>
	);
}
