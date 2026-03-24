import type { LabelFormParams } from "@/domain/components/formfields/label-form";
import { LabelForm } from "@/view/components/formfields/label-form";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<LabelForm />", () => {
	const FormMock = ({
		label,
		formFieldName,
		hasError,
		required,
		disabled,
		description,
	}: LabelFormParams) => {
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
					<LabelForm
						formFieldName={formFieldName}
						label={label}
						hasError={hasError}
						required={required}
						disabled={disabled}
						description={description}
					/>
					<Input id={formFieldName} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	function getLabelTextAndFormFieldName() {
		const labelText = "Nome";
		const formFieldName = "name";
		return {
			labelText,
			formFieldName,
		};
	}

	it("Should render a label that has the same text as the label parameter", () => {
		const { formFieldName, labelText } = getLabelTextAndFormFieldName();
		cy.mount(<FormMock label={labelText} formFieldName={formFieldName} />);
		cy.contains("label", labelText).should("exist");
	});
	it("When clicking on the label it should focus on the input with the id equal to the form Field Name parameter", () => {
		const { formFieldName, labelText } = getLabelTextAndFormFieldName();
		cy.mount(<FormMock label={labelText} formFieldName={formFieldName} />);
		const label = cy.get("label");
		label.should("exist").click();
		const input = cy.get(`input[id=${formFieldName}]`);
		input.should("exist").should("be.focused");
	});
	it("Should not render the label if the label parameter n is declared", () => {
		cy.mount(<FormMock />);
		cy.contains("label").should("not.exist");
	});
	it("should turn red when parametor hasError is true", () => {
		const { formFieldName, labelText } = getLabelTextAndFormFieldName();
		cy.mount(<FormMock label={labelText} formFieldName={formFieldName} hasError={true} />);
		cy.get("label").should("have.class", "text-red-500");
	});
	it("should render label with disabled status", () => {
		const { formFieldName, labelText } = getLabelTextAndFormFieldName();
		cy.mount(<FormMock label={labelText} formFieldName={formFieldName} disabled />);
		cy.get("label").should("have.class", "peer-disabled:cursor-not-allowed");
	});
	it("should render the label with circle-help svg", () => {
		const { formFieldName, labelText } = getLabelTextAndFormFieldName();
		cy.mount(<FormMock label={labelText} formFieldName={formFieldName} description="teste" />);
		cy.get("svg[id=circle-help]").should("exist");
	});
});
