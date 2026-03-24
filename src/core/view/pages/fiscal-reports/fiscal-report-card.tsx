import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { File } from "lucide-react";
import { useFiscalReportsFormsController } from "./use-fiscal-reports-forms-controller";

interface FiscalReportCardParams {
	title: string;
	description: string;
	formToOpen: "AEJ" | "AFD" | "MirrorPoint" | "ReceiptsMark" | "REPP" | "PRTP";
}
export function FiscalReportCard({ description, title, formToOpen }: FiscalReportCardParams) {
	const formsController = useFiscalReportsFormsController();
	return (
		<div className="w-full flex flex-col gap-6 rounded-lg border justify-between p-4">
			<div className="flex items-center justify-between w-full">
				<div className="flex gap-4 items-center w-full">
					<div className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted">
						<File className="text-muted-foreground rounded-lg dark" />
					</div>
					<p className="text-md font-semibold">{title}</p>
				</div>
				<Badge className="w-[50px] h-[20px] py-1 px-2 flex justify-center items-center bg-muted text-muted-foreground shadow-none">
					Fiscal
				</Badge>
			</div>
			<p className="text-muted-foreground">{description}</p>
			<div className="w-full flex justify-end">
				<Button
					variant="outline"
					className="w-fit"
					type="button"
					onClick={() => formsController[formToOpen]()}
				>
					Gerar
				</Button>
			</div>
		</div>
	);
}
