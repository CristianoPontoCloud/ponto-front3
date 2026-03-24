import Header from "@/view/components/header/header";
import { ScrollBar } from "@/view/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/view/components/ui/sidebar";
import RootLayout from "@/view/layouts/root-layout";
import "@/view/styles/globals.css";
import { ScrollArea } from "@radix-ui/react-scroll-area";
describe("<Header />", () => {
	function Mock() {
		return (
			<>
				<RootLayout>
					<SidebarProvider>
						<ScrollArea type="auto" className="w-full max-h-full overflow-x-auto">
							<SidebarInset>
								<Header />
							</SidebarInset>
							<ScrollBar orientation="vertical" />
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</SidebarProvider>
				</RootLayout>
			</>
		);
	}
	it("Dashboard page must contain PunchClockButton", () => {
		cy.mount(<Mock />);
		cy.get("button[id=punch-clock]").should("exist");
	});
	it("Dashboard page must contain CompanySelector", () => {
		cy.mount(<Mock />);
		cy.get("button[id=company-selector]").should("exist");
	});
	it("Dashboard page must contain CompanySelector", () => {
		cy.mount(<Mock />);
		cy.get("button[id=notifications]").should("exist");
	});
	it("Dashboard page must contain SidebarTrigger", () => {
		cy.mount(<Mock />);
		cy.get("button[id=sidebar-trigger]").should("exist");
	});
});
