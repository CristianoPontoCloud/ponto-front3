import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { Trash } from "lucide-react";
import { DevicePermissionCard } from "../../entities/marking-permition/device-permission-card";
import { GridForm } from "../../formfields/grid-from";
import { InputForm } from "../../formfields/input-form-field";
import { LabelForm } from "../../formfields/label-form";
import SelectStatusForm from "../../formfields/select-status-form";
import { SheetFooterSubmit } from "../../sheet/sheet-footer-submit";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { useAccessProfileSheetForm } from "./use-access-profile-sheet-form";

export function AccessProfileSheetForm({ closeSheet }: SheetFormProps) {
	const { form, id, openModalExlcudeAccessProfile } = useAccessProfileSheetForm({ closeSheet });
	// const { setModalAndOpen, resetModal } = useModal();
	// // const form = useFormContext<AccessProfileFormProps>();
	// const token = useSession().data?.user.token ?? "";
	// const { Exclude } = useToastCustomDefaults();
	// const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("accessProfile");
	// const accessProfileFacade = useMemo(() => accessProfileFacadeFactory(token), [token]);
	// const id = form.watch("id") ?? "";
	const fullspan = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	// async function excludeAccessProfile(id: string) {
	// 	await accessProfileFacade.delete(id);
	// 	invalidateQueryAndRefetch();
	// 	resetModal();
	// 	closeSheet();
	// 	toastCustom({
	// 		Component: <Exclude entity="feriado" />,
	// 		action: {
	// 			label: "Desfazer",
	// 			onClick: () => console.log("desfazendo..."),
	// 		},
	// 	});
	// }
	// function openModalExlcudeAccessProfile() {
	// 	setModalAndOpen({
	// 		title: "Tem certeza que deseja excluir?",
	// 		description:
	// 			"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este feriado, pois as atribuições serão perdidas.",
	// 		footer: (
	// 			<>
	// 				<Button
	// 					className="bg-red-600"
	// 					variant="destructive"
	// 					onClick={() => excludeAccessProfile(id)}
	// 				>
	// 					Excluir
	// 				</Button>
	// 				<Button variant="secondary" onClick={() => resetModal()}>
	// 					Cancelar
	// 				</Button>
	// 			</>
	// 		),
	// 	});
	// }
	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeAccessProfile()}
					>
						<Trash className="text-red-500" />
					</Button>
				)}
				<SelectStatusForm
					formFieldName="status"
					form={form}
					classNames={{
						formItem: "w-fit",
					}}
				/>
			</div>
		);
	}
	return (
		<GridForm className="mt-0">
			<InputForm
				form={form}
				formFieldName="name"
				label="Nome"
				placeholder="Informe o nome"
				classNames={{ formItem: fullspan }}
				required
			/>
			<Separator orientation="horizontal" className={fullspan} />
			<LabelForm
				label="Dispositivo permitidos"
				description="description"
				classNameLabel={fullspan}
			/>
			<DevicePermissionCard device="mobile" classNames={{ wrapper: "col-span-1" }} />
			<DevicePermissionCard device="web" classNames={{ wrapper: "col-span-1" }} />
			<SheetFooterSubmit onCancel={closeSheet} LeftChild={<LeftChild />} />
		</GridForm>
	);
}
