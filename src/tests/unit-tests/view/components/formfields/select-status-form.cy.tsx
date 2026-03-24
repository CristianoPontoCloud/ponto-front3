import SessionProvider from "@/application/providers/auth/session-provider";
import CacheProvider from "@/application/providers/cache/cache-provider";
import type { SelectStatusFormFieldParams } from "@/domain/components/formfields/select-status-form";
import SelectStatusForm, {
	SelectStatusFormDatasDefault,
} from "@/view/components/formfields/select-status-form";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { unitTestSessionMock } from "../shared/mocks/session-mock";

describe("<SelectStatusForm />", () => {
	unitTestSessionMock();
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const customDatas: SelectStatusFormFieldParams<any>["customDatas"] = Array.from({
		length: 3,
	}).map(() => ({
		label: faker.person.firstName(),
		value: uuidv4(),
	}));
	const colors = ["bg-purple-500", "bg-sky-500", "bg-orange-500"];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const customStatus: SelectStatusFormFieldParams<any>["customStatus"] = customDatas.map(
		({ value }, index) => ({
			value,
			color: colors[index],
		}),
	);

	const FormMock = (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		params: Omit<SelectStatusFormFieldParams<any>, "form" | "formFieldName">,
	) => {
		const schema = z.object({
			status: z.string().min(2),
		});
		const form = useForm({
			values: {
				status: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			status: string;
		}) {
			console.log(data);
		}
		return (
			<SessionProvider>
				<CacheProvider>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
							<SelectStatusForm form={form} formFieldName="status" {...params} />
							<Button type="submit">submit</Button>
						</form>
					</Form>
				</CacheProvider>
			</SessionProvider>
		);
	};
	function openSelectList() {
		const selectTrigger = cy.get("button[role=combobox]");
		selectTrigger.click();
	}
	it("Each active and inactive option should be rendered when the datas parameter is not provided.", () => {
		cy.mount(<FormMock />);
		openSelectList();
		for (const { label } of SelectStatusFormDatasDefault) {
			cy.get("div[dir=ltr]").then(($el) => {
				const active = $el.find(`span:contains('${label}')`);
				cy.wrap(active).should("exist");
			});
		}
	});
	it("Each values in customDatas should be rendered when the datas parameter is not provided.", () => {
		cy.mount(<FormMock customDatas={customDatas} customStatus={customStatus} />);
		openSelectList();
		for (const { label, value } of customDatas) {
			cy.get("div[dir=ltr]").then(($el) => {
				const span = $el.find(`span:contains('${label}')`);
				cy.wrap(span).should("exist");
				const status = customStatus.find((params) => params.value === value);
				const divColor = $el.find(`#${status?.color}`);
				cy.wrap(divColor).should("exist");
			});
		}
	});
	it("When click in name put the value selected in trigger select with customDatas", () => {
		cy.mount(<FormMock customDatas={customDatas} customStatus={customStatus} />);
		for (const { label } of customDatas) {
			openSelectList();
			cy.get("div[dir=ltr]").then(($el) => {
				const span = $el.find(`span:contains('${label}')`);
				cy.wrap(span).should("exist").click();
			});
			cy.get("button[role=combobox]").then(($el) => {
				const span = $el.find(`span:contains('${label}')`);
				cy.wrap(span).should("exist");
			});
		}
	});
	it("When click in name put the value selected in trigger select ", () => {
		cy.mount(<FormMock label="" />);
		for (const { label } of SelectStatusFormDatasDefault) {
			openSelectList();
			cy.get("div[dir=ltr]").then(($el) => {
				console.log(label);
				const span = $el.find(`span:contains('${label}')`);
				cy.wrap(span).click();
			});
			cy.get("button[role=combobox]").then(($el) => {
				const span = $el.find(`span:contains('${label}')`);
				cy.wrap(span).should("exist");
			});
		}
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="Status" />);
		cy.get("label[for='status']").should("exist");
	});
	it("Should change border on click in submit e doesnt click in one tab trigger", () => {
		cy.mount(<FormMock />);
		cy.contains("submit").click();
		cy.get("button.border-red-500");
	});
});
