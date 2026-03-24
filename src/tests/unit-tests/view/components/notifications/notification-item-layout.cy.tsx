import { NotificationReadStatusEnum, NotificationTypeEnum } from "@/domain/entities/notifications";
import { NotificationItemLayout } from "@/view/components/notifications/notification-item-layout";
import { Button } from "@/view/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";
describe("<NotificationItemLayout />", () => {
	const notificationParams = {
		id: v4(),
		name: faker.commerce.productName(),
		title: faker.company.name(),
		createdAt: "Há 2 meses",
	};
	const dropdownText = "trigger";
	function Mock({
		type,
		readStatus = NotificationReadStatusEnum.NOT_READ,
	}: {
		type: NotificationTypeEnum;
		readStatus?: NotificationReadStatusEnum;
	}) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button>{dropdownText}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-96">
					<NotificationItemLayout readStatus={readStatus} type={type} {...notificationParams} />
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}
	function getDropdownTrigger() {
		return cy.contains("button", dropdownText);
	}
	function getNotification() {
		return cy.get("div[id='dropdown-item']");
	}
	const { FILE_ERROR, FILE_SUCCESS, MESSAGE, OCCURRENCE, REQUEST, WARNINGS } = NotificationTypeEnum;
	const { NOT_READ, READ } = NotificationReadStatusEnum;
	const arrTypes = Object.values(NotificationTypeEnum);
	const paramsForStatus = {
		[FILE_ERROR]: {
			color: "destructive",
			svg: "lucide-file-x",
		},
		[FILE_SUCCESS]: {
			color: "green",
			svg: "lucide-file-check",
		},
		[MESSAGE]: {
			color: "blue",
			svg: "lucide-chart-area",
		},
		[OCCURRENCE]: {
			color: "amber",
			svg: "lucide-megaphone",
		},
		[REQUEST]: {
			color: "primary",
			svg: "lucide-shield-check",
		},
		[WARNINGS]: {
			color: "yellow",
			svg: "lucide-triangle-alert",
		},
	};

	describe("NOT_READ CASE", () => {
		it("When click em button trigger should render div with dropdown-item id", () => {
			cy.mount(<Mock type={MESSAGE} />);
			getDropdownTrigger().click();
			getNotification().should("exist");
		});
		it(`Should render '${notificationParams.createdAt}', '${notificationParams.name}', '${notificationParams.title}' in notification item`, () => {
			cy.mount(<Mock type={MESSAGE} />);
			getDropdownTrigger().click();
			cy.contains("span", notificationParams.name).should("exist");
			cy.contains("span", notificationParams.title).should("exist");
			cy.contains("span", notificationParams.createdAt).should("exist");
		});
		it("Should render svg lucide-check-check", () => {
			cy.mount(<Mock type={MESSAGE} />);
			getDropdownTrigger().click();
			cy.get("svg.lucide-check-check").should("exist");
		});
		it("Should render span new-notification", () => {
			cy.mount(<Mock type={MESSAGE} />);
			getDropdownTrigger().click();
			cy.get("span#new-notification").should("exist");
		});
		for (const status of arrTypes) {
			const { color, svg } = paramsForStatus[status];
			describe(`Type ${status}`, () => {
				beforeEach(() => {
					cy.mount(<Mock type={status} />);
					getDropdownTrigger().click();
				});

				it(`renders icon ${svg}`, () => {
					cy.get(`svg.${svg}`).should("exist");
				});

				it(`renders color ${color} in svg`, () => {
					cy.get(`svg[class*="${color}"]`).should("exist");
				});
				it(`renders color ${color} div wrapper svg`, () => {
					cy.get(`div[class*="${color}"]`).should("exist");
				});
			});
		}
	});
	describe("READ CASE", () => {
		it("When click em button trigger should render div with dropdown-item id", () => {
			cy.mount(<Mock type={MESSAGE} readStatus={NOT_READ} />);
			getDropdownTrigger().click();
			getNotification().should("exist");
		});
		it(`Should render '${notificationParams.createdAt}', '${notificationParams.name}', '${notificationParams.title}' in notification item`, () => {
			cy.mount(<Mock type={MESSAGE} readStatus={READ} />);
			getDropdownTrigger().click();
			cy.contains("span", notificationParams.name).should("exist");
			cy.contains("span", notificationParams.title).should("exist");
			cy.contains("span", notificationParams.createdAt).should("exist");
		});
		it("Should render svg lucide-check-check", () => {
			cy.mount(<Mock type={MESSAGE} readStatus={READ} />);
			getDropdownTrigger().click();
			cy.get("svg.lucide-check-check").should("not.exist");
		});
		it("Should render span new-notification", () => {
			cy.mount(<Mock type={MESSAGE} readStatus={READ} />);
			getDropdownTrigger().click();
			cy.get("span#new-notification").should("not.exist");
		});
		for (const status of arrTypes) {
			const { svg } = paramsForStatus[status];
			describe(`Type ${status}`, () => {
				beforeEach(() => {
					cy.mount(<Mock type={status} readStatus={READ} />);
					getDropdownTrigger().click();
				});

				it(`renders icon ${svg}`, () => {
					cy.get(`svg.${svg}`).should("exist");
				});

				it("renders color muted-foreground in svg", () => {
					cy.get("svg[class*='muted-foreground']").should("exist");
				});
				it("renders color muted div wrapper svg", () => {
					cy.get("div[class*='muted']").should("exist");
				});
			});
		}
	});
});
