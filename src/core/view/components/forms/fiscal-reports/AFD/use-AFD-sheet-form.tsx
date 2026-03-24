import { useWebSocketAdapter } from "@/application/adapters/web-socket/use-web-socket-adapter";
import { fiscalReportsFacadeFactory } from "@/application/factories/fiscal-reports";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { AFDFormProps } from "@/domain/entities/fiscal-reports/AFD";
import { DownloadFileToast } from "@/view/components/reutilities-toasts/download-file-toast";
import { toastController } from "@/view/components/toaster/toast-controller";
import { toastError } from "@/view/components/toaster/toast-error";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export function useAFDSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<AFDFormProps>();
	const user = useSession().data?.user;
	const websocketAdapter = useWebSocketAdapter();

	const token = user?.token ?? "";
	const fiscalReportsFacade = useMemo(() => fiscalReportsFacadeFactory(token), [token]);
	async function onSubmit(data: AFDFormProps) {
		try {
			const response = await fiscalReportsFacade.generateAFD(data);
			const channelName = response?.data?.socketChannel;
			if (!channelName) throw new Error();
			toastController.custom({
				Component: (
					<DownloadFileToast
						fileName="AFD"
						loadFile={(setLink) => {
							websocketAdapter.connectAndListen<string>({
								eventCallback: ({ data }) => {
									if (typeof data !== "string") throw new Error();
									setLink(data);
								},
								channelName,
							});
						}}
					/>
				),
				duration: 99999999999,
			});

			closeSheet();
			form.reset();
		} catch {
			toastError({
				tittle: "Error",
			});
		}
	}

	return { form, onSubmit };
}
