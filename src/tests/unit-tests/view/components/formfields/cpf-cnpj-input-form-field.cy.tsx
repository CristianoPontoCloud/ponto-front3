import { CpfCnpjInputForm } from "@/view/components/formfields/cpf-cnpj-input-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
describe("<CpfCnpjInputForm />", () => {
	type CpfCnpjInputFormParams = Parameters<typeof CpfCnpjInputForm>;
	const FormMock = (params: Omit<CpfCnpjInputFormParams["0"], "form" | "formFieldName">) => {
		const schema = z
			.object({
				cpfCnpj: z.string().min(14),
			})
			.refine(
				(data) => {
					const length = data.cpfCnpj.length;
					return length === 14 || length === 18;
				},
				{
					message: "Passwords must match",
					path: ["confirmPassword"],
				},
			);
		const form = useForm({
			values: {
				cpfCnpj: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			cpfCnpj: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<CpfCnpjInputForm form={form} formFieldName="cpfCnpj" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture only numbers input up to and format to CNPJ mask 11.111.111/1111-11.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='cpfCnpj']");
		input.should("exist").focus().type("1".repeat(22));
		input.should("have.value", "11.111.111/1111-11");
	});
	it("When focused, it should capture only numbers input up to and format to CPF mask 111.111.111-11.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='cpfCnpj']");
		input.should("exist").focus().type("1".repeat(11));
		input.should("have.value", "111.111.111-11");
	});
	it("When focused, it should not capture letters and simbols", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='cpfCnpj']");
		input.should("exist").focus().type("@#/`'{[(-!@#$%^&*=+-;:><,./?|");
		input.should("have.value", "");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="CPF/CNPJ" />);
		cy.get("label[for='cpfCnpj']").should("exist");
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
		cy.mount(<FormMock label="CPF/CNPJ" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("input[name='cpfCnpj']").should("have.class", "border-red-500");
		cy.get("label[for='cpfCnpj']").should("have.class", "text-red-500");
	});
});
