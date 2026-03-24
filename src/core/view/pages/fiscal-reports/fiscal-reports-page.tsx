"use client";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";

import { SheetContentControllerProvider } from "@/application/providers/sheet-content/sheet-component-provider";
import { GridForm } from "@/view/components/formfields/grid-from";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { useRef } from "react";
import { FiscalReportCard } from "./fiscal-report-card";

export default function FiscalReportsPage() {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	return (
		<SheetContentControllerProvider>
			<div className="flex flex-col h-full">
				<div className="flex justify-between mb-4 items-center" ref={headerRef}>
					<h1 className="text-2xl font-semibold">Relatórios fiscais</h1>
				</div>
				<ScrollArea
					type="always"
					scrollBarClassName="h-[calc(100%-35px)] "
					style={{ height: height - 30, flex: "" }}
				>
					<GridForm gridCol="3" className="my-0 p-0 gap-[16px]">
						<FiscalReportCard
							title="AFD"
							description="O arquivo AFD (Arquivo Fonte de Dados) é gerado diretamente no equipamento REP-C e contém os registros de marcação de ponto, conforme exigido pela Portaria 671/2021."
							formToOpen="AFD"
						/>
						<FiscalReportCard
							title="AEJ"
							description="O Arquivo de Eventos de Jornada (AEJ) reúne dados sobre alterações e justificativas realizadas na jornada de trabalho dos colaboradores, sendo exigido em auditorias fiscais."
							formToOpen="AEJ"
						/>
						<FiscalReportCard
							title="Espelho de ponto"
							description="Relatório que consolida todas as marcações de ponto do colaborador, calculando horas trabalhadas, extras e faltas. Essencial para conferência e assinatura do funcionário."
							formToOpen="MirrorPoint"
						/>
						<FiscalReportCard
							title="Comprovantes"
							description="Relatório destinado à emissão dos comprovantes de marcação de ponto dos colaboradores, com base nos registros armazenados no sistema."
							formToOpen="ReceiptsMark"
						/>
						<FiscalReportCard
							title="Atestado REP-P"
							description="Documento que certifica que o sistema atua como REP-P (Registrador Eletrônico de Ponto por Programa), conforme normas da Portaria 671/2021."
							formToOpen="REPP"
						/>
						<FiscalReportCard
							title="Atestado PRTP"
							description="Relatório que atesta o funcionamento da PTRP (Programa de Tratamento de Registro de Ponto), garantindo a integridade dos dados da jornada."
							formToOpen="PRTP"
						/>
					</GridForm>
				</ScrollArea>
			</div>
		</SheetContentControllerProvider>
	);
}
