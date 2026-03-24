import type { CheckboxFormParams } from "@/domain/components/formfields/checkbox-form";
import { CheckboxForm } from "@/view/components/formfields/checkbox-form";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<CheckboxForm />", () => {
	interface FormMockParams {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		checkboxParams: Omit<CheckboxFormParams<any>, "form" | "formFieldName">;
		initialValue?: boolean;
	}
	const FormMock = ({ checkboxParams, initialValue = false }: FormMockParams) => {
		const schema = z.object({
			hasPis: z.literal(true),
		});
		const form = useForm({
			values: {
				hasPis: initialValue,
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			hasPis: boolean;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<CheckboxForm form={form} formFieldName="hasPis" {...checkboxParams} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When clicking on the checkbox that is not selected, it should change the value to true.", () => {
		cy.mount(<FormMock checkboxParams={{ label: "Possui PIS?" }} />);
		const checkbox = cy.get("button[role='checkbox']");
		checkbox.click();
		checkbox.should("have.value", "true");
	});
	it("When clicking on the checkbox that is selected, it should change the value to false.", () => {
		cy.mount(<FormMock checkboxParams={{ label: "Possui PIS?" }} initialValue={true} />);
		const checkbox = cy.get("button[role='checkbox']");
		checkbox.click();
		checkbox.should("have.value", "false");
	});
	it("It should render label", () => {
		cy.mount(<FormMock checkboxParams={{ label: "Possui PIS?" }} />);
		cy.get("label").should("exist").should("have.text", "Possui PIS?");
	});
	it("It should render red border on submit and not respect validation", () => {
		cy.mount(<FormMock checkboxParams={{ label: "Possui PIS?" }} />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("button[role='checkbox']").should("have.class", "border-red-500");
		cy.get("label[for='hasPis']").should("have.class", "text-destructive");
	});
});
