import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { departmentsFacadeFactory } from "@/application/factories/registrations/department-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useCreateOrUpdateDispatcher } from "@/application/usecases/save-or-update-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { DepartmentDetails, DepartmentFormProps } from "@/domain/entities/department";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export function useDepartmentSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<DepartmentFormProps>();
	const { handleSubmit } = form;
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("department");
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	// const companyId = user?.companyId ?? "";
	const id = form.watch("id") ?? "";
	const { Exclude } = useToastCustomDefaults();
	const { setModalAndOpen, resetModal } = useModal();
	const departmentFacade = useMemo(() => departmentsFacadeFactory(token), [token]);
	const collaboratorFacade = useMemo(() => collaboratorsFacadeFactory(token), [token]);
	const usersForApproval: string[] = form.watch("usersForApproval") ?? [];
	const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<
		DepartmentFormProps,
		DepartmentDetails
	>({
		closeSheet,
		form,
		queryKey: "department",
	});
	const hasErrorOnUserForApproval = () => {
		const error = getValueByPath(form.formState.errors, "usersForApproval");
		return !!error?.message;
	};
	const { data } = useQuery({
		queryKey: ["collaborator"],
		queryFn: async () => {
			const { data } = await collaboratorFacade.findAll();
			return data?.map(({ id, name, surname, position }) => ({ value: id, label: `${name} ${surname} - ${position?.name}` }));
		},
		retry: false,
		enabled: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		staleTime: Number.POSITIVE_INFINITY,
	});

	async function excludeDepartment(id: string) {
		await departmentFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="centro de custo" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function openModalExlcudeCostCenter() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este centro de custo, pois as atribuições serão perdidas.",
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
		});
	}
	function onAddUserForApproval() {
		const currentUsersForAdd = form.watch("selectUser");
		const newUsersForApproval = [...usersForApproval];
		for (const uuidCollaborator of currentUsersForAdd) {
			const collaboratorSelected = data?.find((collaborator) => {
				return collaborator.value === uuidCollaborator
			});
			if (!collaboratorSelected) continue
			const collaboratorAlreadyOnApprovalList = usersForApproval.some(
				(collaborator) => collaborator === collaboratorSelected.value,
			);
			if (collaboratorAlreadyOnApprovalList) continue;
			newUsersForApproval.push(collaboratorSelected.value);
		}
		form.setValue("usersForApproval", newUsersForApproval);
		form.setValue("selectUser", []);
		form.trigger("selectUser");
	}
	function deleteUserForApproval(uuidCollaborator: string) {
		const newUsersForApproval = usersForApproval.filter((uuid) => uuid !== uuidCollaborator);
		form.setValue("usersForApproval", newUsersForApproval);
	}
	async function onSubmit(data: DepartmentFormProps) {
		await executeCreateOrUpdate({
			data,
			entity: "departamento",
			facadeFactorie: departmentsFacadeFactory(token),
			catchFn: () => {
				toastError({ tittle: "Erro de servidor" });
			},
			invalidSelects: true,
		});
	}
	const collaboratorList = data ?? []
	return {
		form,
		handleSubmit,
		onSubmit,
		id,
		openModalExlcudeCostCenter,
		onAddUserForApproval,
		usersForApproval,
		collaboratorList,
		deleteUserForApproval,
		hasErrorOnUserForApproval,
	};
}
