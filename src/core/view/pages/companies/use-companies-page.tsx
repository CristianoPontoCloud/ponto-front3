import { companiesFacadeFactory } from "@/application/factories/companies-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { companiesSchema } from "@/application/validation/forms/companies-schema";
import type { Option } from "@/domain/components/options";
import type { Company, CompanyFormProps, CreateCompanyResponse } from "@/domain/entities/companies";
import { StatusDefaultEnum, getStatus } from "@/domain/usecases/status-default";
import { generateStatusColumn } from "@/view/components/inifity-table/generate-status-column";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { Button } from "@/view/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { companyInitialFormValues } from "./company-initial-values";

export function useCompaniesPage() {
	const [formValues, setFormValues] = useState<CompanyFormProps>(companyInitialFormValues);

	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";

	const parentId = session.data?.user.parentCompanyId ?? session.data?.user.companyId ?? "";
	const companiesFacade = useMemo(() => companiesFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("company");
	const toastDefaults = useToastCustomDefaults();

	const form = useForm<CompanyFormProps>({
		values: formValues,
		resolver: zodResolver(companiesSchema),
		mode: "onSubmit",
	});

	async function editCompanies(companyId: string) {
		async function getCompanyFormValues() {
			const form = await companiesFacade.findById(companyId);
			if (!form) return;
			setFormValues({ ...form, parentCompanyId: parentId });
		}
		await getCompanyFormValues();
		setOpen(true);
	}

	async function excludeCompany(companyId: string) {
		await companiesFacade.delete(companyId);
		invalidateQueryAndRefetch();
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="empresa" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(companyInitialFormValues);
		setOpen(false);
	}

	const optionsConfig = (company: Company): Option[] => {
		const { id, status } = company;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Gerenciar",
				onClick: () => editCompanies(company.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<CreateCompanyResponse>({
						id: company.id,
						status: company.status,
						facadeFactorie: companiesFacade,
						entity: "empresa",
						pronoun: "female",
						finallyFn: async () => await invalidateQueryAndRefetch(),
						companyId,
					});
				},
				hasSeparator: true,
			},
			{
				label: "Excluir",
				onClick: () =>
					setModalAndOpen({
						title: "Tem certeza que deseja excluir?",
						description:
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a esta empresa, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeCompany(id)}
								>
									Excluir
								</Button>
								<Button variant="secondary" onClick={() => resetModal()}>
									Cancelar
								</Button>
							</>
						),
					}),

				className: "text-red-500 focus:bg-red-500 focus:text-background !important",
			},
		];
	};

	const columns: ColumnDef<Company>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Razão social</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		{
			accessorKey: "fantasyName",
			header: () => <div>Nome fantasia</div>,
			size: 1,
			cell: ({ row }) => {
				return <div>{row.getValue("fantasyName")}</div>;
			},
		},
		{
			accessorKey: "cnpj",
			header: () => <div>CPF/CNPJ</div>,
			size: 1,
			cell: ({ row }) => {
				return <div>{row.getValue("cnpj")}</div>;
			},
		},
		{
			accessorKey: "collaboratorIds",
			header: () => <div>Colaboradores</div>,
			size: 1,
			cell: ({ row }) => {
				return <div>{row.getValue<string[]>("collaboratorIds").length}</div>;
			},
		},
		// {
		// 	accessorKey: "status",
		// 	header: "Status",
		// 	cell: ({ row }) => (
		// 		<StatusViewer status={row.getValue("status")} activeStatusRule={StatusDefaultEnum.active} />
		// 	),
		// },
		// {
		// 	id: "options",
		// 	size: 1,
		// 	cell: ({ row }) => {
		// 		return (
		// 			<div className="flex justify-end">
		// 				<Options label="Ações" />
		// 			</div>
		// 		);
		// 	},
		// },
		generateStatusColumn<Company>({
			pronoun: "female",
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];

	useEffect(() => {
		if (open) return;
		setFormValues(companyInitialFormValues);
		form.reset();
	}, [open, form]);

	return {
		formValues,
		columns,
		form,
		closeSheet,
	};
}
