"use client";
import { positionsFacadeFactory } from "@/application/factories/registrations/positions-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useCreateOrUpdateDispatcher } from "@/application/usecases/save-or-update-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { PositionDetails, PositionFormProps } from "@/domain/entities/positions";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export function usePositionSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<PositionFormProps>();
	const token = useSession().data?.user.token ?? "";
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("position");
	const id = form.watch("id") ?? "";
	const { Exclude } = useToastCustomDefaults();
	const { setModalAndOpen, resetModal } = useModal();
	const { handleSubmit } = form;
	const positionsFacade = useMemo(() => positionsFacadeFactory(token), [token]);
	const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<PositionFormProps, PositionDetails>(
		{
			queryKey: "position",
			closeSheet,
			form,
		},
	);

	async function excludePosition(id: string) {
		await positionsFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="cargo" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function openModalExlcudePosition() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este cargo, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button className="bg-red-600" variant="destructive" onClick={() => excludePosition(id)}>
						Excluir
					</Button>
					<Button variant="secondary" onClick={() => resetModal()}>
						Cancelar
					</Button>
				</>
			),
		});
	}
	async function onSubmit(data: PositionFormProps) {
		await executeCreateOrUpdate({
			data,
			facadeFactorie: positionsFacade,
			entity: "cargo",
			catchFn: () => toastError({ tittle: "Erro de servidor" }),
			invalidSelects: true,
		});
	}

	return {
		form,
		handleSubmit,
		onSubmit,
		openModalExlcudePosition,
		id,
	};
}
