import { useWebSocketAdapter } from "@/application/adapters/web-socket/use-web-socket-adapter";
import { fiscalReportsFacadeFactory } from "@/application/factories/fiscal-reports";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { AEJFormProps, AEJGenereationResponse } from "@/domain/entities/fiscal-reports/AEJ";
import { DownloadFileToast } from "@/view/components/reutilities-toasts/download-file-toast";
import { toastController } from "@/view/components/toaster/toast-controller";
import { toastError } from "@/view/components/toaster/toast-error";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export function useAEJSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<AEJFormProps>();
	const user = useSession().data?.user;
	const websocketAdapter = useWebSocketAdapter();
	const token = user?.token ?? "";
	const fiscalReportsFacade = useMemo(() => fiscalReportsFacadeFactory(token), [token]);
	async function onSubmit(data: AEJFormProps) {
		try {
			const response = await fiscalReportsFacade.generateAEJ(data);
			const channelName = response?.data?.socketChannel;
			if (!channelName) throw new Error();
			toastController.custom({
				Component: (
					<DownloadFileToast
						fileName="AEJ"
						loadFile={(setLink) => {
							websocketAdapter.connectAndListen<AEJGenereationResponse>({
								eventCallback: ({ data }) => {
									const publicUrl = data?.publicUrl;
									if (!publicUrl) throw new Error();
									setLink(publicUrl);
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
