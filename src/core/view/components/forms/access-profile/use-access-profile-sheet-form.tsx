import { accessProfileFacadeFactory } from "@/application/factories/access-profile-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { AccessProfileFormProps } from "@/domain/entities/access-profile";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { toastCustom } from "../../toaster/toast-custom";
import { useToastCustomDefaults } from "../../toaster/toast-customs/default-toasts-custom";
import { Button } from "../../ui/button";

export function useAccessProfileSheetForm({ closeSheet }: SheetFormProps) {
	const { setModalAndOpen, resetModal } = useModal();
	const form = useFormContext<AccessProfileFormProps>();
	// const token = useSession().data?.user.token ?? "";
	const { Exclude } = useToastCustomDefaults();
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("accessProfile");
	const accessProfileFacade = useMemo(() => accessProfileFacadeFactory(), []);
	const id = form.watch("id") ?? "";
	async function excludeAccessProfile(id: string) {
		await accessProfileFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="feriado" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function openModalExlcudeAccessProfile() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este feriado, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button
						className="bg-red-600"
						variant="destructive"
						onClick={() => excludeAccessProfile(id)}
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

	return {
		form,
		accessProfileFacade,
		id,
		excludeAccessProfile,
		openModalExlcudeAccessProfile,
	};
}
