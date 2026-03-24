import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { CardCheckbox } from "@/view/components/card-checkbox/card-checkbox";
import { DownloadFileToast } from "@/view/components/reutilities-toasts/download-file-toast";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { Button } from "@/view/components/ui/button";
import { useState } from "react";

export function ReceiptModal() {
	const [downloadMode, setDownLoadMode] = useState<"DEFAULT" | "ECONOMIC">("DEFAULT");
	const { resetModal } = useModal();

	return (
		<div className="flex flex-col gap-3">
			<CardCheckbox
				checked={downloadMode === "DEFAULT"}
				title="Padrão"
				description="1 comprovante por folha"
				onClick={() => setDownLoadMode("DEFAULT")}
			/>
			<CardCheckbox
				checked={downloadMode === "ECONOMIC"}
				title="Econômico"
				description="Até 4 comprovante por folha"
				onClick={() => setDownLoadMode("ECONOMIC")}
			/>
			<div className="w-full flex justify-end gap-3">
				<Button type="button" onClick={() => resetModal()} variant="outline">
					Cancelar
				</Button>
				<Button
					onClick={() => {
						toastCustom({
							Component: <DownloadFileToast fileName="Espelho de ponto" loadFile={() => {}} />,
						});
						resetModal();
					}}
				>
					Baixar
				</Button>
			</div>
		</div>
	);
}
