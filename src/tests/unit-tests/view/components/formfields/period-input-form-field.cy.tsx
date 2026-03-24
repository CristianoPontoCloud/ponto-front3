import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { PeriodInputForm } from "@/view/components/formfields/period-input-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
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
					<PeriodInputForm form={form} formFieldName="name" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture to a maximum of 1 number.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='name']");
		input.should("exist").focus().type("1".repeat(2));
		input.should("have.value", "1");
	});
	it("When focused, it should capture to max value os 6.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='name']");
		input.should("exist").focus().type("8");
		input.should("have.value", "6");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="Nome" />);
		cy.get("label[for='name']").should("exist");
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="name" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("input[name='name']").should("have.class", "border-red-500");
		cy.get("label[for='name']").should("have.class", "text-red-500");
	});
});
