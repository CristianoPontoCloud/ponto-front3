"use client";
import {
	Building2,
	Calendar,
	ChevronDown,
	ChevronRight,
	FileCheck,
	FileCode,
	FileDown,
	FilePlus,
	History,
	LayoutDashboard,
	Megaphone,
	PieChart,
	SearchCheck,
	Settings,
	ShieldCheck,
	Timer,
	Users,
	Wallet,
} from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/view/components/ui/collapsible";

import { ViewTypeEnum } from "@/domain/view-type";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarRail,
} from "@/view/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { svgCompanyName } from "../svgs/svg-company-name";
import { svgLogo } from "../svgs/svg-logo";
import { Button } from "../ui/button";
import { CompanyLogo } from "./company-logo";
import { UserFooterMenu } from "./user/footer-menu-sidebar";

interface MenuItem {
	title: string;
	url: string;
	statusFilter?: string;
	icon: React.ComponentType;
	subOptions?: Omit<MenuItem, "icon">[];
}
const statusFilterDefault = "?status=ACTIVE";

const items: { [key: string]: MenuItem[] } = {
	Geral: [
		{ title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
		{ title: "Calendário", url: "#", icon: Calendar },
	],
	Gestão: [
		{
			title: "Colaboradores",
			url: "/collaborators",
			icon: Users,
			statusFilter: statusFilterDefault,
		},
		{
			title: "Cadastros",
			url: "/registrations",
			icon: FilePlus,
			statusFilter: statusFilterDefault,
		},
		{
			title: "Horários",
			url: "/hours",
			icon: Timer,
			statusFilter: statusFilterDefault,
		},
		{
			title: "Apurações",
			url: "/timetracking",
			icon: SearchCheck,
			// statusFilter: `?type=${TimeTrackingTypeEnum.monthly}`,
		},
		{
			title: "Relatório fiscais",
			url: "/fiscal-reports",
			icon: FileDown,
		},
		{
			title: "Relatório gerencias",
			url: "/management-reports",
			icon: PieChart,
		},
		{
			title: "Exportações",
			url: "/exports",
			icon: FileCode,
		},
	],
	Detalhamento: [
		{
			title: "Ocorrências",
			url: "/irregularities",
			icon: Megaphone,
		},
		{
			title: "Solicitações",
			url: "/request-instance",
			icon: ShieldCheck,
			statusFilter: `?viewtype=${ViewTypeEnum.MY}`,
		},
		{
			title: "Comprovantes",
			url: "/receipts",
			icon: FileCheck,
			statusFilter: `?viewtype=${ViewTypeEnum.MY}`,
		},
		{
			title: "Espelhos de ponto",
			url: "/mirror-mark",
			icon: History,
			statusFilter: `?viewtype=${ViewTypeEnum.MY}`,
		},
	],
	Administração: [
		{
			title: "Empresas",
			url: "/companies",
			icon: Building2,
			statusFilter: statusFilterDefault,
		},
		{ title: "Financeiro", url: "#", icon: Wallet },
		{
			title: "Configurações",
			url: "/settings",
			icon: Settings,
			subOptions: [
				{
					title: "Permissões",
					url: "/settings/permissions?view=ROLES",
				},
				{
					title: "Perfis de acesso",
					url: "/settings/access-profile?tab=GENERAL",
				},
			],
		},
		// {
		// 	title: "Permissões",
		// 	url: "/role-settings",
		// 	icon: LockOpen,
		// 	statusFilter: `?type=${RoleSettingViewEnum.ACCESS_PROFILE}`,
		// },
	],
};

function applyStyleOnCurrentPage(currentPathname: string, itemUrl: string) {
	const style = "bg-sidebar-accent text-sidebar-accent-foreground";
	if (currentPathname === itemUrl) return style;
	if (itemUrl === "/registrations" && currentPathname.startsWith("/registrations")) return style;
	if (itemUrl === "/hours" && currentPathname.startsWith("/hours")) return style;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [openItems, setOpenItems] = useState<string[]>([]);
	const pathname = usePathname();

	const router = useRouter();

	const handleToggle = useCallback((itemTitle: string) => {
		setOpenItems((prevState) =>
			prevState.includes(itemTitle)
				? prevState.filter((title) => title !== itemTitle)
				: [...prevState, itemTitle],
		);
	}, []);

	return (
		<Sidebar collapsible="icon" {...props} className="">
			<SidebarHeader className="border-muted h-16 bg-sidebar ">
				<CompanyLogo svgLogo={svgLogo} svgCompanyName={svgCompanyName} />
			</SidebarHeader>
			<SidebarContent className="bg-sidebar border-t border-sidebar-border">
				{Object.entries(items).map(([groupLabel, groupItems]) => (
					<SidebarGroup key={groupLabel}>
						<SidebarGroupLabel className="text-xs font-extralight">
							{groupLabel.charAt(0).toUpperCase() + groupLabel.slice(1)}
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{groupItems.map((item) => (
									<SidebarMenuItem key={item.title}>
										{item.subOptions ? (
											<div>
												<SidebarMenuButton
													onClick={() => handleToggle(item.title)}
													className="flex justify-between items-center text-sidebar-foreground/70"
												>
													<item.icon />
													<span>{item.title}</span>
													{openItems.includes(item.title) ? (
														<ChevronDown className="ml-auto transition-transform" />
													) : (
														<ChevronRight className="ml-auto transition-transform" />
													)}
												</SidebarMenuButton>
												<Collapsible open={openItems.includes(item.title)} className="flex">
													<CollapsibleTrigger />
													<CollapsibleContent className="overflow-hidden">
														<SidebarMenuSub>
															{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
															{item.subOptions.map((subItem: any) => (
																<SidebarMenuSubItem key={subItem.title}>
																	<SidebarMenuButton
																		asChild
																		className={`${applyStyleOnCurrentPage(pathname, subItem.url.split("?")[0])}`}
																	>
																		<Button
																			variant="ghost"
																			className={"justify-start"}
																			onClick={() =>
																				router.push(`${subItem.url}${subItem.statusFilter ?? ""}`)
																			}
																		>
																			{/* <subItem.icon /> */}
																			<span>{subItem.title}</span>
																		</Button>
																	</SidebarMenuButton>
																</SidebarMenuSubItem>
															))}
														</SidebarMenuSub>
													</CollapsibleContent>
												</Collapsible>
											</div>
										) : (
											<SidebarMenuButton
												asChild
												className={`text-left text-sidebar-foreground/70 ${applyStyleOnCurrentPage(pathname, item.url)}`}
											>
												<Button
													onClick={() => router.push(`${item.url}${item.statusFilter ?? ""}`)}
													variant="ghost"
													className="justify-start"
												>
													<item.icon />
													<span>{item.title}</span>
												</Button>
											</SidebarMenuButton>
										)}
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter className="flex justify-end h-16 bg-sidebar">
				<UserFooterMenu />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

export default AppSidebar;
