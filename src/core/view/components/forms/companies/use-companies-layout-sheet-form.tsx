import { companiesFacadeFactory } from "@/application/factories/companies-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useCreateOrUpdateDispatcher } from "@/application/usecases/save-or-update-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { SheetMenuItem } from "@/domain/components/sheet/sheet-menu-lateral";
import type { CompanyFormProps, CreateCompanyResponse } from "@/domain/entities/companies";
import { Building, MapPin, MapPinned, Palette } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toastCustom } from "../../toaster/toast-custom";
import { useToastCustomDefaults } from "../../toaster/toast-customs/default-toasts-custom";
import { toastError } from "../../toaster/toast-error";
import { Button } from "../../ui/button";
import { CompaniesAddressForm } from "./forms/address-form";
import { ColorCompany } from "./forms/color-company";
import { CompaniesDelimitationLayout } from "./forms/delimitation/delimitation-layout";
import { CompaniesRegistrationForm } from "./forms/registration-form";

export default function useCompaniesLayoutSheet({ closeSheet }: SheetFormProps) {
	const methods = useFormContext<CompanyFormProps>();
	const companyId = methods.watch("id") ?? "";
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("company");
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const parentId = user?.parentCompanyId ?? "";
	const id = methods.watch("id") ?? "";
	const { Exclude } = useToastCustomDefaults();
	const { setModalAndOpen, resetModal } = useModal();
	const companiesFacade = useMemo(() => companiesFacadeFactory(token), [token]);
	const {
		formState: { isSubmitting, isSubmitSuccessful },
		handleSubmit,
	} = methods;
	const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<
		CompanyFormProps,
		CreateCompanyResponse
	>({
		closeSheet,
		form: methods,
		queryKey: "company",
	});
	const [currentForm, setCurrentForm] = useState<SheetMenuItem["form"]>({
		id: 1,
		FormComponent: CompaniesRegistrationForm,
	});

	async function excludeCompany(id: string) {
		await companiesFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="empresa" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	async function openModalExlcudeCompany() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a esta empresa, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button className="bg-red-600" variant="destructive" onClick={() => excludeCompany(id)}>
						Excluir
					</Button>
					<Button variant="secondary" onClick={() => resetModal()}>
						Cancelar
					</Button>
				</>
			),
		});
	}
	async function onSubmit(data: CompanyFormProps) {
		await executeCreateOrUpdate({
			data: { ...data, parentCompanyId: parentId },
			entity: "empresa",
			pronoun: "female",
			facadeFactorie: companiesFacade,
			catchFn: () => toastError({ tittle: "Erro de servidor" }),
			invalidSelects: true,
		});
	}
	const registrationData: SheetMenuItem = {
		form: {
			id: 1,
			FormComponent: CompaniesRegistrationForm,
		},
		label: "Dados cadastrais",
		Icon: Building,
		errorMapFields: [
			// "companyName",
			// "fantasyName",
			// "cnpj",
			// "responsibleName",
			// "responsibleSurname",
			// "responsibleEmail",
			// "responsibleCpf",
		],
	};
	const addressData: SheetMenuItem = {
		form: {
			id: 2,
			FormComponent: CompaniesAddressForm,
		},
		label: "Endereço",
		errorMapFields: [
			// "zipcode", "neighborhood", "street", "state"
		],
		Icon: MapPin,
	};
	const delimitationData: SheetMenuItem = {
		form: {
			id: 3,
			FormComponent: CompaniesDelimitationLayout,
		},
		label: "Delimitações",
		errorMapFields: [],
		Icon: MapPinned,
	};
	const colorCompanyData: SheetMenuItem = {
		form: {
			id: 4,
			FormComponent: ColorCompany,
		},
		label: "Cor da marca",
		errorMapFields: [],
		Icon: Palette,
	};

	const menuItems: SheetMenuItem[] = companyId
		? [registrationData, addressData, delimitationData, colorCompanyData]
		: [registrationData, addressData, colorCompanyData];

	return {
		methods,
		isSubmitting,
		handleSubmit,
		currentForm,
		setCurrentForm,
		onSubmit,
		menuItems,
		isSubmitSuccessful,
		id,
		openModalExlcudeCompany,
	};
}
