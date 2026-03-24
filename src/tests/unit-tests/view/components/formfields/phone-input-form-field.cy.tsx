import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { PhoneInputForm } from "@/view/components/formfields/phone-input-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<PhoneInputForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const FormMock = (params: Omit<InputFormParams<any>, "form" | "formFieldName">) => {
		const schema = z.object({
			phone: z.string().min(3),
		});
		const form = useForm({
			values: {
				phone: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			phone: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<PhoneInputForm form={form} formFieldName="phone" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture number and put the format phone mask ", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='phone']");
		input.should("exist").focus().type("9".repeat(20));
		input.should("have.value", "(99) 99999-9999");
	});
	it("When focused, it should capture only numbers typing", () => {
		cy.mount(<FormMock onlyNumbers />);
		const input = cy.get("input[name='phone']");
		input.should("exist").focus().type("abc999def999qwe999qwe99");
		input.should("have.value", "(99) 99999-9999");
	});
	it("Should render HeadGenericComponent", () => {
		cy.mount(<FormMock maxLength={1} HeadGenericComponent={<Clock name="clock" />} />);
		cy.get("svg[name='clock']").should("exist");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="phone" />);
		cy.get("label[for='phone']").should("exist");
	});
	it("It should render OutsideRightChild", () => {
		cy.mount(<FormMock OutsideRightChild={Clock} />);
		cy.get("svg").should("exist");
	});
	it("It should render OutsideLeftChild", () => {
		cy.mount(<FormMock OutsideLeftChild={Clock} />);
		cy.get("svg").should("exist");
	});
	it("It should render rightNote", () => {
		const rightNote = "qweasd";
		cy.mount(<FormMock rightNote={rightNote} />);
		cy.get("p").should("exist").should("have.text", rightNote);
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="phone" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("input[name='phone']").should("have.class", "border-red-500");
		cy.get("label[for='phone']").should("have.class", "text-red-500");
	});
});
