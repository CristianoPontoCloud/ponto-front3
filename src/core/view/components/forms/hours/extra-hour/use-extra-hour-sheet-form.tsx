import { extraHoursFacadeFactory } from "@/application/factories/hours/extra-hours-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { ExtraHourFormProps } from "@/domain/entities/extra-hour/extra-hour";

import { executeWithErrorMap } from "@/application/usecases/execute-with-error-map";
import { ExtraHourAccumulatedEnum } from "@/domain/entities/extra-hour/enums/extra-hour-accumulated-enum";
import { ExtraHourDayEnum } from "@/domain/entities/extra-hour/enums/extra-hour-days-enum";
import { ExtraHourHolidayEnum } from "@/domain/entities/extra-hour/enums/extra-hour-holidays-enum";
import { ExtraHourNightlyEnum } from "@/domain/entities/extra-hour/enums/extra-hour-nightly-enum";
import type { ExtraHourRules } from "@/domain/entities/extra-hour/extra-hour-rules";
import type { EditDto } from "@/domain/http/http-client";
import { getAccumulatedMaxHourUseCase } from "@/domain/usecases/accumulated-use-case";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { extraHourRulesGridController } from "./rules-grid/extra-hour-grid-controller";

const initialValuesRules: ExtraHourRules = {
	id: "",
	accumulated: ExtraHourAccumulatedEnum.DAILY,
	ruleIndex: 0,
	day: ExtraHourDayEnum.EVERY_DAY,
	holiday: ExtraHourHolidayEnum.EVERY_DAY,
	nightly: ExtraHourNightlyEnum.BOTH,
	specificDays: [],
	bands: [
		{
			id: "",
			isHourBank: false,
			fromTime: "00:00",
			toTime: getAccumulatedMaxHourUseCase(ExtraHourAccumulatedEnum.DAILY).label,
			eventCode: "",
			percentageMultiplier: "50%",
		},
	],
};

export default function useExtraHourSheetForm({ closeSheet }: SheetFormProps) {
	const methods = useFormContext<ExtraHourFormProps>();
	const {
		formState: { isSubmitting, isSubmitSuccessful },
		handleSubmit,
	} = methods;
	const [isEditRule, setIsEditRule] = useState<boolean>(false);
	const [brackIndex, setBracketIndex] = useState<number>(-1);
	const [rulesFormValues, setRulesFormValues] = useState<ExtraHourRules>(initialValuesRules);
	const [openOverSheet, setOpeOverSheet] = useState<boolean>(false);
	// const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<
	// 	ExtraHourFormProps,
	// 	ExtraHourDetails
	// >({
	// 	closeSheet,
	// 	form: methods,
	// 	queryKey: "extra-hour",
	// });
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const companyId = user?.companyId ?? "";
	const extraHourFacade = useMemo(() => extraHoursFacadeFactory(token), [token]);
	// const rulesFacade = useMemo(() => extraHoursRulesFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch, invalidateSelects } =
		useInvalidateQueryAndRefetch("extra-hour");
	const id = methods.watch("id");
	const { Exclude } = useToastCustomDefaults();
	const { Edit, Save } = useToastCustomDefaults();

	const { setModalAndOpen, resetModal } = useModal();
	async function excludeExtraHour(id: string) {
		await extraHourFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="hora extra" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function openModalExlcudeExtraHour() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a esta hora extra, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button
						className="bg-red-600"
						variant="destructive"
						onClick={() => excludeExtraHour(id ?? "")}
					>
						Excluir
					</Button>
					<Button variant="secondary" onClick={() => resetModal()}>
						Cancelar
					</Button>
				</>
			),
		});
	}
	function getErrorMap(id?: string) {
		const action = !id ? "criar" : "editar";
		return {
			EXTRA_HOUR_ERROR: () => {
				toastError({ tittle: `Erro ao ${action} regra de hora extra` });
				return true;
			},
			RULES_ERROR: () => {
				toastError({ tittle: `Erro ao ${action} regra de regra` });
				return true;
			},
		};
	}
	function onSuccessAfterPost() {
		invalidateQueryAndRefetch();
		closeSheet();
		methods.reset();
		invalidateSelects();
	}
	async function createExtraTime(data: ExtraHourFormProps) {
		await executeWithErrorMap({
			errorMap: getErrorMap(data.id),
			fn: async () => {
				const extraHour = await extraHourFacade.create(data);
				if (!extraHour) throw new Error("EXTRA_HOUR_ERROR");
				// const rules = await extraHoursRulesFacadeFactory(token).create(data.rules[0]);
				// if (!rules) throw new Error("RULES_ERROR");
				onSuccessAfterPost();
				toastCustom({
					Component: <Save entity={"hora extra"} />,
					action: {
						label: "Desfazer",
						onClick: () => { },
					},
				});
			},
		});
	}
	async function updateExtraTime(data: ExtraHourFormProps) {
		await executeWithErrorMap({
			errorMap: getErrorMap(data.id),
			fn: async () => {
				const extraHour = await extraHourFacade.update(data as EditDto<ExtraHourFormProps>);
				if (!extraHour) throw new Error("EXTRA_HOUR_ERROR");
				// const rules = await extraHoursRulesFacadeFactory(token).update(
				// 	data.rules[0] as EditDto<ExtraHourRules>,
				// );
				// if (!rules) throw new Error("RULES_ERROR");
				onSuccessAfterPost();
				toastCustom({
					Component: <Edit entity={"hora extra"} />,
					action: {
						label: "Desfazer",
						onClick: () => { },
					},
				});
			},
		});
	}

	async function onSubmit(data: ExtraHourFormProps) {
		const dataWithCompnayId = { ...data, companyId };
		const submitCases = {
			create: () => createExtraTime(dataWithCompnayId),
			update: () => updateExtraTime(dataWithCompnayId),
		};
		const submitKey = id ? "update" : "create";
		await submitCases[submitKey]();
		// await executeCreateOrUpdate({
		// 	data,
		// 	entity: "hora extra",
		// 	pronoun: "female",
		// 	facadeFactorie: extraHourFacade,
		// 	catchFn: () => toastError({ tittle: "Erro de servidor" }),
		// });
	}

	const bracketsGridController = useMemo(
		() =>
			new extraHourRulesGridController(
				methods,
				openOverSheet,
				setOpeOverSheet,
				isEditRule,
				setIsEditRule,
				rulesFormValues,
				setRulesFormValues,
				brackIndex,
				setBracketIndex,
			),
		[methods, isEditRule, openOverSheet, rulesFormValues, brackIndex],
	);

	useEffect(() => {
		if (!isEditRule) {
			setRulesFormValues(initialValuesRules);
		}
	}, [openOverSheet, isEditRule]);

	return {
		methods,
		isSubmitting,
		handleSubmit,
		onSubmit,
		isSubmitSuccessful,
		isEditRule,
		setIsEditRule,
		openOverSheet,
		setOpeOverSheet,
		rulesFormValues,
		setRulesFormValues,
		bracketsGridController,
		id,
		openModalExlcudeExtraHour,
	};
}
