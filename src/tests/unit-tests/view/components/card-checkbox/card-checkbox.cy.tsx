import {
	CardCheckbox,
	type CardCheckboxParams,
	cardCheckboxFloatPositions,
} from "@/view/components/card-checkbox/card-checkbox";
import "@/view/styles/globals.css";
describe("<CardCheckbox />", () => {
	const ComponentMock = (params: CardCheckboxParams) => {
		return <CardCheckbox {...params} />;
	};
	const idBase = "card-checkbox-";
	const idWrapper = `${idBase}wrapper`;
	const idUnchecked = `${idBase}unchecked`;
	const idChecked = `${idBase}checked`;
	const idDescription = `${idBase}description`;
	const idFloatElement = `${idBase}float-element`;
	const idButton = `${idBase}button`;
	const textTitle = "title";
	const textDescription = "description";
	const textGradientElement = "gradient element";
	const textFloatElement = "float element";
	it("Should render div with border and radius class", () => {
		cy.mount(<ComponentMock checked={false} onClick={() => {}} title={textTitle} />);
		cy.get(`div[id='${idWrapper}']`)
			.should("exist")
			.should("have.class", "border")
			.should("have.class", "rounded-md");
	});
	it("Should render div unchecked div", () => {
		cy.mount(<ComponentMock checked={false} onClick={() => {}} title={textTitle} />);
		cy.get(`div[id='${idUnchecked}']`)
			.should("exist")
			.should("have.class", "rounded-full border-[1px]");
	});
	it("Should render div checked div", () => {
		cy.mount(<ComponentMock checked={true} onClick={() => {}} title={textTitle} />);
		cy.get(`div[id='${idChecked}']`)
			.should("exist")
			.should("have.class", "rounded-full bg-primary");
		cy.get("svg")
			.should("exist")
			.should("have.class", "lucide-check")
			.should("have.class", "lucide-check");
	});
	it(`Should trigger onClick event parameters on click in '${idWrapper}'`, () => {
		const onClick = cy.stub().as("onClick");
		cy.mount(<ComponentMock checked={true} onClick={onClick} title={textTitle} />);
		cy.get(`div[id='${idWrapper}']`).click();
		cy.get("@onClick").should("have.been.called");
	});
	it("Should render description", () => {
		cy.mount(
			<ComponentMock
				checked={false}
				onClick={() => {}}
				title={textTitle}
				description={textDescription}
			/>,
		);
		cy.get(`p[id='${idDescription}']`).should("exist").should("have.text", textDescription);
	});
	it("Should render gradient element", () => {
		cy.mount(
			<ComponentMock
				checked={false}
				onClick={() => {}}
				title={textTitle}
				gradientElement={<div>{textGradientElement}</div>}
			/>,
		);
		cy.contains("div", textGradientElement).should("exist");
	});
	it("Should render float element and test all positions", () => {
		const positionsKeys = Object.keys(cardCheckboxFloatPositions);
		const positionLenght = positionsKeys.length;

		Cypress._.times(positionLenght, (index) => {
			const currentKey = positionsKeys[index] as keyof typeof cardCheckboxFloatPositions;
			const currentValue: string = cardCheckboxFloatPositions[currentKey];
			cy.mount(
				<ComponentMock
					checked={false}
					onClick={() => {}}
					title={textTitle}
					floatElement={{
						component: <div>{textFloatElement}</div>,
						position: currentKey as keyof typeof cardCheckboxFloatPositions, // <- aqui usa o valor da chave atual
					}}
				/>,
			);
			cy.get(`div[id='${idFloatElement}']`).should("exist").should("have.class", currentValue);
		});
	});
	it(`Should add class on ${idWrapper}`, () => {
		const className = "bg-yellow-500";
		cy.mount(
			<ComponentMock checked={false} onClick={() => {}} title={textTitle} className={className} />,
		);
		cy.get(`div[id='${idWrapper}']`).should("have.class", className);
	});
	it(`Should add class on ${idButton}`, () => {
		const className = "bg-yellow-500";
		cy.mount(
			<ComponentMock
				checked={false}
				onClick={() => {}}
				title={textTitle}
				clasNameButton={className}
			/>,
		);
		cy.get(`button[id='${idButton}']`).should("have.class", className);
	});
});
