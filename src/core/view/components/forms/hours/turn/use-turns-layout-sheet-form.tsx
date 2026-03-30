import { turnPolicyFacadeFactory } from "@/application/factories/hours/turn-policy-facade-factory";
import { turnsFacadeFactory } from "@/application/factories/hours/turns-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { SheetMenuItem } from "@/domain/components/sheet/sheet-menu-lateral";
import type { Turn, TurnFormProps } from "@/domain/entities/turns/turns";
import type { EditDto } from "@/domain/http/http-client";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { AlarmClockCheck, CalendarCheck, Clock3, Moon, Settings2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DsrForm } from "./forms/dsr-form";
import { HourParametersForm } from "./forms/hour-parameters-form";
import { NightTurnForm } from "./forms/night-turn-form";
import { ToleranceForm } from "./forms/tolerance-form";
import { TurnForm } from "./forms/turn-form";

export default function useTurnsLayoutSheet({ closeSheet }: SheetFormProps) {
	const methods = useFormContext<TurnFormProps>();
	const {
		formState: { isSubmitting, isSubmitSuccessful },
		handleSubmit,
	} = methods;

	const [currentForm, setCurrentForm] = useState<SheetMenuItem["form"]>({
		id: 1,
		FormComponent: TurnForm,
	});
	const period = Number(methods.watch("periods"));
	const periodToConsiderFreeLunch = Number(methods.watch("periodToConsiderFreeLunch"));
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const companyId = user?.companyId ?? "";
	const id = methods.watch("id") ?? "";
	const { invalidateQueryAndRefetch, invalidateSelects } =
		useInvalidateQueryAndRefetch("work-shift");
	const { Edit, Save } = useToastCustomDefaults();
	const { Exclude } = useToastCustomDefaults();
	const { setModalAndOpen, resetModal } = useModal();

	const facade = useMemo(() => ({
		turn: turnsFacadeFactory(token),
		turnPolicy: (turnId: string) => turnPolicyFacadeFactory({
			token,
			turnId,
		})
	}), [token]);

	async function excludeTurn(id: string) {
		await facade.turn.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="turno" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	async function openModalExcludeTurn() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este turno, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button className="bg-red-600" variant="destructive" onClick={() => excludeTurn(id)}>
						Excluir
					</Button>
					<Button variant="secondary" onClick={() => resetModal()}>
						Cancelar
					</Button>
				</>
			),
		});
	}

	function onSuccessAfterPost() {
		invalidateQueryAndRefetch();
		closeSheet();
		methods.reset();
		invalidateSelects();
	}

	function errorCase(id: string | undefined, error: string) {
		const action = !id ? "criar" : "editar";
		if (error === "TURN_ERROR" || error === "POLICY_ERROR") {
			return toastError({ tittle: `Erro ao ${action} turno` });
		}
		if (error === "POLICY_ERROR") {
			return toastError({ tittle: `Erro ao ${action} política de turno` });
		}
		toastError({ tittle: "Erro de servidor" });
	}
	async function createTurn(data: TurnFormProps) {
		try {
			const turn = await facade.turn.create({
				...data,
				companyId,
			})
			if (!turn) throw new Error("TURN_ERROR");
			const policy = await facade.turnPolicy(turn.id)
				.create({ body: { ...data } });
			if (!policy) throw new Error("POLICY_ERROR");
			onSuccessAfterPost();
			toastCustom({
				Component: <Save entity={"turno"} />,
				action: {
					label: "Desfazer",
					onClick: () => { },
				},
			});
		} catch (error) {
			errorCase(data.id, error as unknown as string)
		}
	}
	async function updateTurn(data: TurnFormProps) {
		try {
			const turn = await facade.turn.update({
				...data,
				companyId,
			} as EditDto<Turn>)
				.catch(() => {
					throw new Error("TURN_ERROR");
				});
			if (!turn) return;
			await facade.turnPolicy(turn.id)
				.update({ body: { ...data, id: data.policyId } })
				.catch(() => {
					throw new Error("POLICY_ERROR");
				});
			onSuccessAfterPost();
			toastCustom({
				Component: <Edit entity={"turno"} />,
				action: {
					label: "Desfazer",
					onClick: () => { },
				},
			});
		} catch (error) {
			errorCase(data.id, error as unknown as string)
		}
	}
	async function onSubmit() {
		const newDays = [...methods.getValues("days")];
		for (const day of newDays) {
			day.startTime = day.periods[0].startTime;
			day.endTime = day.periods[day.periods.length - 1].endTime;
		}
		methods.setValue("days", newDays);
		const data = methods.getValues();
		const submitCases = {
			create: () => createTurn(data),
			update: () => updateTurn(data),
		};
		const submitKey = id ? "update" : "create";
		await submitCases[submitKey]();
	}

	const turnForm: SheetMenuItem = {
		form: {
			id: 1,
			FormComponent: TurnForm,
		},
		label: "Turno",
		Icon: Clock3,
		// errorMapFields: ["name", "period", "type", "turnDays"],
		errorMapFields: [],
	};
	const SysConfigParametersForm: SheetMenuItem = {
		form: {
			id: 2,
			FormComponent: HourParametersForm,
		},
		label: "Parâmetros",
		errorMapFields: [],
		Icon: Settings2,
	};
	const toleranceForm: SheetMenuItem = {
		form: {
			id: 3,
			FormComponent: ToleranceForm,
		},
		label: "Tolerância",
		errorMapFields: [],
		Icon: AlarmClockCheck,
	};
	const dsrForm: SheetMenuItem = {
		form: {
			id: 4,
			FormComponent: DsrForm,
		},
		label: "DSR",
		errorMapFields: [],
		Icon: CalendarCheck,
	};
	const nightTurnForm: SheetMenuItem = {
		form: {
			id: 5,
			FormComponent: NightTurnForm,
		},
		label: "Noturno",
		errorMapFields: [],
		Icon: Moon,
	};

	const menuItems: SheetMenuItem[] = [
		turnForm,
		SysConfigParametersForm,
		toleranceForm,
		dsrForm,
		nightTurnForm,
	];

	useEffect(() => {
		if (period === 1 && periodToConsiderFreeLunch > 1) {
			methods.setValue("periodToConsiderFreeLunch", "1");
			return;
		}
		if ((period > 1 && periodToConsiderFreeLunch === 1) || periodToConsiderFreeLunch > period) {
			methods.setValue("periodToConsiderFreeLunch", "2");
			return;
		}
	}, [period, methods, periodToConsiderFreeLunch]);

	return {
		methods,
		isSubmitting,
		handleSubmit,
		currentForm,
		setCurrentForm,
		onSubmit,
		menuItems,
		isSubmitSuccessful,
		openModalExcludeTurn,
		id,
	};
}
