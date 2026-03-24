import { requestsFacadeFactory } from "@/application/factories/registrations/requests-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { requestSchema } from "@/application/validation/forms/registrations/request-schema";
import type { Option } from "@/domain/components/options";
import type { Request, RequestDetails, RequestFormProps } from "@/domain/entities/request";
import { StatusDefaultEnum, getStatus } from "@/domain/usecases/status-default";
import { generateStatusColumn } from "@/view/components/inifity-table/generate-status-column";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { Button } from "@/view/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { requestInitialFormValues } from "./requests-initial-values";

export function useRequestsPage() {
	const [id, setId] = useQueryState("id", {
		history: "replace",
		shallow: true,
		clearOnDefault: true,
	});
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const [formValues, setFormValues] = useState<RequestFormProps>(requestInitialFormValues);
	const toastDefaults = useToastCustomDefaults();
	const requestFacade = useMemo(() => requestsFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("request");
	const form = useForm<RequestFormProps>({
		values: formValues,
		resolver: zodResolver(requestSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();

	const editRequest = useCallback(
		async (requestId: string) => {
			async function getRequestFormValues() {
				const form = await requestFacade.findById(requestId);
				if (!form) return;
				setFormValues(form);
			}
			await getRequestFormValues();
			setOpen(true);
		},
		[requestFacade, setOpen],
	);

	async function excludeRequest(id: string) {
		await requestFacade.delete(id);
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="solicitação" pronoun="female" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(requestInitialFormValues);
		setOpen(false);
	}

	const optionsConfig = (request: Request): Option[] => {
		const { id, status } = request;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Gerenciar",
				onClick: () => editRequest(request.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<RequestDetails>({
						status: request.status,
						facadeFactorie: requestFacade,
						id: request.id,
						entity: "solicitação",
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a esta Solicitação, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeRequest(id)}
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

	const columns: ColumnDef<Request>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		{
			accessorKey: "abbreviation",
			header: () => {
				return <div>Abreviação</div>;
			},
			cell: ({ row }) => <div>{row.getValue("abbreviation")}</div>,
		},
		{
			accessorKey: "computeAs",
			header: () => {
				return <div>Computa como</div>;
			},
			cell: ({ row }) => <div>{row.getValue("computeAs")}</div>,
		},
		{
			accessorKey: "type",
			header: () => {
				return <div>Tipo</div>;
			},
			cell: ({ row }) => <div>{row.getValue("type")}</div>,
		},
		generateStatusColumn<Request>({
			pronoun: "female",
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];

	useEffect(() => {
		if (!id) return;
		editRequest(id);
		setId(null);
	}, [id, editRequest, setId]);

	useEffect(() => {
		if (open) return;
		setFormValues(requestInitialFormValues);
		form.reset();
	}, [open, form]);

	return {
		form,
		columns,
		closeSheet,
	};
}
