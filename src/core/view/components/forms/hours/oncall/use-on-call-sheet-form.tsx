import { oncallsFacadeFactory } from "@/application/factories/hours/on-calls-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { useCreateOrUpdateDispatcher } from "@/application/usecases/save-or-update-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import {
	type OnCallDetails,
	type OnCallFormProps,
	OnCallTypeEnum,
} from "@/domain/entities/on-call";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
import type { DayPickerBase } from "react-day-picker";
import { useFormContext } from "react-hook-form";

export default function useOnCallSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<OnCallFormProps>();
	const initialTime = form.watch("initialTime");
	const initialDate = form.watch("initialDate");
	const invalidDates: DayPickerBase["disabled"] = (date) =>
		date <= new Date(format(initialDate ?? "", "yyyy-MM-dd"));
	const disableFinalDate = initialDate === null;
	const disableEndHour = initialTime === "";
	const type = form.watch("type");
	const isTypeAllDay = type === OnCallTypeEnum.allDay;
	const {
		formState: { isSubmitting, isSubmitSuccessful },
		handleSubmit,
	} = form;
	const { setOpen } = useSheet();
	const id = form.watch("id");
	const { Exclude } = useToastCustomDefaults();
	const { setModalAndOpen, resetModal } = useModal();
	const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<OnCallFormProps, OnCallDetails>({
		closeSheet,
		form,
		queryKey: "oncall",
	});
	const token = useSession().data?.user.token ?? "";
	const oncallFacade = useMemo(() => oncallsFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("oncall");
	async function excludeOnCall(id: string) {
		await oncallFacade.delete(id);
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
	function openModalExlcudeOnCall() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este sobreaviso, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button
						className="bg-red-600"
						variant="destructive"
						onClick={() => excludeOnCall(id ?? "")}
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
	async function onSubmit(data: OnCallFormProps) {
		await executeCreateOrUpdate({
			data,
			entity: "sobreaviso",
			facadeFactorie: oncallFacade,
			catchFn: () => toastError({ tittle: "Erro de servidor" }),
		});
	}
	const { setValue } = form;
	useEffect(() => {
		if (isTypeAllDay) {
			setValue("initialDate", null);
			setValue("finalDate", null);
			return;
		}
		setValue("initialDate", null);
		setValue("finalDate", null);
	}, [type, setValue, isTypeAllDay]);

	useEffect(() => {
		if (isTypeAllDay) {
			setValue("finalDate", initialDate);
		}
	}, [initialDate, setValue, isTypeAllDay]);

	return {
		form,
		isSubmitting,
		handleSubmit,
		onSubmit,
		isSubmitSuccessful,
		setOpen,
		isTypeAllDay,
		disableFinalDate,
		disableEndHour,
		invalidDates,
		initialTime,
		openModalExlcudeOnCall,
		id,
	};
}
