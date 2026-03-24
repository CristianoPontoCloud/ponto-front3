import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<TextAreaForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const FormMock = (params: Omit<InputFormParams<any>, "form" | "formFieldName">) => {
		const schema = z.object({
			name: z.string().min(3),
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
					<TextAreaForm form={form} formFieldName="name" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture any character input up to a maximum of 50 characters.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("textarea[name='name']");
		input.should("exist").focus().type("a".repeat(510));
		input.should("have.value", "a".repeat(500));
	});
	it("When focused, it should capture maximum especified for max", () => {
		cy.mount(<FormMock maxLength={1} />);
		const input = cy.get("textarea[name='name']");
		input.should("exist").focus().type("asd");
		input.should("have.value", "a");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="Nome" />);
		cy.get("label[for='name']").should("exist");
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="name" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("textarea[name='name']").should("have.class", "border-red-500");
		cy.get("label[for='name']").should("have.class", "text-red-500");
	});
});
