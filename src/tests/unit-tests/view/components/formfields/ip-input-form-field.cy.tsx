import { IpInputForm } from "@/view/components/formfields/ip-input-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
describe("<IpInputForm />", () => {
	type IpInputFormParams = Parameters<typeof IpInputForm>;
	const FormMock = (params: Omit<IpInputFormParams["0"], "form" | "formFieldName">) => {
		const schema = z.object({
			ip: z.string().min(14),
		});
		const form = useForm({
			values: {
				ip: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			ip: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<IpInputForm form={form} formFieldName="ip" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When focused, it should capture only numbers input up to and format to IP mask 192.168.111.111", () => {
		cy.mount(<FormMock />);
		cy.get("input[name='ip']")
			.should("exist")
			.focus()
			.type(" 192.168.111.111")
			.should("have.value", "192.168.111.111");
	});
	it("When focused, it should normalized ip when exists values like 192.168.000.001 => 192.168.0.1", () => {
		cy.mount(<FormMock />);
		cy.get("input[name='ip']")
			.should("exist")
			.focus()
			.type(" 192168000001")
			.blur()
			.should("have.value", "192.168.0.1");
	});
	it("When focused, it should capture only numbers input up to max lenght 15 caracter.", () => {
		cy.mount(<FormMock />);
		cy.get("input[name='ip']")
			.should("exist")
			.focus()
			.type("1".repeat(20))
			.should("have.value", "111.111.111.111");
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="IP" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("input[name='ip']").should("have.class", "border-red-500");
		cy.get("label[for='ip']").should("have.class", "text-red-500");
	});
});
