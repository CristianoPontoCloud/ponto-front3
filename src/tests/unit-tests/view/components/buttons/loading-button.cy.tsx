import LoadingButton, { type LoadingButtonParams } from "@/view/components/buttons/loading-button";
import "@/view/styles/globals.css";
describe("<LoadingButton />", () => {
	const textButton = "submit";
	const spinClass = "animate-spin";
	const svgClass = "lucide-loader-circle";
	const ComponentMock = (params: LoadingButtonParams) => {
		return <LoadingButton {...params}>{textButton}</LoadingButton>;
	};
	it(`Should render button with text '${textButton}'.`, () => {
		cy.mount(<ComponentMock isLoading={false} />);
		cy.contains("button", textButton);
	});
	it(`Should render button with svg contains '${svgClass}' and '${spinClass}' class.`, () => {
		cy.mount(<ComponentMock isLoading={true} />);
		cy.get(`svg.${svgClass}`).should("exist").should("have.class", spinClass);
	});
});
