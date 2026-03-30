"use client";
import type { ChildrenReactNode } from "@/domain/children";
import SubSidebarLinks from "@/view/components/sub-sidebar/sub-sidebar-links";
import { CalendarClock, FolderClock, Hourglass, ShieldAlert } from "lucide-react";
import type React from "react";

interface MenuItem {
	title: string;
	url: string;
	Icon: React.ElementType;
}

const baseUrl = "/hours/";

const pages: MenuItem[] = [
	{ title: "Turnos", url: `${baseUrl}turns`, Icon: CalendarClock },
	{ title: "Hora extras", url: `${baseUrl}extra-hours`, Icon: Hourglass },
	{ title: "Banco de horas", url: `${baseUrl}hour-banks`, Icon: FolderClock },
	{ title: "Sobreaviso", url: `${baseUrl}on-calls`, Icon: ShieldAlert },
];

export default function HoursBaseLayout({ children }: ChildrenReactNode) {
	return (
		<section className="flex gap-2 h-full">
			<SubSidebarLinks pages={pages} title="Horários" statusFilterDefault="?status=ACTIVE" />
			{children}
		</section>
	);
}
