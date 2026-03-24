"use client";

import { authorizeFacadeFactory } from "@/application/factories/authorize-facade-factory";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { toastController } from "../toaster/toast-controller";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface CompanyNameId {
	companyId: string;
	companyName: string;
}

export function CompanySelector() {
	const session = useSession();
	const queryClient = useQueryClient();
	const user = session?.data?.user;
	const token = user?.token ?? "";
	const companyGroups = useMemo(
		() => session.data?.user.companyGroups ?? [],
		[session.data?.user.companyGroups],
	);
	const [companyList, setCompanyList] = useState<CompanyNameId[]>([]);
	const authorizeFacade = useMemo(() => authorizeFacadeFactory(token), [token]);
	function getCurrentCompany() {
		return companyList.find(({ companyId }) => companyId === user?.companyId);
	}
	async function onValueChange(companyId: string) {
		const company = companyList.find((list) => list.companyId === companyId);
		if (!company?.companyId) return;
		try {
			const response = (await authorizeFacade.selectCompany(company.companyId))?.data;
			if (!response?.accessToken) {
				throw new Error("invalid response");
			}
			await signIn("credentials", {
				token: response.accessToken,
				redirect: false,
			});
			await queryClient.invalidateQueries({
				predicate: () => true,
			});
			await queryClient.refetchQueries({ predicate: () => true });
		} catch (error) {
			toastController.error({
				tittle: "Erro de servidor",
				action: {
					label: "Ok",
					onClick: () => {},
				},
			});
			throw error;
		}
	}
	function companyNameFormater() {
		const companyName = getCurrentCompany()?.companyName ?? "";
		if (companyName.length > 30) return `${companyName.slice(0, 30)}...`;
		return companyName;
	}
	useEffect(() => {
		const companies: CompanyNameId[] = [];
		for (const { branches, headquarters } of companyGroups) {
			companies.push({ companyName: headquarters.companyName, companyId: headquarters.companyId });
			for (const { companyName, companyId } of branches) {
				companies.push({ companyName, companyId });
			}
		}
		setCompanyList(companies);
	}, [companyGroups]);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="w-fit" id="company-selector">
					{companyNameFormater()}
					<ChevronsUpDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					value={getCurrentCompany()?.companyId}
					onValueChange={onValueChange}
				>
					{companyList.map(({ companyName, companyId }, index) => (
						<DropdownMenuRadioItem key={index.toString()} value={companyId}>
							{companyName}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
