import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { SearchForm } from "@/view/components/formfields/search-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<PeriodInputForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const FormMock = (params: Omit<InputFormParams<any>, "form" | "formFieldName">) => {
		const schema = z.object({
			name: z.string().min(1),
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
					<SearchForm form={form} formFieldName="name" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture any character input up to a maximum of 50 characters.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='name']");
		input.should("exist").focus().type("a".repeat(60));
		input.should("have.value", "a".repeat(50));
	});
	it("When focused, it should capture maximum especified for max", () => {
		cy.mount(<FormMock maxLength={1} />);
		const input = cy.get("input[name='name']");
		input.should("exist").focus().type("asd");
		input.should("have.value", "a");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="Nome" />);
		cy.get("label[for='name']").should("exist");
	});
	it("It should render OutsideRightChild", () => {
		cy.mount(<FormMock OutsideRightChild={Clock} />);
		cy.get("svg").should("exist");
	});
	it("It should render OutsideLeftChild", () => {
		cy.mount(<FormMock OutsideLeftChild={Clock} />);
		cy.get("svg").should("exist");
	});
});
