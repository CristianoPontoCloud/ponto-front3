import { Card, type CardParams } from "@/view/components/card/card";
import "@/view/styles/globals.css";
describe("<Card />", () => {
	const headerText = "header";
	const contentText = "child";
	const ComponentMock = (params: Pick<CardParams, "classNames" | "disable" | "footer">) => {
		return (
			<Card header={<div>{headerText}</div>} {...params}>
				<div>{contentText}</div>
			</Card>
		);
	};
	it("Should render div with border and radius class", () => {
		cy.mount(<ComponentMock />);
		cy.get("div[id='card-wrapper']")
			.should("exist")
			.should("have.class", "border-[1px]")
			.should("have.class", "rounded-lg");
	});
	it(`Should render header with text ${headerText}`, () => {
		cy.mount(<ComponentMock />);
		cy.get("div[id='card-header']").should("exist").should("have.text", headerText);
	});
	it(`Should render header with text ${contentText}`, () => {
		cy.mount(<ComponentMock />);
		cy.get("div[id='card-content']").should("exist").should("have.text", contentText);
	});
	it("Should add class on card-wrapper", () => {
		const className = "bg-yellow-500";
		cy.mount(
			<ComponentMock
				classNames={{
					wrapper: className,
				}}
			/>,
		);
		cy.get("div[id='card-wrapper']").should("exist").should("have.class", className);
	});
	it("Should render card-footer-separator when footer exists", () => {
		cy.mount(<ComponentMock disable footer={<>footer</>} />);
		cy.get("div[id='card-footer-separator']").should("exist");
	});
	it("Should render card-footer when footer exists", () => {
		const textFooter = "footer";
		cy.mount(<ComponentMock disable footer={<div>{textFooter}</div>} />);
		cy.get("div[id='card-footer']").should("exist").should("have.text", textFooter);
	});
	it("Should reduce the opacity of broders, separatpor and texts when disable is true", () => {
		cy.mount(<ComponentMock disable footer={<>footer</>} />);
		cy.get("div[id='card-wrapper']").should("exist").should("have.class", "border-border/50");
		cy.get("div[id='card-content']").should("exist").should("have.class", "opacity-50");
		cy.get("div[id='card-header-separator']")
			.should("exist")
			.should("have.class", "border-border/50");
		cy.get("div[id='card-footer-separator']")
			.should("exist")
			.should("have.class", "border-border/50");
		cy.get("div[id='card-footer']").should("exist").should("have.class", "opacity-50");
	});
});
