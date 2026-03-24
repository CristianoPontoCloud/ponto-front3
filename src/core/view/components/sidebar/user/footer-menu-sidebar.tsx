"use client";

import { ChevronsUpDown, LogOut, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/view/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/view/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import { ThemeModeToggle } from "../../toggles/theme-modo-toggle";
import { Button } from "../../ui/button";

export function UserFooterMenu() {
	const { isMobile } = useSidebar();
	const { data } = useSession();
	const handleLogout = async () => {
		await signOut({ callbackUrl: "/signin" });
	};
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={""} alt={data?.user.username} />
								<AvatarFallback className="rounded-lg">
									<div className="bg-gray-200 p-6 rounded-sm ">
										<UserRound className="text-gray-500 h-5 w-5" />
									</div>
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{`${data?.user.firstName ?? ""} ${data?.user.lastName ?? ""}`}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-[248px] rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="py-1 px-2 font-normal">
							<div className="flex items-center gap-2 text-left text-sm">
								<Avatar className="h-[36px] w-[36px] rounded-lg">
									<AvatarImage src={""} alt={data?.user.username} />
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{data?.user.username}</span>
									<span className="truncate text-xs">{data?.user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup className="py-2 px-3 flex gap-[10px]">
							<Button onClick={handleLogout} className="cursor-pointer" variant="outline">
								<LogOut />
								Desconectar
							</Button>
							<ThemeModeToggle />
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
