import { accessProfileFacadeFactory } from "@/application/factories/access-profile-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { accessProfileSchema } from "@/application/validation/forms/access-profile-schema";
import type { Option } from "@/domain/components/options";
import type { AccessProfile, AccessProfileFormProps } from "@/domain/entities/access-profile";
import { StatusDefaultEnum, getStatus } from "@/domain/usecases/status-default";
import { generateStatusColumn } from "@/view/components/inifity-table/generate-status-column";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { accessProfileInitialValues } from "./marking-profile-initial-values";

export function useAccessProfilePage() {
	const [formValues, setFormValues] = useState<AccessProfileFormProps>(accessProfileInitialValues);
	const form = useForm({
		values: formValues,
		mode: "onSubmit",
		resolver: zodResolver(accessProfileSchema),
	});
	const { setModalAndOpen, resetModal } = useModal();
	const { setOpen, open } = useSheet();
	const session = useSession();
	// const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const accessProfileFacade = useMemo(() => accessProfileFacadeFactory(), []);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("marking-profile");
	const toastDefaults = useToastCustomDefaults();

	async function editMarkProfile(markProfileId: string) {
		async function getAccessProfileFormValues() {
			const form = await accessProfileFacade.findById(markProfileId);
			if (!form) return;
			setFormValues({ ...form });
		}
		await getAccessProfileFormValues();
		setOpen(true);
	}
	async function excludeAccessProfile(companyId: string) {
		await accessProfileFacade.delete(companyId);
		invalidateQueryAndRefetch();
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="perfil de marcação" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	const optionsConfig = (markProfile: AccessProfile): Option[] => {
		const { id, status } = markProfile;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Gerenciar",
				onClick: () => editMarkProfile(markProfile.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<AccessProfile>({
						id: markProfile.id,
						status: markProfile.status,
						facadeFactorie: accessProfileFacade,
						entity: "perfil de marcação",
						finallyFn: async () => await invalidateQueryAndRefetch(),
						companyId,
					});
				},
				hasSeparator: true,
			},
			{
				label: "Excluir",
				onClick: () =>
					setModalAndOpen({
						title: "Tem certeza que deseja excluir?",
						description:
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este perfil de marcação, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeAccessProfile(id)}
								>
									Excluir
								</Button>
								<Button variant="secondary" onClick={() => resetModal()}>
									Cancelar
								</Button>
							</>
						),
					}),

				className: "text-red-500 focus:bg-red-500 focus:text-background !important",
			},
		];
	};
	const columns: ColumnDef<AccessProfile>[] = [
		{
			accessorKey: "name",
			header: () => <div>Nome</div>,
			cell: ({ row }) => {
				return <div className="font-medium">{row.getValue("name")}</div>;
			},
		},
		{
			accessorKey: "devices",
			header: () => <div>Desipositivos permitidos</div>,
			cell: ({
				row: {
					original: { web, mobile },
				},
			}) => {
				const webPermitions = Object.values(web).some((value) => value === true);
				const mobilePermitions = Object.values(mobile).some((value) => value === true);
				return (
					<div className="flex gap-2  text-xs">
						{webPermitions && (
							<Badge className="px-2 py-1 h-[20px]  bg-muted text-muted-foreground">Web</Badge>
						)}
						{mobilePermitions && (
							<Badge className="px-2 py-1 h-[20px]  bg-muted text-muted-foreground">Mobile</Badge>
						)}
					</div>
				);
			},
		},
		{
			accessorKey: "collaborators",
			header: () => <div>Qtd colaboradores</div>,
			cell: ({ row }) => {
				return <div className="font-medium ">{row.getValue<string[]>("collaborators").length}</div>;
			},
		},
		generateStatusColumn<AccessProfile>({
			classNames: {
				cell: "flex justify-between",
				header: "p-0",
			},
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];
	function closeSheet() {
		setFormValues(formValues);
		setOpen(false);
	}
	useEffect(() => {
		if (open) return;
		setFormValues(accessProfileInitialValues);
		form.reset(accessProfileInitialValues);
	}, [open, form, setFormValues]);
	return { form, columns, closeSheet };
}
