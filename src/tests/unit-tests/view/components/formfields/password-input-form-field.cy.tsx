import {
	PasswordInputForm,
	type PasswordInputFormParam,
} from "@/view/components/formfields/password-input-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<PasswordInputForm />", () => {
	const FormMock = (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		params: Omit<PasswordInputFormParam<any>["inputParams"], "form" | "formFieldName">,
	) => {
		const schema = z.object({
			password: z.string().min(3),
		});
		const form = useForm({
			values: {
				password: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			password: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<PasswordInputForm inputParams={{ ...params, form, formFieldName: "password" }} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture any character input up to a maximum of 50 characters.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='password']");
		input.should("exist").focus().type("a".repeat(60));
		input.should("have.value", "a".repeat(50));
	});
	it("When focused, it should capture only numbers typing", () => {
		cy.mount(<FormMock onlyNumbers />);
		const input = cy.get("input[name='password']");
		input.should("exist").focus().type("abc123def456");
		input.should("have.value", "123456");
	});
	it("When focused, it should capture only numbers typing", () => {
		cy.mount(<FormMock onlyNumbers />);
		const input = cy.get("input[name='password']");
		input.should("exist").focus().type("abc123def456");
		input.should("have.value", "123456");
	});
	it("should render button with type-changer id", () => {
		cy.mount(<FormMock />);
		cy.get("button[id='type-changer']").should("exist");
	});
	it("when click type-changer id should change type propriety of input", () => {
		cy.mount(<FormMock />);
		cy.get("input[type='password']").should("exist");
		cy.get("svg#eye").should("exist");

		cy.get("button#type-changer").click();

		cy.get("input[type='text']").should("exist");
		cy.get("svg#eye-off").should("exist");

		cy.get("button#type-changer").click();

		cy.get("input[type='password']").should("exist");
		cy.get("svg#eye").should("exist");
	});
	it("When focused, it should capture maximum especified for max", () => {
		cy.mount(<FormMock maxLength={1} />);
		const input = cy.get("input[name='password']");
		input.should("exist").focus().type("asd");
		input.should("have.value", "a");
	});
	it("Should render HeadGenericComponent", () => {
		cy.mount(<FormMock maxLength={1} HeadGenericComponent={<Clock name="clock" />} />);
		cy.get("svg[name='clock']").should("exist");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="password" />);
		cy.get("label[for='password']").should("exist");
	});
	it("It should render rightNote", () => {
		const rightNote = "qweasd";
		cy.mount(<FormMock rightNote={rightNote} />);
		cy.get("p").should("exist").should("have.text", rightNote);
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="password" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("input[name='password']").should("have.class", "border-red-500");
		cy.get("label[for='password']").should("have.class", "text-red-500");
	});
});
