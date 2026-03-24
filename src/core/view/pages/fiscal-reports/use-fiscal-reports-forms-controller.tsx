import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import { AEJSchema } from "@/application/validation/forms/fiscal-reports/AEJ";
import { AFDSchema } from "@/application/validation/forms/fiscal-reports/AFD";
import { mirrorMarkSchema } from "@/application/validation/forms/fiscal-reports/mirror-point";
import { receiptsMarkSchema } from "@/application/validation/forms/fiscal-reports/receipts-mark";
import type { AEJFormProps } from "@/domain/entities/fiscal-reports/AEJ";
import type { AFDFormProps } from "@/domain/entities/fiscal-reports/AFD";
import type { MirrorPointFormProps } from "@/domain/entities/fiscal-reports/mirror-point";
import type { ReceiptsMarkFormProps } from "@/domain/entities/fiscal-reports/receipts-marks";
import AEJSheetForm from "@/view/components/forms/fiscal-reports/AEJ/AEJ-sheet-form";
import AFDSheetForm from "@/view/components/forms/fiscal-reports/AFD/AFD-sheet-form";
import MirrorPointSheetForm from "@/view/components/forms/fiscal-reports/mirror-point/mirror-point-sheet-form";
import ReceiptsMarkSheetForm from "@/view/components/forms/fiscal-reports/receipts-mark/receipts-mark-sheet-form";
import { DownloadFileToast } from "@/view/components/reutilities-toasts/download-file-toast";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";

export function useFiscalReportsFormsController() {
	const user = useSession().data?.user;
	const companyId = user?.companyId ?? "";
	const collaboratorId = user?.collaboratorId ?? "";
	const { setContentAndOpen, reset } = useContextSheetContentController();
	const AEJ_inital_values: AEJFormProps = {
		collaborators: [],
		turns: [],
		costcenters: [],
		departments: [],
		positions: [],
		periodEnd: null,
		periodStart: null,
		companyId,
	};
	const AFD_inital_values: AFDFormProps = {
		collaborators: [],
		turns: [],
		costcenters: [],
		departments: [],
		positions: [],
		periodEnd: null,
		periodStart: null,
		repDeviceId: "",
		requesterId: collaboratorId,
		companyId,
	};
	const aejForm = useForm<AEJFormProps>({
		values: AEJ_inital_values,
		resolver: zodResolver(AEJSchema),
		mode: "onSubmit",
	});
	const afdForm = useForm<AFDFormProps>({
		values: AFD_inital_values,
		resolver: zodResolver(AFDSchema),
		mode: "onSubmit",
	});
	const mirrorPointForm = useForm<MirrorPointFormProps>({
		values: {
			collaborators: [],
			turns: [],
			costcenters: [],
			departments: [],
			positions: [],
			competence: "",
		},
		resolver: zodResolver(mirrorMarkSchema),
		mode: "onSubmit",
	});
	const receiptsMarkForm = useForm<ReceiptsMarkFormProps>({
		values: {
			collaborators: [],
			format: "",
			endDate: null,
			startDate: null,
		},
		resolver: zodResolver(receiptsMarkSchema),
		mode: "onSubmit",
	});

	function AEJ() {
		setContentAndOpen({
			Body: (
				<FormProvider {...aejForm}>
					<AEJSheetForm closeSheet={reset} />
				</FormProvider>
			),
			Header: "Gerar - AEJ",
			sheetWidth: "22vw",
			sheetMinWidth: "410px",
		});
	}
	function AFD() {
		setContentAndOpen({
			Body: (
				<FormProvider {...afdForm}>
					<AFDSheetForm closeSheet={reset} />
				</FormProvider>
			),
			Header: "Gerar - AFD",
			sheetWidth: "22vw",
			sheetMinWidth: "410px",
		});
	}
	function MirrorPoint() {
		setContentAndOpen({
			Body: (
				<FormProvider {...mirrorPointForm}>
					<MirrorPointSheetForm closeSheet={reset} />
				</FormProvider>
			),
			Header: "Gerar - Espelho de ponto",
			sheetWidth: "22vw",
			sheetMinWidth: "410px",
		});
	}
	function ReceiptsMark() {
		setContentAndOpen({
			Body: (
				<FormProvider {...receiptsMarkForm}>
					<ReceiptsMarkSheetForm closeSheet={reset} />
				</FormProvider>
			),
			Header: "Gerar - Comprovantes de marcação",
			sheetWidth: "22vw",
			sheetMinWidth: "410px",
		});
	}
	function REPP() {
		toastCustom({
			classNames: "w-[296px]",
			Component: <DownloadFileToast fileName="Atestado REP-P" loadFile={() => {}} />,
		});
	}
	function PRTP() {
		toastCustom({
			Component: <DownloadFileToast fileName="Atestado REP-P" loadFile={() => {}} />,
		});
	}

	return {
		AEJ,
		AFD,
		MirrorPoint,
		ReceiptsMark,
		REPP,
		PRTP,
	};
}
