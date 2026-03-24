import { occurrencesFacadeFactory } from "@/application/factories/registrations/occurrences-facade-factory";
import { requestsFacadeFactory } from "@/application/factories/registrations/requests-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import {
	type Notification,
	type NotificationGroupByMonth,
	NotificationReadStatusEnum,
	NotificationTypeEnum,
} from "@/domain/entities/notifications";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { toastController } from "../toaster/toast-controller";
import type { NotificationItemLayout } from "./notification-item-layout";
import { mockNotificationsResponse } from "./notifications-mock";

type NotificationsByMonthItemLayout = NotificationGroupByMonth<NotificationItemLayout>;

export function useNotifications() {
	const token = useSession().data?.user.token ?? ""
	const occurrencesFacade = useMemo(() => occurrencesFacadeFactory(token), [token])
	const requestsFacade = useMemo(() => requestsFacadeFactory(token), [token])
	const [tab, setTab] = useState<NotificationReadStatusEnum>(NotificationReadStatusEnum.NOT_READ);
	const tabIsNotRead = NotificationReadStatusEnum.NOT_READ === tab;
	const tabIsRead = NotificationReadStatusEnum.READ === tab;
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const height = useBottomOffset(buttonRef);
	const hasNotification: boolean = false;
	const notificationResponse = mockNotificationsResponse();
	const router = useRouter();
	async function goPage(page: "occurrences" | "requests", id: string) {
		router.push(`/registrations/${page}?status=ACTIVE&id=${id}`);
	}
	function onClickNotificationItem({ type }: Omit<Notification, "createdAt">) {
		const { FILE_ERROR, FILE_SUCCESS, MESSAGE, OCCURRENCE, REQUEST, WARNINGS } =
			NotificationTypeEnum;
		const notificationActionCases = {
			[OCCURRENCE]: async () => {
				const occurrences = await occurrencesFacade.findAll()
				const id = occurrences?.data?.[0].id ?? ""
				goPage("occurrences", id)
			},
			[REQUEST]: async () => {
				const requests = await requestsFacade.findAll()
				const id = requests?.data?.[0].id ?? ""
				goPage("requests", id)
			},
			[FILE_ERROR]: () => toastController.neutral({ tittle: "tratamento do arquivo com erro" }),
			[FILE_SUCCESS]: () => toastController.neutral({ tittle: "download do arquivo" }),
			[MESSAGE]: () => toastController.neutral({ tittle: "redirecinamento para a messagem" }),
			[WARNINGS]: () => toastController.neutral({ tittle: "redirecinamento para o aviso" }),
		};
		notificationActionCases[type]();
	}
	function timeAgo(date: Date): string {
		const now = new Date();

		const diffYears = now.getFullYear() - date.getFullYear();
		if (diffYears > 0) {
			return diffYears === 1 ? "Há 1 ano" : `Há ${diffYears} anos`;
		}

		const diffMonths = now.getMonth() - date.getMonth() + diffYears * 12;
		if (diffMonths > 0) {
			return diffMonths === 1 ? "Há 1 mês" : `Há ${diffMonths} meses`;
		}

		const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
		if (diffDays > 0) {
			return diffDays === 1 ? "Há 1 dia" : `Há ${diffDays} dias`;
		}

		const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
		if (diffHours > 0) {
			return diffHours === 1 ? "Há 1 hora" : `Há ${diffHours} horas`;
		}

		return "Agora a pouco";
	}
	function formatMonthLabel(monthStr: string): string {
		const [mm, yyyy] = monthStr.split("-").map(Number);

		const inputDate = new Date(yyyy, mm - 1, 1);
		const now = new Date();

		const currentMonth = now.getMonth() + 1;
		const currentYear = now.getFullYear();

		if (mm === currentMonth && yyyy === currentYear) {
			return "Este mês";
		}

		const monthNames = [
			"Janeiro",
			"Fevereiro",
			"Março",
			"Abril",
			"Maio",
			"Junho",
			"Julho",
			"Agosto",
			"Setembro",
			"Outubro",
			"Novembro",
			"Dezembro",
		];

		return `${monthNames[inputDate.getMonth()]} de ${yyyy}`;
	}

	function notificationTitleTypeCases(params: Notification): NotificationItemLayout {
		const { type, createdAt } = params;
		const { FILE_ERROR, FILE_SUCCESS, MESSAGE, OCCURRENCE, REQUEST, WARNINGS } =
			NotificationTypeEnum;
		const defaultFields = { ...params, createdAt: timeAgo(createdAt) };
		const cases = {
			[FILE_ERROR]: {
				title: "Falha ao gerar arquivo",
			},
			[FILE_SUCCESS]: {
				title: "Falha ao gerar arquivo",
			},
			[MESSAGE]: {
				title: "Nova mensagem",
			},
			[OCCURRENCE]: {
				title: "Nova ocorrência",
			},
			[REQUEST]: {
				title: "Nova solicitação",
			},
			[WARNINGS]: {
				title: "Por favor atualize sua senha",
			},
		};
		return { ...cases[type], ...defaultFields };
	}

	const notReadNotifications: NotificationsByMonthItemLayout[] =
		notificationResponse.notReadNotifications.map(({ month, notifications }) => {
			return {
				notifications: notifications.map((params) => {
					return notificationTitleTypeCases(params);
				}),
				month: formatMonthLabel(month),
			};
		});
	const readNotifications: NotificationsByMonthItemLayout[] =
		notificationResponse.readNotifications.map(({ month, notifications }) => {
			return {
				notifications: notifications.map((params) => {
					return notificationTitleTypeCases(params);
				}),
				month: formatMonthLabel(month),
			};
		});
	return {
		tab,
		setTab,
		tabIsNotRead,
		tabIsRead,
		buttonRef,
		height,
		hasNotification,
		notificationResponse,
		notReadNotifications,
		readNotifications,
		onClickNotificationItem,
	};
}
