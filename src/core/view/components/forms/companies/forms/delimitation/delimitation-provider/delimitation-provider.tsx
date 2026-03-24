"use client";
import type { GeoFence } from "@/domain/entities/delimitation";
import type { EditDto } from "@/domain/http/http-client";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { Button } from "@/view/components/ui/button";
import { createContext, useContext, useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { CreateAndEditGeoFence } from "../delimitation-actions-types";
import type {
	DelimitationChangeStatusParams,
	DelimitationContextProps,
	DelimitationProviderParams,
} from "./delimitation-type";
import { useDelimitationProviderForm } from "./use-delimitation-provider-form";
import { useDelimitationProviderSetup } from "./use-delimitation-provider-setup";

const defaultValue: DelimitationContextProps = {
	delimitationForm: {} as UseFormReturn<CreateAndEditGeoFence>,
	openSheetDelimitation: false,
	setOpenSheetDelimitation: () => {},
	openDelimitationForm: () => {},
	openEditDelimitationForm: async () => {},
	openModalExcludeDelimitation: () => {},
	delimitationsQuery: undefined,
	delimitationId: "",
	changeStatusDelimitation: async () => {},
	handleSubmit: async () => {},
	setType: () => {},
	type: "address",
};

const DelimitationContext = createContext<DelimitationContextProps>(defaultValue);

export function DelimitationProvider({ children }: DelimitationProviderParams) {
	const {
		companyId,
		delimitationsQuery,
		invalidateQueryAndRefetch,
		openSheetDelimitation,
		resetModal,
		setModalAndOpen,
		setOpenSheetDelimitation,
		setType,
		type,
		delimitationFacade,
	} = useDelimitationProviderSetup();
	const { delimitationForm, delimitationId, initialFormValue, initialType } =
		useDelimitationProviderForm({ type });

	function resetStates() {
		setOpenSheetDelimitation(false);
		resetModal();
		delimitationForm.reset(initialFormValue);
	}
	function openDelimitationForm() {
		setOpenSheetDelimitation(true);
	}
	async function openEditDelimitationForm(delimitationId: string) {
		try {
			const delimitation = await delimitationFacade.findById(delimitationId);
			delimitationForm.reset(delimitation as CreateAndEditGeoFence);
			openDelimitationForm();
		} catch {
			toastController.error({
				tittle: "Erro",
			});
		}
	}
	async function excludeDelimitation(delimitationId: string) {
		try {
			await delimitationFacade.delete(delimitationId);
			resetStates();
			toastController.custom({
				Component: (
					<div className="flex flex-col gap-2 w-fit truncate">
						<p className="font-semibold">Delimitação geográfica excluída com sucesso!</p>
						<p>{dateSubmited()}</p>
					</div>
				),
				action: {
					label: "Desfazer",
					onClick: () => {},
				},
			});
			invalidateQueryAndRefetch();
		} catch {
			toastController.error({
				tittle: "Erro",
			});
		}
	}

	async function openModalExcludeDelimitation(delimitationId: string) {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			content: (
				<p className="text-muted-foreground">
					Antes de prosseguir, certifique-se que nenhum colaborador está atribuído a esta
					delimitação geográfica, pois todas as atribuições vinculadas serão permanentemente
					perdidas.
				</p>
			),
			footer: (
				<div className="flex gap-2">
					<Button
						className="bg-red-600"
						variant="destructive"
						type="button"
						onClick={() => excludeDelimitation(delimitationId)}
					>
						Excluir
					</Button>
					<Button variant="secondary" type="button" onClick={() => resetModal()}>
						Cancelar
					</Button>
				</div>
			),
		});
	}

	async function changeStatusDelimitation({
		delimitationId,
		newStatus,
	}: DelimitationChangeStatusParams) {
		function Toast({ status }: { status: boolean }) {
			const statusMessage = status ? "ativada" : "inativada";
			return (
				<div className="flex flex-col gap-2 w-[318px] truncate">
					<p className="font-semibold">Delimitação geográfica {statusMessage} com sucesso!</p>
					<p>{dateSubmited()}</p>
				</div>
			);
		}
		try {
			await delimitationFacade.update({
				id: delimitationId,
				active: newStatus,
				companyId,
			});
			invalidateQueryAndRefetch();
			toastController.custom({
				Component: <Toast status={newStatus} />,
				action: {
					label: "Desfazer",
					onClick: () => {},
				},
			});
			invalidateQueryAndRefetch();
		} catch {
			toastController.error({
				tittle: "Erro",
			});
		}
	}
	async function handleSubmit() {
		const id = delimitationForm.watch("id");
		const data = delimitationForm.watch();
		function Toast() {
			return (
				<div className="flex flex-col gap-2 w-[318px] truncate">
					<p className="font-semibold">
						Delimitação geográfica {id ? "criada" : "alterada"} com sucesso!
					</p>
					<p>{dateSubmited()}</p>
				</div>
			);
		}
		try {
			if (id) {
				await delimitationFacade.update(data as EditDto<GeoFence>);
				toastController.custom({
					Component: <Toast />,
					action: {
						label: "Desfazer",
						onClick: () => {},
					},
				});
			}
			if (!id) {
				await delimitationFacade.create(data);
			}
			invalidateQueryAndRefetch();
			resetStates();
		} catch {
			toastController.error({
				tittle: "Erro",
			});
		}
	}

	useEffect(() => {
		setType(initialType);
	}, [initialType, setType]);
	useEffect(() => {
		if (!openSheetDelimitation) {
			delimitationForm.reset(initialFormValue);
			setType("address");
		}
	}, [openSheetDelimitation, delimitationForm, setType, initialFormValue]);

	return (
		<DelimitationContext.Provider
			value={{
				delimitationsQuery,
				delimitationId,
				delimitationForm,
				openSheetDelimitation,
				setOpenSheetDelimitation,
				openEditDelimitationForm,
				openModalExcludeDelimitation,
				openDelimitationForm,
				changeStatusDelimitation,
				type,
				setType,
				handleSubmit,
			}}
		>
			{children}
		</DelimitationContext.Provider>
	);
}

export const useDelimitationProvider = () => {
	const context = useContext(DelimitationContext);

	return context;
};
