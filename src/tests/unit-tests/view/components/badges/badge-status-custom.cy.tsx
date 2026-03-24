import { StatusDefaultEnum } from "@/domain/usecases/status-default";
import {
	BadgeStatusCustom,
	type BadgeStatusCustomParams,
} from "@/view/components/badges/badge-status-custom";
import "@/view/styles/globals.css";
describe("<BadgeStatusCustom />", () => {
	const ComponentMock = (params: BadgeStatusCustomParams) => {
		return <BadgeStatusCustom {...params} />;
	};

	const activeStatus = StatusDefaultEnum.active;
	const inactiveStatus = StatusDefaultEnum.inactive;

	const active = {
		label: "ativo",
		value: activeStatus,
	};
	const inactive = {
		label: "inativo",
		value: inactiveStatus,
	};

	const colorByStatus = {
		[activeStatus]: "bg-lime-600/15 text-lime-600",
		[inactiveStatus]: "bg-red-600/15 text-red-600",
	};

	it("It should render a div with the color and label according to the active status.", () => {
		cy.mount(<ComponentMock colorsByStatus={colorByStatus} status={active} />);
		cy.contains("div", active.label)
			.should("exist")
			.should("have.class", colorByStatus[activeStatus]);
	});
	it("It should render a div with the color and label according to the inactive status.", () => {
		cy.mount(<ComponentMock colorsByStatus={colorByStatus} status={inactive} />);
		cy.contains("div", inactive.label)
			.should("exist")
			.should("have.class", colorByStatus[inactiveStatus]);
	});
});
