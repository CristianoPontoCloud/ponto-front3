import { InifinityTableSelectBody } from "@/view/components/inifity-table/components/inifinity-table-select-body";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { v4 } from "uuid";
describe("<InifinityTableSelectBody />", () => {
	const list = Array.from({ length: faker.number.int({ min: 1, max: 10 }) }).map(() => v4());
	function Mock() {
		const [checkedList, setCheckedList] = useState<string[]>([]);
		return (
			<>
				<InifinityTableSelectBody
					id={list[0]}
					checkedList={checkedList}
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
