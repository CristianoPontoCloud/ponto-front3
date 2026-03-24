import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { useForm } from "react-hook-form";
describe("<GridForm />", () => {
	const FormMock = () => {
		const form = useForm({
			values: {
				name: "",
			},
			mode: "onSubmit",
		});
		return (
			<Form {...form}>
				<GridForm gridCol="2">
					<InputForm form={form} formFieldName="name" />
					<InputForm form={form} formFieldName="name" />
				</GridForm>
			</Form>
		);
	};

	it("should render both inputs in the same row", () => {
		cy.mount(<FormMock />);

		cy.get("input").then(($inputs) => {
			const first = $inputs[0].getBoundingClientRect();
			const second = $inputs[1].getBoundingClientRect();

			expect(first.top).to.eq(second.top);
		});
	});
});
