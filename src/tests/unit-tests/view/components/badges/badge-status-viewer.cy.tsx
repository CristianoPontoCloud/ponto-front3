import { StatusDefaultEnum } from "@/domain/usecases/status-default";
import {
	StatusViewer,
	type StatusViewerParams,
} from "@/view/components/status-viewer/status-viewer";
import "@/view/styles/globals.css";
describe("<StatusViewer />", () => {
	const ComponentMock = (params: StatusViewerParams) => {
		return <StatusViewer {...params} />;
	};

	const activeStatus = StatusDefaultEnum.active;
	const inactiveStatus = StatusDefaultEnum.inactive;
	const successColor = "bg-lime-500";
	const errorColor = "bg-red-500";
	function getSuccessLabel(pronoun: "male" | "female" = "male") {
		if (pronoun === "female") return "Ativa";
		return "Ativo";
	}
	function getErrorLabel(pronoun: "male" | "female" = "male") {
		if (pronoun === "female") return "Inativa";
		return "Inativo";
	}

	it(`If the status matches the activeStatusRule, it should render a div with the text '${getSuccessLabel()}' and the color '${successColor}'.`, () => {
		cy.mount(<ComponentMock activeStatusRule={activeStatus} status={activeStatus} />);
		cy.get(`div.${successColor}`);
		cy.contains("span", getSuccessLabel());
	});
	it(`If the status doesnt matches the activeStatusRule, it should render a div with the text '${getErrorLabel()}' and the color '${errorColor}'.`, () => {
		cy.mount(<ComponentMock activeStatusRule={activeStatus} status={inactiveStatus} />);
		cy.get(`div.${errorColor}`);
		cy.contains("span", getErrorLabel());
	});
	it("You must change the label pronoun to feminon when the pronoun parameter is female.", () => {
		cy.mount(<ComponentMock activeStatusRule={activeStatus} status={activeStatus} />);
		cy.contains("span", getSuccessLabel());
		cy.mount(
			<ComponentMock activeStatusRule={activeStatus} status={activeStatus} pronoun="female" />,
		);
		cy.contains("span", getSuccessLabel("female"));
		cy.mount(<ComponentMock activeStatusRule={activeStatus} status={inactiveStatus} />);
		cy.contains("span", getErrorLabel());
		cy.mount(
			<ComponentMock activeStatusRule={activeStatus} status={inactiveStatus} pronoun="female" />,
		);
		cy.contains("span", getErrorLabel("female"));
	});
});
