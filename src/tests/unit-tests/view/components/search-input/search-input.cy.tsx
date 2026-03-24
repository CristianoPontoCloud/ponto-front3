import { InputSearch } from "@/view/components/search-input/search-input";
import "@/view/styles/globals.css";
import { useState } from "react";
describe("<InputSearch />", () => {
	function Mock() {
		const [value, setValue] = useState("");
		return <InputSearch value={value} setValue={(value) => setValue(value)} />;
	}
	it("Should be render input", () => {
		cy.mount(<Mock />);
		cy.get("input[id='search']");
	});
	it("Should be save value typed in input", () => {
		cy.mount(<Mock />);
		const text = "asd";
		cy.get("input[id='search']").type(text);
		cy.get("input[id='search']").should("have.value", text);
	});
	it("Should be clear when click in X button", () => {
		cy.mount(<Mock />);
		const text = "asd";
		cy.get("input[id='search']").type(text);
		cy.get("button").click();
		cy.get("input[id='search']").should("have.value", "");
	});
});
