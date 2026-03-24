"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import type {
	BreadCrumbProviderParams,
	BreadcrumbContextProps,
	Breadcrumbs,
} from "./bread-crumb-type";

const firstBreadcrumb = {
	name: "Início",
	url: "/",
};

const defaultValue = {
	breadcrumbs: [firstBreadcrumb],
};

const BreadcrumbContext = createContext<BreadcrumbContextProps>(defaultValue);

const pagesMap: { [key: string]: string } = {
	collaborators: "Colaboradores",
	registrations: "Cadastros",
	companies: "Empresas",
	hours: "Horários",
	timetracking: "Apurações",
	irregularities: "Ocorrências",
	"request-management": "Solicitações",
	"mirror-mark": "Espelhos de ponto",
	receipts: "Comprovantes",
	"role-settings": "Permissões",
};

export function BreadcrumbProvider({ children }: BreadCrumbProviderParams) {
	const pathname = usePathname();

	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs[]>([]);

	useEffect(() => {
		const pathParts = pathname.split("/").filter(Boolean);
		const newBreadcrumbs: Breadcrumbs[] = [];
		pathParts.forEach((page, index) => {
			const url = "/".concat(pathParts.slice(0, index + 1).join("/"));
			if (pagesMap[page]) {
				newBreadcrumbs.push({
					name: pagesMap[page],
					url: url,
				});
			}
		});

		setBreadcrumbs([firstBreadcrumb, ...newBreadcrumbs]);
	}, [pathname]);
	return (
		<BreadcrumbContext.Provider value={{ breadcrumbs }}>{children}</BreadcrumbContext.Provider>
	);
}

export const useBreadcrumb = () => {
	const context = useContext(BreadcrumbContext);
	if (!context) {
		throw new Error("useBreadcrumb deve ser usado dentro de um BreadcrumbProvider");
	}
	return context;
};
