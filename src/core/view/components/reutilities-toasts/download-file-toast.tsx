import { localEndpointsFactory } from "@/application/factories/local-enpoints-factory";
import { FileCheck, LoaderCircle, X } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface DownloadFileToastParams {
	fileName: string;
	// link?: string;
	loadFile(setLink: Dispatch<SetStateAction<string>>): void;
}

export function DownloadFileToast({ fileName, loadFile }: DownloadFileToastParams) {
	const [link, setLink] = useState<string>("");
	const localEndpoint = useMemo(() => localEndpointsFactory(), []);
	useEffect(() => loadFile(setLink), [setLink, loadFile]);
	function CancelButton() {
		return (
			<Button variant="link" className="px-0 text-black dark:text-white">
				Cancelar
			</Button>
		);
	}
	function SuccessBuildButtons() {
		return (
			<div className="flex gap-[16px]">
				<Button
					variant="link"
					className="px-0  text-black dark:text-white"
					onClick={() => {
						toast.dismiss();
					}}
				>
					Dispensar
				</Button>
				<Button
					variant="link"
					className="px-0 text-primary"
					onClick={async () => {
						const response = await localEndpoint.dowloadFile({ fileUrl: link });
						const blob = response.data;
						const url = window.URL.createObjectURL(blob);
						const a = document.createElement("a");
						a.href = url;
						a.download = link.split("/").pop() || "arquivo.ext";
						a.click();
						setTimeout(() => window.URL.revokeObjectURL(url), 1000);
					}}
				>
					Baixar arquivo
				</Button>
			</div>
		);
	}
	return (
		<div className="flex gap-3 items-start relative w-full">
			<Button
				variant="link"
				onClick={() => {
					toast.dismiss();
				}}
				size="icon"
				className="absolute text-muted-foreground top-[-14px] right-[-12px]"
			>
				<X />
			</Button>
			<div className="p-4 flex items-center justify-center border rounded-md relative">
				{!link ? (
					<LoaderCircle className="absolute animate-spin h-[14px] w-[14px]" />
				) : (
					<FileCheck className="absolute h-[14px] w-[14px] text-lime-600" />
				)}
			</div>
			<div className="w-full h-full flex flex-col items-start">
				<p className="">{!link ? "Preparando arquivo" : "Arquivo gerado com sucesso!"}</p>
				<p className="text-muted-foreground">{fileName}</p>
				{!link ? <CancelButton /> : <SuccessBuildButtons />}
			</div>
		</div>
	);
}
