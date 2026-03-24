"use client";
import { accessProfileFacadeFactory } from "@/application/factories/access-profile-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { AccessProfile } from "@/domain/entities/access-profile";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import { AccessProfileSheetForm } from "@/view/components/forms/access-profile/access-profile-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useAccessProfilePage } from "./use-access-profile-page";

interface AccessProfileParams {
	markingProlfiles: PaginationDto<AccessProfile[]>;
}
export function AccessProfilePage({ markingProlfiles }: AccessProfileParams) {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef) - 33;

	const { form, columns, closeSheet } = useAccessProfilePage();
	const id = form.watch("id");

	return (
		<InfinityQueryProvider<AccessProfile>
			queryKey="marking-profile"
			facadeFactory={accessProfileFacadeFactory}
			initialData={markingProlfiles}
		>
			{/* <div
				className={`absolute inset-0 transition-opacity duration-300 ${
					tab === SettingTabsEnum.MARKING_PROFILE ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
			> */}
			<div className="flex flex-col py-4">
				<div className="flex justify-between items-center" ref={headerRef}>
					<h1 className="text-xl font-semibold">Permissões</h1>
					<DataManager
						sheetParams={{
							form,
							FormComponent: <AccessProfileSheetForm closeSheet={closeSheet} />,
							labelOpenSheet: "Adicionar",
							title: `${id ? "Cadastrar" : "Editar"} perfil de marcação`,
							sheetWidth: "22vw",
							sheetMinWidth: "512px",
						}}
						renderingSearch={false}
						rederingFilterController={false}
					/>
				</div>
			</div>
			<InfinityTable<AccessProfile>
				columns={columns}
				heightTable={height}
				entity="perfil de marcação"
				// className="border-solid rounded-t-none border-t-0 !important"
			/>
			{/* </div> */}
		</InfinityQueryProvider>
	);
}
