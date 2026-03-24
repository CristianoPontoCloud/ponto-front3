import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { useCreateOrUpdateDispatcher } from "@/application/usecases/save-or-update-dispatcher";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { SheetMenuItem } from "@/domain/components/sheet/sheet-menu-lateral";
import type {
  CollaboratorDetails,
  CollaboratorFormProps,
} from "@/domain/entities/collaborator/collaborator";
import { Clock, FileText, Recycle, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toastError } from "../../toaster/toast-error";
import AccessesDataForm from "./sub-forms/accesses/accesses-data-form";
import AdditionalDataForm from "./sub-forms/additional-data";
import PersonalDataForm from "./sub-forms/personal-data";
import WorkDayForm from "./sub-forms/workday/workday-form";

export default function useCollaboratorLayoutSheet({ closeSheet }: SheetFormProps) {
	const methods = useFormContext<CollaboratorFormProps>();
	const {
		formState: { isSubmitting, isSubmitSuccessful },
		handleSubmit,
	} = methods;

	const [currentForm, setCurrentForm] = useState<SheetMenuItem["form"]>({
		id: 1,
		FormComponent: PersonalDataForm,
	});

	const token = useSession().data?.user.token ?? "";
	// const { Edit, Save } = useToastCustomDefaults();
	// const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("collaborator");
	const collaboratorsFacade = useMemo(() => collaboratorsFacadeFactory(token), [token]);
	const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<
		CollaboratorFormProps,
		CollaboratorDetails
	>({
		closeSheet,
		form: methods,
		queryKey: "collaborator",
	});

	async function onSubmit(data: CollaboratorFormProps) {
		await executeCreateOrUpdate({
			data,
			entity: "colaborador",
			facadeFactorie: collaboratorsFacade,
			catchFn: () => toastError({ tittle: "Erro de servidor" }),
		});
	}

	const personalData: SheetMenuItem = {
		form: {
			id: 1,
			FormComponent: PersonalDataForm,
		},
		label: "Dados Pessoais",
		Icon: User,
		errorMapFields: [],
	};
	const additionalData: SheetMenuItem = {
		form: {
			id: 2,
			FormComponent: AdditionalDataForm,
		},
		label: "Dados adicionais",
		errorMapFields: [],
		Icon: FileText,
	};
	const workJourney: SheetMenuItem = {
		form: {
			id: 3,
			FormComponent: WorkDayForm,
		},
		label: "Jornada de trabalho",
		errorMapFields: [],
		Icon: Clock,
	};
	const accesses: SheetMenuItem = {
		form: {
			id: 4,
			FormComponent: AccessesDataForm,
		},
		label: "Acessos",
		errorMapFields: [],
		Icon: Recycle,
	};

	const menuItems: SheetMenuItem[] = [personalData, additionalData, workJourney, accesses];

	return {
		methods,
		isSubmitting,
		handleSubmit,
		currentForm,
		setCurrentForm,
		onSubmit,
		menuItems,
		isSubmitSuccessful,
	};
}
