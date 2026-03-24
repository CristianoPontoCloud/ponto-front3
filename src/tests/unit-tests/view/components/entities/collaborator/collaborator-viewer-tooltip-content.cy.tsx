import { CollaboratorViewerTooltipContent } from "@/view/components/entities/collaborator/collaborator-viewer-tooltip-content";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/view/components/ui/tooltip";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import "cypress-real-events";
describe("<CollaboratorViewerTooltipContent />", () => {
	const params = {
		department: faker.person.fullName(),
		email: faker.internet.email(),
		lastMark: `${faker.number.int({ min: 0, max: 23 })}:${faker.number.int({ min: 0, max: 59 })}`,
		name: faker.person.fullName(),
		position: faker.person.jobTitle(),
	};
	const trigger = "trigger me";
	function Mock() {
		return (
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger className="group">{trigger}</TooltipTrigger>
					<CollaboratorViewerTooltipContent {...params} />
				</Tooltip>
			</TooltipProvider>
		);
	}
	it("Should reader strings in each field params object", () => {
		cy.mount(<Mock />);
		cy.contains("button", trigger).should("exist").realHover();
		const fields = Object.values(params);
		for (const field of fields) {
			cy.contains("span", field).should("exist");
		}
	});
});
