import { type CollaboratorFormProps, CollaboratorMarkupEnum } from "@/domain/entities/collaborator/collaborator";
import { DevicePermissionCard } from "@/view/components/entities/marking-permition/device-permission-card";
import { GridForm } from "@/view/components/formfields/grid-from";
import MultiSelectForm from "@/view/components/formfields/mult-select-form";
import SelectForm from "@/view/components/formfields/select-form";
import { Separator } from "@/view/components/ui/separator";
import { useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import useAccessesForm from "../../use-acess-form";

export function AccessesReppSettingsForm() {
	const form = useFormContext<CollaboratorFormProps>();
	const { fusoOptions } = useAccessesForm();
	const fullspan = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	const markupDefault = form.watch("markupDefault");
	const { setValue } = form
	const enablePermitionsTo = useCallback(
		(device: "web" | "mobile") => {
			setValue(`${device}`, {
				badge: true,
				barCode: true,
				biometricRecognition: true,
				facialRecognition: true,
				hasAccess: true,
				photo: true,
				pin: true,
				pointMark: true,
				qrCode: true,
				throwJustify: true,
			});
			setValue(`${device === "web" ? "mobile" : "web"}`, {
				badge: false,
				barCode: false,
				biometricRecognition: false,
				facialRecognition: false,
				hasAccess: false,
				photo: false,
				pin: false,
				pointMark: false,
				qrCode: false,
				throwJustify: false,
			});
		},
		[setValue],
	);
	const { CUSTOM, MOBILE, WEB } = CollaboratorMarkupEnum
	const disableDevice = useCallback(() => {
		if (markupDefault === CUSTOM) return false;
		return true;
	}, [markupDefault]);

	const markupCase = useMemo(() => ({
		[MOBILE]: () => enablePermitionsTo("mobile"),
		[WEB]: () => enablePermitionsTo("web"),
		[CUSTOM]: () => { },
	}), [enablePermitionsTo])
	useEffect(() => {
		markupCase[markupDefault]()
	}, [markupDefault, markupCase]);

	return (
		<GridForm className="m-0">
			<MultiSelectForm
				form={form}
				formFieldName="geo"
				placeholder="Selecione"
				label="Delimitação geográfica"
				endpoint="geo-fence/findAllByCompanyId"
				classNames={{
					formItem: fullspan,
				}}
			// options={geoOptions}
			/>
			<SelectForm
				form={form}
				formFieldName="fuso"
				placeholder="Selecione o fuso horário"
				label="Fuso horário"
				classNames={{
					formItem: fullspan,
				}}
				datas={fusoOptions}
			/>

			<Separator className="w-full h-[1px] bg-muted col-span-2" />

			<SelectForm
				form={form}
				formFieldName="markupDefault"
				placeholder="Selecione o padrão"
				label="Padrão de marcação"
				classNames={{
					formItem: fullspan,
				}}
				datas={[
					{ label: "Somente mobile", value: CollaboratorMarkupEnum.MOBILE },
					{ label: "Somente web", value: CollaboratorMarkupEnum.WEB },
					{ label: "Personalizado", value: CollaboratorMarkupEnum.CUSTOM },
				]}
			/>
			<DevicePermissionCard
				device="mobile"
				classNames={{ wrapper: "col-span-1" }}
				disable={disableDevice()}
			/>
			<DevicePermissionCard
				device="web"
				classNames={{ wrapper: "col-span-1" }}
				disable={disableDevice()}
			/>
		</GridForm>
	);
}
