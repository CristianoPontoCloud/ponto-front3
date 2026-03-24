import { costcentersFacadeFactory } from "@/application/factories/registrations/costcenter-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { costCenterSchema } from "@/application/validation/forms/registrations/center-cost-schema";
import type { Option } from "@/domain/components/options";
import type {
	CostCenter,
	CostCenterDetails,
	CostCenterFormProps,
} from "@/domain/entities/center-cost";
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
import { costCenterInitialFormValues } from "./center-cost-initial-values";

export function useCostCentersPage() {
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const [formValues, setFormValues] = useState<CostCenterFormProps>(costCenterInitialFormValues);
	const costcenterFacade = useMemo(() => costcentersFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("center-cost");
	const toastDefaults = useToastCustomDefaults();
	const form = useForm<CostCenterFormProps>({
		values: formValues,
		resolver: zodResolver(costCenterSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();

	async function editCostCenter(centerCostId: string) {
		async function getCostCenterFormValues() {
			const form = await costcenterFacade.findById(centerCostId);
			if (!form) return;
			setFormValues(form);
		}
		await getCostCenterFormValues();
		setOpen(true);
	}

	async function excludeCostCenter(id: string) {
		await costcenterFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="centro de custo" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(costCenterInitialFormValues);
		setOpen(false);
	}

	const optionsConfig = (centerCost: CostCenter): Option[] => {
		const { id, status } = centerCost;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";

		return [
			{
				label: "Gerenciar",
				onClick: () => editCostCenter(centerCost.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<CostCenterDetails>({
						entity: "centro de custo",
						status: centerCost.status,
						facadeFactorie: costcenterFacade,
						id: centerCost.id,
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este centro de custo, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeCostCenter(id)}
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

	const columns: ColumnDef<CostCenter>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		generateStatusColumn<CostCenter>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];

	useEffect(() => {
		if (open) return;
		setFormValues(costCenterInitialFormValues);
		form.reset();
	}, [open, form]);

	return {
		formValues,
		columns,
		form,
		closeSheet,
	};
}
