import { InifinityTableSelectHeader } from "@/view/components/inifity-table/components/inifinity-table-select-header";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { useState } from "react";
describe("<InifinityTableSelectHeader />", () => {
	const list = Array.from({ length: faker.number.int({ min: 1, max: 10 }) }).map(() =>
		faker.person.fullName(),
	);
	function Mock() {
		const [checkedList, setCheckedList] = useState<string[]>([]);
		return (
			<>
				<InifinityTableSelectHeader
					checkedList={checkedList}
					list={list}
					setCheckedList={setCheckedList}
					// className={className}
				/>
			</>
		);
	}

	it("Should have aria-checked value false", () => {
		cy.mount(<Mock />);
		cy.get("button").should("exist").should("have.attr", "aria-checked", "false");
	});
	it("Should have aria-checked value true when click in button", () => {
		cy.mount(<Mock />);
		cy.get("button").should("exist").click().should("have.attr", "aria-checked", "true");
	});
});
