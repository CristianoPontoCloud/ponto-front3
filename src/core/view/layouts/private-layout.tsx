import { BreadcrumbProvider } from "@/application/providers/bread-crumb/bread-crumb-provider";
import Header from "@/view/components/header/header";
import AppSidebar from "@/view/components/sidebar/app-sidebar";
import { ScrollArea, ScrollBar } from "@/view/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/view/components/ui/sidebar";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
	return (
		<BreadcrumbProvider>
			<SidebarProvider>
				<AppSidebar />
				<ScrollArea type="auto" className="w-full max-h-full overflow-x-auto">
					<SidebarInset>
						<Header />
						<div className="flex flex-col p-4 border-t border-sidebar-border max-h-full min-w-[787px]">
							{children}
						</div>
					</SidebarInset>
					<ScrollBar orientation="vertical" />
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</SidebarProvider>
		</BreadcrumbProvider>
	);
}
