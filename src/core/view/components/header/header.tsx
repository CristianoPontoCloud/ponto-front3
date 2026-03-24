"use client";
import { useScreen } from "@/application/providers/screen/screen-provider";
import { PunchClockButton } from "@/view/components/entities/punch-clock/puch-clock-button";
import { SidebarTrigger } from "@/view/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Notifications } from "../notifications/notifications";
import { HeaderBreadcrumbs } from "./breadcrumbs";
import { CompanySelector } from "./company-selector";

export default function Header() {
	// const hasNotification: boolean = false;
	const { hiddenHeader } = useScreen();
	return (
		<header
			id="header"
			className="flex h-16 justify-between shrink-0 items-center gap-2 transition-[width,height] px-4 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16"
			style={{ display: hiddenHeader ? "none" : "" }}
		>
			<div className="flex items-center gap-2">
				<SidebarTrigger />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<HeaderBreadcrumbs />
			</div>
			<div className="flex items-center gap-2 justify-end">
				<div className="flex gap-3 items-center ">
					<CompanySelector />
					<PunchClockButton />
					<Notifications />
				</div>
			</div>
		</header>
	);
}
