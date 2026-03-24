import { StatusDefaultEnum, statusDefaultMap } from "@/domain/usecases/status-default";
import {
	StatusViewer,
	type StatusViewerParams,
} from "@/view/components/status-viewer/status-viewer";
import "@/view/styles/globals.css";

describe("<StatusViewer />", () => {
	const { active, any, inactive } = StatusDefaultEnum;

	function Mock({ status }: { status: StatusViewerParams["status"] }) {
		return <StatusViewer activeStatusRule={active} status={status} />;
	}

	it(`Should be render red div when value is in status objetct ${active}`, () => {
		cy.mount(<Mock status={active} />);
		const label = statusDefaultMap[active].label;
		cy.contains("span", label).should("exist");
		cy.get("div#status-color").should("exist").should("have.class", "bg-lime-500");
	});
	it(`Should be render red div when value is in status objetct ${inactive}`, () => {
		cy.mount(<Mock status={inactive} />);
		const label = statusDefaultMap[inactive].label;
		cy.contains("span", label).should("exist");
		cy.get("div#status-color").should("exist").should("have.class", "bg-red-500");
	});
	it(`Should be render red div when value is in status objetct ${any}`, () => {
		cy.mount(<Mock status={any} />);
		const label = statusDefaultMap[any].label;
		cy.contains("span", label).should("exist");
		cy.get("div#status-color").should("exist").should("have.class", "bg-red-500");
	});
});
