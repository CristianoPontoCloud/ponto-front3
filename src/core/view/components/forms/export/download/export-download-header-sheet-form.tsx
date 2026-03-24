import { Download } from "lucide-react";

export function ExportDownloadHeaderSheetForm({ name }: { name: string }) {
	return (
		<div className="flex gap-3">
			<Download className="w-[18px] h-[18px]" />
			<h2 className="">{`Exportar - ${name}`}</h2>
		</div>
	);
}
