import { CnpjInputForm } from "@/view/components/formfields/cnpj-input-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
describe("<CnpjInputForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	type CnpjInputFormParams = Parameters<typeof CnpjInputForm>;
	const FormMock = (params: Omit<CnpjInputFormParams["0"], "form" | "formFieldName">) => {
		const schema = z.object({
			cnpj: z.string().min(18),
		});
		const form = useForm({
			values: {
				cnpj: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			cnpj: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<CnpjInputForm form={form} formFieldName="cnpj" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture only numbers input up to and format to CNPJ mask 11.111.111/1111-11.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='cnpj']");
		input.should("exist").focus().type("1".repeat(22));
		input.should("have.value", "11.111.111/1111-11");
	});
	it("When focused, it should not capture letters and simbols", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='cnpj']");
		input.should("exist").focus().type("@#/`'{[(-!@#$%^&*=+-;:><,./?|");
		input.should("have.value", "");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="CNPJ" />);
		cy.get("label[for='cnpj']").should("exist");
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
		cy.mount(<FormMock label="CEP" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("input[name='cnpj']").should("have.class", "border-red-500");
		cy.get("label[for='cnpj']").should("have.class", "text-red-500");
	});
});
