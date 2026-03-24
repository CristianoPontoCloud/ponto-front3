import { CollaboratorPhotoUploader } from "@/view/components/entities/collaborator/collaborator-upload-photo";
import "@/view/styles/globals.css";
import "cypress-real-events";
import { FormProvider, useForm } from "react-hook-form";
describe("<CollaboratorPhotoUploader />", () => {
	function Mock({ renderWithIntialUrl = false }: { renderWithIntialUrl?: boolean }) {
		const form = useForm({
			values: {
				image: renderWithIntialUrl ? "collaborators/img1.jpg" : "",
			},
		});
		return (
			<FormProvider {...form}>
				<CollaboratorPhotoUploader />
			</FormProvider>
		);
	}
	it("Should user profile icon when photo isnt uploaded", () => {
		cy.mount(<Mock />);
		cy.get("svg.lucide-user-round").should("exist");
	});
	it("Should exist input file without opacity", () => {
		cy.mount(<Mock />);
		cy.get("div.opacity-0").should("exist").find("input[type='file']").should("exist");
	});
	it("Shouldnt render image-label when isnt hover", () => {
		cy.mount(<Mock />);
		cy.get("#image-label").should("have.css", "opacity", "0");
	});
	it("Should render image-label when hover", () => {
		cy.mount(<Mock />);
		cy.get("#image-label").realHover();
		cy.get("#image-label").should("have.css", "opacity", "1");
	});
	it("Should render collaborator imag", () => {
		cy.mount(<Mock renderWithIntialUrl />);
		cy.contains("img").should("exist");
	});
});
