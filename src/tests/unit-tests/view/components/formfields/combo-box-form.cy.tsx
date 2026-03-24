// import type { ComboboxFormFieldParams } from "@/domain/components/formfields/combo-box-form";
// import type { ValueLabel } from "@/domain/value-label";
// import ComboboxForm from "@/view/components/formfields/combo-box-form";
// import { Button } from "@/view/components/ui/button";
// import { Form } from "@/view/components/ui/form";
// import "@/view/styles/globals.css";
// import { faker } from "@faker-js/faker";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { v4 as uuidv4 } from "uuid";
// import { z } from "zod";

// describe("<ComboboxForm />", () => {
// 	const datas: ValueLabel[] = [
// 		{ value: uuidv4(), label: faker.person.fullName() },
// 		{ value: uuidv4(), label: faker.person.fullName() },
// 	];
// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// 	const FormMock = (params: Omit<ComboboxFormFieldParams<any>, "form" | "formFieldName">) => {
// 		const schema = z.object({
// 			collaborator: z.string().min(3),
// 		});
// 		const form = useForm({
// 			values: {
// 				collaborator: "",
// 			},
// 			mode: "onSubmit",
// 			resolver: zodResolver(schema),
// 		});
// 		function onSubmit(data: {
// 			collaborator: string;
// 		}) {
// 			console.log(data);
// 		}
// 		return (
// 			<Form {...form}>
// 				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
// 					<ComboboxForm form={form} formFieldName="collaborator" {...params} />
// 					<Button type="submit">submit</Button>
// 				</form>
// 			</Form>
// 		);
// 	};

// 	it("when clicking on the input, the list of options should open equal a 'datas' const.", () => {
// 		cy.mount(<FormMock datas={datas} />);
// 		const input = cy.get("button[role='combobox']");
// 		input.should("exist").click();

// 		cy.get("body:not([data-cy-root] *) [div='dialog']").should("exist");
// 		for (const data of datas) {
// 			cy.get("div[role='option']").should("have.text", data.label);
// 		}
// 	});
// });
