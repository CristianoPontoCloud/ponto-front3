import SessionProvider from "@/application/providers/auth/session-provider";
import CacheProvider from "@/application/providers/cache/cache-provider";
import type { MultiSelectFormFieldParams } from "@/domain/components/formfields/mult-select-form";
import type { SelectFormFieldParams } from "@/domain/components/formfields/select-form";
import MultiSelectForm from "@/view/components/formfields/mult-select-form";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { unitTestSessionMock } from "../shared/mocks/session-mock";

describe("<MultiSelectForm />", () => {
	unitTestSessionMock();
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const datas: SelectFormFieldParams<any>["datas"] = Array.from({ length: 10 }).map(() => ({
		label: faker.person.firstName(),
		value: uuidv4(),
	}));
	const FormMock = (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		params: Omit<MultiSelectFormFieldParams<any>, "form" | "formFieldName" | "datas" | "endpoint">,
	) => {
		const schema = z.object({
			name: z.string().min(2),
		});
		const form = useForm({
			values: {
				name: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			name: string;
		}) {
			console.log(data);
		}
		return (
			<SessionProvider>
				<CacheProvider>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
							<MultiSelectForm form={form} formFieldName="name" options={datas} {...params} />
							<Button type="submit">submit</Button>
						</form>
					</Form>
				</CacheProvider>
			</SessionProvider>
		);
	};
	function openSelectList() {
		const selectTrigger = cy.get("button[id=multselect]");
		selectTrigger.click();
	}
	it("Should be render each datas with label write in inner text value", () => {
		cy.mount(<FormMock label="" />);
		openSelectList();
		for (const { label } of datas) {
			cy.get(`div[data-value=${label}]`).should("exist");
		}
	});
	it("When clicking on a name, set the selected value, display a badge with the label, and after three selections, render one badge showing the count of selected values", () => {
		cy.mount(<FormMock label="" />);
		openSelectList();
		let counter = 0;
		for (const { label } of datas) {
			cy.get(`div[data-value=${label}]`).click();
			let itsMax = false;
			cy.get("button[id=multselect]").then(($el) => {
				itsMax = $el.find("button#max-count").length > 0;
				if (itsMax) {
					counter++;
					cy.wrap($el).find("div").contains(`+ ${counter}`).should("exist");
				}
			});
			if (itsMax) {
				cy.get(`div[id=badge-${label}]`).should("exist");
			}
		}
	});
	it("When clicking on 'Select All', render 4 badges: the first three with labels, and one showing the remaining selected values.", () => {
		cy.mount(<FormMock label="" />);
		openSelectList();
		cy.get("div[data-value='Selecionar todos']").should("exist").click();
		cy.get("button[id=multselect]").then(($el) => {
			cy.get(`div[id=badge-${datas[0].label}]`).should("exist");
			cy.get(`div[id=badge-${datas[1].label}]`).should("exist");
			cy.get(`div[id=badge-${datas[2].label}]`).should("exist");
			cy.wrap($el)
				.find("div")
				.contains(`+ ${datas.length - 3}`)
				.should("exist");
		});
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="Nome" />);
		cy.get("label[for='name']").should("exist");
	});
	it("Should change border on click in submit e doesnt click in one tab trigger", () => {
		cy.mount(<FormMock />);
		cy.contains("submit").click();
		cy.get("button.border-red-500");
	});
});
