import type { DevicePermissionsForm } from "@/domain/entities/access-profile";
import { Card } from "@/view/components/card/card";
import { CheckboxForm } from "@/view/components/formfields/checkbox-form";
import { SwitchForm } from "@/view/components/formfields/switch-form-field";
import { Monitor, Smartphone } from "lucide-react";
import { type UseFormReturn, useFormContext } from "react-hook-form";

interface DevicePermissionCardParams {
	device: "mobile" | "web";
	classNames?: {
		wrapper?: string;
		header?: string;
		content?: string;
		footer?: string;
	};
	disable?: boolean;
}
interface CardComponentsParams {
	form: UseFormReturn<DevicePermissionsForm>;
	device: DevicePermissionCardParams["device"];
	disable?: boolean;
}

function Header({ form, device, disable = false }: CardComponentsParams) {
	const firstLetterCapitalizeName = device.charAt(0).toUpperCase() + device.slice(1);
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				{device === "mobile" && <Smartphone className="w-5 h-5 text-primary" />}
				{device === "web" && <Monitor className="w-5 h-5 text-primary" />}
				<span>{firstLetterCapitalizeName}</span>
			</div>
			<SwitchForm form={form} formFieldName={`${device}.hasAccess`} disabled={disable} />
		</div>
	);
}
function Footer({ form, device, disable = false }: CardComponentsParams) {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<span className="font-medium">Foto</span>
				<SwitchForm form={form} formFieldName={`${device}.photo`} disabled={disable} />
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium">Lançar justificativa</span>
				<SwitchForm form={form} formFieldName={`${device}.throwJustify`} disabled={disable} />
			</div>
		</div>
	);
}
export function DevicePermissionCard({
	device,
	classNames,
	disable = false,
}: DevicePermissionCardParams) {
	const form = useFormContext<DevicePermissionsForm>();

	return (
		<Card
			disable={disable}
			classNames={classNames}
			header={<Header form={form} device={device} disable={disable} />}
			footer={<Footer form={form} device={device} disable={disable} />}
		>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<span>Marcar ponto</span>
					<SwitchForm form={form} formFieldName={`${device}.pointMark`} />
				</div>
				<div className="flex flex-col gap-3">
					<CheckboxForm
						form={form}
						formFieldName={`${device}.facialRecognition`}
						label="Rec. facial"
						classNameLabel="font-thin"
						disable={disable}
					/>
					<CheckboxForm
						form={form}
						formFieldName={`${device}.biometricRecognition`}
						label="Rec. biométrico"
						classNameLabel="font-thin"
						disable={disable}
					/>
					<CheckboxForm
						form={form}
						formFieldName={`${device}.barCode`}
						label="Cód. barra"
						classNameLabel="font-thin"
						disable={disable}
					/>
					<CheckboxForm
						form={form}
						formFieldName={`${device}.badge`}
						label="Crachá"
						classNameLabel="font-thin"
						disable={disable}
					/>
					<CheckboxForm
						form={form}
						formFieldName={`${device}.pin`}
						label="PIN"
						classNameLabel="font-thin"
						disable={disable}
					/>
				</div>
			</div>
		</Card>
	);
}
