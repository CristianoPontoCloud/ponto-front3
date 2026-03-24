import { LockOpen, ScanFace, Settings2 } from "lucide-react";
import type { ValueLabelIcon } from "../value-label";

export enum SettingTabsEnum {
	GENERAL = "GENERAL",
	PERMISSIONS = "PERMISSIONS",
	MARKING_PROFILE = "MARKING_PROFILE",
}

export const SettingsTabOptions: ValueLabelIcon[] = [
	{
		label: "Geral",
		value: SettingTabsEnum.GENERAL,
		icon: <Settings2 className="w-[16px] h-[16px]" />,
	},
	{
		label: "Permissões",
		value: SettingTabsEnum.PERMISSIONS,
		icon: <LockOpen className="w-[16px] h-[16px]" />,
	},
	{
		label: "Perfil de marcação",
		value: SettingTabsEnum.MARKING_PROFILE,
		icon: <ScanFace className="w-[16px] h-[16px]" />,
	},
];
