import { type ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { AccessesCredentialsForm } from "./tabs/credentials/accesses-credentials-form";
import { AccessesReppSettingsForm } from "./tabs/repp-settings/accesses-repp-settings-form";

type AccessesTabsObject = Record<"credentials" | "reppSettings", ReactNode>;

export default function useAccessesForm() {
	const { getValues, setValue } = useFormContext();
	const [pinsMobile, setPinsMobile] = useState<boolean>(false);
	const [pinsWeb, setPinsWeb] = useState<boolean>(false);

	const accessesTabs: AccessesTabsObject = {
		credentials: <AccessesCredentialsForm />,
		reppSettings: <AccessesReppSettingsForm />,
	};
	const [TabRender, setTabRender] = useState<ReactNode>(accessesTabs.credentials);
	function onTabChange(tab: keyof AccessesTabsObject) {
		setTabRender(accessesTabs[tab]);
	}
	const perfilOptions = [
		{ value: "1", label: "Administrador" },
		{ value: "2", label: "Usuário Comum" },
	];

	const fusoOptions = [
		{ value: "1", label: "Brasília - DF (GMT-3)" },
		{ value: "2", label: "Manaus - AM (GMT-5)" },
	];

	const geoOptions = [
		{ value: "1", label: "50m" },
		{ value: "2", label: "100m" },
		{ value: "3", label: "500m" },
		{ value: "4", label: "1km" },
	];

	const perfilAcessoOptions = [
		{ value: "1", label: "perfil 1" },
		{ value: "2", label: "perfil 2" },
	];

	const typeMarcationPin = [
		{ field: "recognitionFacial", label: "Reconhecimento Facial" },
		{ field: "recognitionBiometric", label: "Reconhecimento biométrico" },
		{ field: "pin", label: "PIN" },
		{ field: "badge", label: "Crácha" },
		{ field: "barCode", label: "Código de barras" },
		{ field: "qrCode", label: "QR code" },
	];

	const acessosWebPin = [
		{ field: "markWebPoint", label: "Marcar ponto" },
		{ field: "photoWeb", label: "Foto" },
		{ field: "throwJustificationWeb", label: "Lançar justificativa" },
	];
	const acessosMobilePin = [
		{ field: "markMobilePoint", label: "Marcar ponto" },
		{ field: "photoMobile", label: "Foto" },
		{ field: "throwJustificationMobile", label: "Lançar justificativa" },
	];

	function copyPassword() {
		const password = getValues("password");
		navigator.clipboard.writeText(password);
	}

	function generatePassword() {
		setValue("password", uuidv4(), { shouldValidate: true });
	}

	function handlePinAccessesWeb() {
		if (!pinsWeb) {
			setPinsWeb(true);
			return;
		}
		setPinsWeb(false);
		acessosWebPin.map(({ field }) => {
			setValue(field, false);
		});
	}

	function handlePinAccessesMobile() {
		if (!pinsMobile) {
			setPinsMobile(true);
			return;
		}
		setPinsMobile(false);
		acessosMobilePin.map(({ field }) => {
			setValue(field, false);
		});
	}
	return {
		copyPassword,
		generatePassword,
		perfilOptions,
		fusoOptions,
		geoOptions,
		perfilAcessoOptions,
		typeMarcationPin,
		acessosWebPin,
		acessosMobilePin,
		handlePinAccessesMobile,
		pinsMobile,
		handlePinAccessesWeb,
		pinsWeb,
		TabRender,
		onTabChange,
	};
}
