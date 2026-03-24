import { DownloadFileToast } from "@/view/components/reutilities-toasts/download-file-toast";
import "@/view/styles/globals.css";
describe("<DownloadFileToast />", () => {
	const fileName = "teste";

	function Mock({ link }: { link?: string }) {
		return (
			<DownloadFileToast
				fileName={fileName}
				loadFile={(setLink) => {
					if (!link) return;
					setLink("http://localhost");
				}}
			/>
		);
	}
	describe("When link is not provided", () => {
		it(`Should render ${fileName}`, () => {
			cy.mount(<Mock />);
			cy.contains("p", fileName).should("exist");
		});
		it("Should render spinner", () => {
			cy.mount(<Mock />);
			cy.get("svg[class*='lucide-loader-circle']").should("exist");
		});
		it("Should render button 'Cancelar'", () => {
			cy.mount(<Mock />);
			cy.contains("button", "Cancelar").should("exist");
		});
	});
	describe("When link is provided", () => {
		it(`Should render ${fileName}`, () => {
			cy.mount(<Mock link="http://localhost" />);
			cy.contains("p", fileName).should("exist");
		});
		it("Should render file check svg", () => {
			cy.mount(<Mock link="http://localhost" />);
			cy.get("svg[class*='lucide-file-check']").should("exist");
		});
		it("Should render button 'Dispensar'", () => {
			cy.mount(<Mock link="http://localhost" />);
			cy.contains("button", "Dispensar").should("exist");
		});
		it("Should render button 'Baixar arquivo'", () => {
			cy.mount(<Mock link="http://localhost" />);
			cy.contains("button", "Baixar arquivo").should("exist");
		});
	});
});
