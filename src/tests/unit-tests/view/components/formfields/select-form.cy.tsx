import SessionProvider from "@/application/providers/auth/session-provider";
import CacheProvider from "@/application/providers/cache/cache-provider";
import type { SelectFormFieldParams } from "@/domain/components/formfields/select-form";
import SelectForm from "@/view/components/formfields/select-form";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { unitTestSessionMock } from "../shared/mocks/session-mock";

describe("<SelectForm />", () => {
	unitTestSessionMock();
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const datas: SelectFormFieldParams<any>["datas"] = Array.from({ length: 10 }).map(() => ({
		label: faker.person.firstName(),
		value: uuidv4(),
	}));
	const FormMock = (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		params: Omit<SelectFormFieldParams<any>, "form" | "formFieldName" | "datas" | "endpoint">,
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
							<SelectForm form={form} formFieldName="name" datas={datas} {...params} />
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
	it("Should be render each datas with label write in inner text value", () => {
		cy.mount(<FormMock label="" />);
		openSelectList();
		for (const { label } of datas) {
			cy.get("div[dir=ltr]").then(($el) => {
				$el.find(`span:contains('${label}')`);
			});
		}
	});
	it("When click in name put the value selected in trigger select ", () => {
		cy.mount(<FormMock label="" />);
		for (const { label } of datas) {
			openSelectList();
			cy.get("div[dir=ltr]").then(($el) => {
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
		cy.mount(<FormMock label="Nome" />);
		cy.get("label[for='name']").should("exist");
	});
	it("Should change border on click in submit e doesnt click in one tab trigger", () => {
		cy.mount(<FormMock />);
		cy.contains("submit").click();
		cy.get("button.border-red-500");
	});
});
