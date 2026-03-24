import { hourBanksFacadeFactory } from "@/application/factories/hours/hour-banks-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useCreateOrUpdateDispatcher } from "@/application/usecases/save-or-update-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { HourBankDetails, HourBankFormProps } from "@/domain/entities/hour-bank";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export default function useHourBankSheetForm({ closeSheet }: SheetFormProps) {
	const methods = useFormContext<HourBankFormProps>();
	const {
		formState: { isSubmitting, isSubmitSuccessful },
		handleSubmit,
	} = methods;

	const id = methods.watch("id");
	const { Exclude } = useToastCustomDefaults();
	const { setModalAndOpen, resetModal } = useModal();

	const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<HourBankFormProps, HourBankDetails>(
		{
			queryKey: "hour-bank",
			closeSheet,
			form: methods,
		},
	);
	const token = useSession().data?.user.token ?? "";
	const hourBankFacade = useMemo(() => hourBanksFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("hour-bank");
	async function excludeHourBank(id: string) {
		await hourBankFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="banco de horas" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function openModalExlcudeHourBank() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este banco de horas, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button
						className="bg-red-600"
						variant="destructive"
						onClick={() => excludeHourBank(id ?? "")}
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
	async function onSubmit(data: HourBankFormProps) {
		await executeCreateOrUpdate({
			data,
			entity: "Banco de horas",
			facadeFactorie: hourBankFacade,
			catchFn: () => toastError({ tittle: "Erro de servidor" }),
		});
	}
	return {
		methods,
		isSubmitting,
		handleSubmit,
		onSubmit,
		openModalExlcudeHourBank,
		id,
		isSubmitSuccessful,
	};
}
