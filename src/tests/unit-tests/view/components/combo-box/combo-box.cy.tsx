import { Combobox, type ComboboxParams } from "@/view/components/combo-box/combo-box";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";
describe("<Card />", () => {
	const datas = Array.from({ length: 10 }).map(() => ({
		label: faker.person.fullName(),
		value: v4(),
	}));

	const ComponentMock = (params: Omit<ComboboxParams, "datas">) => {
		return <Combobox datas={datas} {...params} />;
	};
	it("Should render div with border and radius class", () => {
		cy.mount(<ComponentMock onChangeValue={() => {}} value={datas[0].value} />);
	});
});
