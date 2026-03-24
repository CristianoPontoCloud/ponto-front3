import type { SwitchFormParams } from "@/domain/components/formfields/switch-form-field";
import { SwitchForm } from "@/view/components/formfields/switch-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<SwitchForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const FormMock = (params: Omit<SwitchFormParams<any>, "form" | "formFieldName">) => {
		const schema = z.object({
			hasPis: z.boolean(),
		});
		const form = useForm({
			values: {
				hasPis: false,
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
					<SwitchForm form={form} formFieldName="hasPis" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When clicked should change value of aria-checked props", () => {
		cy.mount(<FormMock />);
		cy.get("button[role='switch']").should("exist");
		cy.get("button[aria-checked='false']").should("exist").click();
		cy.get("button[aria-checked='true']").should("exist");
	});
	it("When clicked should change position of span with id switch-circle in horizontal sides", () => {
		cy.mount(<FormMock />);
		const spanCircle = cy.get("span[id='switch-circle']");
		let startPosition = 0;
		let endPosition = 0;
		spanCircle.then(($el) => {
			const rect = $el[0].getBoundingClientRect();
			startPosition = rect.left;
		});
		cy.get("button[role='switch']").click();
		spanCircle.then(($el) => {
			const rect = $el[0].getBoundingClientRect();
			endPosition = rect.left;
			expect(endPosition).not.eq(startPosition);
		});
		cy.get("button[role='switch']").click();
		spanCircle.then(($el) => {
			const position = $el[0].getBoundingClientRect().left;
			expect(position).not.eq(endPosition);
		});
		it("should render label is same text with the propretie label", () => {
			const label = "teste";
			cy.mount(<FormMock label={label} />);
			cy.get("label[name='hasPis']").should("exist").should("have.text", label);
		});
	});
});
