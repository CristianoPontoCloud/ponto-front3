import { CepInputForm } from "@/view/components/formfields/cep-input-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
describe("<CepInputForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	type CepInputFormParams = Parameters<typeof CepInputForm>;
	const FormMock = (params: Omit<CepInputFormParams["0"], "form" | "formFieldName">) => {
		const schema = z.object({
			cep: z.string().min(9),
		});
		const form = useForm({
			values: {
				cep: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			cep: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<CepInputForm form={form} formFieldName="cep" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture only numbers input up to and format to CEP mask 12345-678.", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='cep']");
		input.should("exist").focus().type("1".repeat(15));
		input.should("have.value", "11111-111");
	});
	it("When focused, it should not capture letters and simbols", () => {
		cy.mount(<FormMock />);
		const input = cy.get("input[name='cep']");
		input.should("exist").focus().type("a@#/`'{[(-!@#$%^&*=+-_;:><,./?|");
		input.should("have.value", "");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="CEP" />);
		cy.get("label[for='cep']").should("exist");
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
		cy.get("input[name='cep']").should("have.class", "border-red-500");
		cy.get("label[for='cep']").should("have.class", "text-red-500");
	});
});
