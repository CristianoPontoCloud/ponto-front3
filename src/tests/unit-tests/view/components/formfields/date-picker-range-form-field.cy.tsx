import type { DatePickerRangeFormFieldParams } from "@/domain/components/formfields/date-range-form-field";
import DatePickerRangeForm from "@/view/components/formfields/date-picker-range-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<DatePickerRangeForm />", () => {
	const FormMock = (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		params: Omit<DatePickerRangeFormFieldParams<any>, "form" | "keyDateFrom" | "keyDateTo">,
	) => {
		const schema = z.object({
			dateTo: z.date(),
			dateFrom: z.date(),
		});
		const form = useForm({
			values: {
				dateTo: null,
				dateFrom: null,
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			dateTo: Date | null;
			dateFrom: Date | null;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<DatePickerRangeForm
						form={form}
						keyDateFrom="dateFrom"
						keyDateTo="dateTo"
						placeholder="date"
						{...params}
					/>
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	function openCallendar() {
		cy.get("button[id='date']").should("be.visible").click();
	}
	function changeMonthTo(type: "previous" | "next") {
		cy.get(`button[name='${type}-month']`).click();
	}
	function changeYearTo(type: "previous" | "next") {
		Cypress._.times(12, () => {
			return changeMonthTo(type);
		});
	}
	const calendarClassStart = ".rdp-caption_start";
	const calendarClassEnd = ".rdp-caption_end";
	it("When click in input open calendar.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		cy.get("div[role=dialog]").should("exist");
	});
	it("Should render indicator with month for start month.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const date = new Date();
		const currentMonth = date.toLocaleString("pt-BR", { month: "long" });
		cy.get(calendarClassStart).within(() => {
			cy.contains("div", `${currentMonth} ${date.getFullYear()}`).should("exist");
		});
	});
	it("Should render indicator with month for end month.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const date = new Date();
		date.setMonth(date.getMonth() + 1);
		const nextMonth = date.toLocaleString("pt-BR", { month: "long" });
		cy.get(calendarClassEnd).within(() => {
			cy.contains("div", `${nextMonth} ${date.getFullYear()}`).should("exist");
		});
	});
	it("Should change yaer indicator to  change 12 months previous.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const date = new Date();
		date.setFullYear(date.getFullYear() - 1);
		const currentMonth = date.toLocaleString("pt-BR", { month: "long" });
		changeYearTo("previous");
		cy.get(calendarClassStart).within(() => {
			cy.contains("div", `${currentMonth} ${date.getFullYear()}`).should("exist");
		});
		date.setMonth(date.getMonth() + 1);
		cy.get(calendarClassStart).within(() => {
			cy.contains("div", `${currentMonth} ${date.getFullYear()}`).should("exist");
		});
	});
	it("Should render button for each days in month start.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const date = new Date();
		cy.get(calendarClassStart).within(() => {
			const lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
			Cypress._.times(lastDay, (item) => {
				cy.contains("button", (item + 1).toString()).should("exist");
			});
		});
	});
	it("Should render button for each days in month end.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const date = new Date();
		date.setMonth(date.getMonth() + 1);
		cy.get(calendarClassEnd).within(() => {
			const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
			Cypress._.times(lastDay, (item) => {
				cy.contains("button", (item + 1).toString()).should("exist");
			});
		});
	});
	it("Should set bg color of day buttons selected to primary color.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		cy.get(calendarClassEnd).within(() => {
			cy.contains("button", "10").should("exist").click();
			cy.contains("button", "20").should("exist").click();
			cy.contains("button", "10").should("have.class", "bg-primary");
			cy.contains("button", "20").should("have.class", "bg-primary");
		});
	});
	it("Should set bg color of day buttons selected in diferent months to primary color.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		cy.get(calendarClassEnd).within(() => {
			cy.contains("button", "10").should("exist").click();
			cy.contains("button", "10").should("have.class", "bg-primary");
		});
		cy.get(calendarClassEnd).within(() => {
			cy.contains("button", "10").should("exist").click();
			cy.contains("button", "10").should("have.class", "bg-primary");
		});
	});
	it("In the calendar when click in day button should render in input full date in br format.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		cy.get(calendarClassEnd).within(() => {
			cy.contains("button", "10").should("exist").click();
			cy.contains("button", "10").should("have.class", "bg-primary");
		});
		cy.get(calendarClassEnd).within(() => {
			cy.contains("button", "10").should("exist").click();
			cy.contains("button", "10").should("have.class", "bg-primary");
		});
	});
	it("Should render text button in this format 'dd/MM/yyyy' after select first date .", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const date = new Date();
		date.setDate(10);
		cy.get(calendarClassStart).within(() => {
			cy.contains("button", "10").click();
		});
		cy.contains("button", format(date, "dd/MM/yyyy")).click();
	});
	it("Should render text in input after select two dates in this format 'dd/MM/yyyy - dd/MM/yyyy'", () => {
		cy.mount(<FormMock />);
		openCallendar();
		cy.get(calendarClassStart).within(() => {
			cy.contains("button", "10").should("exist").click();
			cy.contains("button", "20").should("exist").click();
		});
		const date = new Date();
		const dateFrom = new Date(date.getFullYear(), date.getMonth(), 10);
		const dateTo = new Date(date.getFullYear(), date.getMonth(), 20);
		const labelTo = format(dateTo, "dd/MM/yyyy");
		const labelFrom = format(dateFrom, "dd/MM/yyyy");
		cy.contains("button", `${labelFrom} - ${labelTo}`).should("exist");
	});
	it("Should render text button 'date' after unselect dates.", () => {
		const placeholder = "data";
		cy.mount(<FormMock placeholder={placeholder} />);
		openCallendar();
		const date = new Date();
		date.setDate(10);
		cy.get(calendarClassStart).within(() => {
			cy.contains("button", "10").click();
			cy.contains("button", "10").click();
			cy.contains("button", "10").click();
		});
		cy.contains("button", placeholder).click();
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="date" />);
		cy.get("label[for='date']").should("exist");
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="date" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("button[id='date']").should("have.class", "border-red-500");
		cy.get("label[for='date']").should("have.class", "text-red-500");
	});
});
