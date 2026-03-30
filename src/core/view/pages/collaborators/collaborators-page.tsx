"use client";
import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import { SheetOverSheetContentControllerProvider } from "@/application/providers/sheet-over-sheet-content/sheet-over-sheet-component-provider";
import type { Collaborator } from "@/domain/entities/collaborator/collaborator";
import { collaboratorStatusDefaultList } from "@/domain/entities/collaborator/collaborator-status";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import { CollaboratorHeaderSheetForm } from "@/view/components/forms/collaborator/collaborator-header-sheet-form";
import CollaboratorLayoutSheetForm from "@/view/components/forms/collaborator/collaborator-layout-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useCollaboratorsPage } from "./use-collaborators-page";

interface CollaboratorsPageParams {
	collaborators: PaginationDto<Collaborator[]>;
}

export default function CollaboratorsPage({ collaborators }: CollaboratorsPageParams) {
	const { columns, form, closeSheet } = useCollaboratorsPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);

	return (
		<div className="flex flex-col h-full">
			<div className="flex justify-between mb-4 items-center" ref={headerRef}>
				<h1 className="text-2xl font-semibold">Colaboradores</h1>
				<SheetOverSheetContentControllerProvider>
					<DataManager
						sheetParams={{
							title: <CollaboratorHeaderSheetForm />,
							description: "Preencha os campos obrigatórios para finalizar o cadastro.",
							labelOpenSheet: "Colaborador",
							FormComponent: <CollaboratorLayoutSheetForm closeSheet={() => closeSheet()} />,
							sheetMinWidth: "55vw",
							form,
						}}
						filterParams={{
							customFilters: [
								...collaboratorStatusDefaultList,
								{
									label: "Todos",
									value: "ANY",
								},
							],
						}}
					/>
				</SheetOverSheetContentControllerProvider>
			</div>
			<InfinityQueryProvider<Collaborator>
				queryKey="collaborator"
				facadeFactory={collaboratorsFacadeFactory}
				initialData={collaborators}
			>
				<InfinityTable<Collaborator>
					columns={columns}
					heightTable={height - 30}
					entity="colaborador"
				/>
			</InfinityQueryProvider>
		</div>
	);
}
