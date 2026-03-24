import {
	PasswordStrengthChecker,
	type PasswordStrengthCheckerParams,
} from "@/view/components/password-strength-checker/password-strength-checker";
import "@/view/styles/globals.css";
describe("<PasswordStrengthChecker />", () => {
	function Mock(params: PasswordStrengthCheckerParams) {
		return <PasswordStrengthChecker {...params} />;
	}
	const passwords = {
		noRequirements: "",
		number: "123",
		letter: "asd",
		numberAndLetter: "ab12",
		numberAndLetterAndSixChar: "abc123",
	};
	const baseIds = ["letter", "number", "six-char"];
	it("Should render three messages of passwords requirements", () => {
		cy.mount(<Mock password={passwords.noRequirements} />);
		for (const id of baseIds) {
			cy.get(`div[id="${id}"]`).should("exist");
			cy.get(`span[id="${id}-message"]`).should("exist");
			cy.get(`svg[id="${id}-check"]`).should("exist");
		}
	});
	it("When the password is shorter than 6 characters and contains only numbers should render number requirement in green color", () => {
		cy.mount(<Mock password={passwords.number} />);
		cy.get(`div[id="number"]`).should("have.class", "text-lime-500");
	});
	it("When the password is shorter than 6 characters and contains only numbers should render letter requirement in green color", () => {
		cy.mount(<Mock password={passwords.letter} />);
		cy.get(`div[id="letter"]`).should("have.class", "text-lime-500");
	});
	it("When the password is shorter than 6 characters and contains only numbers should render number and letter requirements in green color", () => {
		cy.mount(<Mock password={passwords.numberAndLetter} />);
		cy.get(`div[id="number"]`).should("have.class", "text-lime-500");
	});
	it("When the password is shorter than 6 characters and contains only numbers should render all requirement in green color", () => {
		cy.mount(<Mock password={passwords.numberAndLetterAndSixChar} />);
		cy.get(`div[id="number"]`).should("have.class", "text-lime-500");
		cy.get(`div[id="six-char"]`).should("have.class", "text-lime-500");
		cy.get(`div[id="letter"]`).should("have.class", "text-lime-500");
	});
});
