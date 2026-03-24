import type { SelectTabsFormFieldParams } from "@/domain/components/formfields/select-tabs-form";
import SelectTabsForm from "@/view/components/formfields/select-tabs-form";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

describe("<SelectTabsForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const options: SelectTabsFormFieldParams<any>["options"] = Array.from({ length: 10 }).map(() => ({
		label: faker.person.firstName(),
		value: uuidv4(),
	}));
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const FormMock = (params: Omit<SelectTabsFormFieldParams<any>, "form" | "formFieldName">) => {
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
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<SelectTabsForm form={form} formFieldName="name" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("Should be render each options with label write in inner text value", () => {
		cy.mount(<FormMock options={options} />);
		for (const { label } of options) {
			cy.contains(label).should("have.prop", "tagName", "BUTTON");
		}
	});
	it("Should change background on click in option", () => {
		cy.mount(<FormMock options={options} />);
		for (const { label } of options) {
			const button = cy.get(`button[name='tabs-trigger-${label}']`);
			button.click();
			button.should("have.class", "data-[state=active]:bg-background");
		}
	});
	it("Should change border on click in submit e doesnt click in one tab trigger", () => {
		cy.mount(<FormMock options={options} />);
		cy.contains("submit").click();
		cy.get("div.border-red-500");
	});
});
