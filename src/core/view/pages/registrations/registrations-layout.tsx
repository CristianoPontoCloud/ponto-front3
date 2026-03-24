"use client";
import type { ChildrenReactNode } from "@/domain/children";
import SubSidebar from "@/view/components/sub-sidebar/sub-sidebar";
import {
	Calendar,
	CircleDollarSign,
	CircleHelp,
	ClipboardList,
	FileX2,
	Megaphone,
	Monitor,
	Network,
} from "lucide-react";
import type React from "react";

interface MenuItem {
	title: string;
	url: string;
	Icon: React.ElementType;
}

const baseUrl = "/registrations/";

const pages: MenuItem[] = [
	{ title: "Cargos", url: `${baseUrl}positions`, Icon: ClipboardList },
	{ title: "Departamentos", url: `${baseUrl}departments`, Icon: Network },
	{
		title: "Centros de custos",
		url: `${baseUrl}costcenter`,
		Icon: CircleDollarSign,
	},
	{ title: "Feriados", url: `${baseUrl}holidays`, Icon: Calendar },
	{ title: "Solicitações", url: `${baseUrl}requests`, Icon: CircleHelp },
	{ title: "Ocorrências", url: `${baseUrl}occurrences`, Icon: Megaphone },
	{ title: "Motivos de demissão", url: `${baseUrl}dismissal`, Icon: FileX2 },
	{ title: "Equipamentos", url: `${baseUrl}equipments`, Icon: Monitor },
];

export default function RegistrationsBaseLayout({ children }: ChildrenReactNode) {
	return (
		<section className="flex gap-2 h-full ">
			<SubSidebar pages={pages} title="Cadastros" statusFilterDefault="?status=ACTIVE" />
			{children}
		</section>
	);
}
