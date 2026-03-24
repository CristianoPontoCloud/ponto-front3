import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { PortIpInputForm } from "@/view/components/formfields/port-ip-input-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<PortIpInputForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const FormMock = (params: Omit<InputFormParams<any>, "form" | "formFieldName">) => {
		const schema = z.object({
			port: z.string().min(5),
		});
		const form = useForm({
			values: {
				port: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			port: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<PortIpInputForm form={form} formFieldName="port" label="port" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture any character input up to a maximum of 5 digits.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input");
		input.should("exist").focus().type("1".repeat(10));
		input.should("have.value", "1".repeat(5));
	});
	it("When focused, it should capture only numbers typing", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input");
		input.should("exist").focus().type("abc123def45");
		input.should("have.value", "12345");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="port" />);
		cy.get("label[for='port']").should("exist");
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="port" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("input").should("have.class", "border-red-500");
		cy.get("label[for='port']").should("have.class", "text-red-500");
	});
});
