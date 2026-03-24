import { departmentsFacadeFactory } from "@/application/factories/registrations/department-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { deparmentSchema } from "@/application/validation/forms/registrations/department-schema";
import type { Option } from "@/domain/components/options";
import type {
	Department,
	DepartmentDetails,
	DepartmentFormProps,
} from "@/domain/entities/department";
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
import { departmentInitialFormValues } from "./departments-initial-values";

export function useDepartmentsPage() {
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const [formValues, setFormValues] = useState<DepartmentFormProps>(departmentInitialFormValues);
	const toastDefaults = useToastCustomDefaults();
	const { setOpen, open } = useSheet();
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("department");
	const departmentFacade = useMemo(() => departmentsFacadeFactory(token), [token]);
	const form = useForm<DepartmentFormProps>({
		values: formValues,
		resolver: zodResolver(deparmentSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	async function editDepartment(deparmentId: string) {
		async function getDepartmentFormValues() {
			const form = await departmentFacade.findById(deparmentId);
			if (!form) return;
			setFormValues({ ...form, selectUser: [] });
		}
		await getDepartmentFormValues();
		setOpen(true);
	}
	async function excludeDepartment(id: string) {
		await departmentFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="departamento" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(departmentInitialFormValues);
		setOpen(false);
	}
	const optionsConfig = (department: Department): Option[] => {
		const { id, status } = department;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Gerenciar",
				onClick: () => editDepartment(department.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<DepartmentDetails>({
						status: department.status,
						facadeFactorie: departmentFacade,
						id: department.id,
						entity: "departamento",
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este departamento, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeDepartment(id)}
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
	const columns: ColumnDef<Department>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		{
			accessorKey: "approvalFlow",
			header: "Fluxo de aprovação",
			cell: ({ row }) => <div>{row.getValue<boolean>("approvalFlow") ? "Sim" : "Não"}</div>,
		},
		{
			accessorKey: "collaborators",
			header: "Colaboradores",
			cell: ({ row }) => <div>{row.getValue("collaborators") ?? 0}</div>,
		},
		generateStatusColumn<Department>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];
	useEffect(() => {
		if (open) return;
		setFormValues(departmentInitialFormValues);
		form.reset();
	}, [open, form]);
	return {
		formValues,
		closeSheet,
		setFormValues,
		columns,
		form,
	};
}
