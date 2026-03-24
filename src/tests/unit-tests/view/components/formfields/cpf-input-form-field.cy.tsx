import { CpfInputForm } from "@/view/components/formfields/cpf-input-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
describe("<CpfCnpjInputForm />", () => {
	type CpfInputFormParams = Parameters<typeof CpfInputForm>;
	const FormMock = (params: Omit<CpfInputFormParams["0"], "form" | "formFieldName">) => {
		const schema = z.object({
			cpf: z.string().min(14),
		});
		const form = useForm({
			values: {
				cpf: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			cpf: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<CpfInputForm form={form} formFieldName="cpf" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture only numbers input up to and format to CPF mask 111.111.111-11.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='cpf']");
		input.should("exist").focus().type("1".repeat(12));
		input.should("have.value", "111.111.111-11");
	});
	it("When focused, it should capture only numbers input up to and format to CPF mask 111.111.111-11.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='cpf']");
		input.should("exist").focus().type("1".repeat(12));
		input.should("have.value", "111.111.111-11");
	});
	it("When focused, it should not capture letters and simbols", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='cpf']");
		input.should("exist").focus().type("@#/`'{[(-!@#$%^&*=+-;:><,./?|");
		input.should("have.value", "");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="CPF" />);
		cy.get("label[for='cpf']").should("exist");
	});
	it("It should render OutsideRightChild", () => {
		cy.mount(<FormMock OutsideRightChild={Clock} />);
		cy.get("svg").should("exist");
	});
	it("It should render OutsideLeftChild", () => {
		cy.mount(<FormMock OutsideLeftChild={Clock} />);
		cy.get("svg").should("exist");
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="CPF" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("input[name='cpf']").should("have.class", "border-red-500");
		cy.get("label[for='cpf']").should("have.class", "text-red-500");
	});
});
