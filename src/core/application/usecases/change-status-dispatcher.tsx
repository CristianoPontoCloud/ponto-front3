import { StatusDefaultEnum, getStatus } from "@/domain/usecases/status-default";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { StatusChangedToastsCustom } from "@/view/components/toaster/toast-customs/default-toasts-custom";

export interface ChangeStatusDispatcherFacadeFactory<Response> {
	update(body: {
		id: string;
		status: StatusDefaultEnum;
		companyId?: string;
	}): Promise<Response | null>;
}

interface ChangeStatusParams<Response> {
	id: string;
	entity: string;
	pronoun?: "female" | "male";
	status: StatusDefaultEnum;
	companyId?: string;
	facadeFactorie: ChangeStatusDispatcherFacadeFactory<Response>;
	customParams?: Record<string, string>,
	catchFn?: (err: unknown) => void;
	finallyFn?: VoidFunction;
}

export async function changeStatusDispatcher<Response>({
	id,
	entity,
	status,
	pronoun = "male",
	facadeFactorie,
	catchFn,
	finallyFn,
	companyId,
	customParams = {}
	// statusEnum,
}: ChangeStatusParams<Response>): Promise<Response | null> {
	try {
		const { active, inactive } = StatusDefaultEnum;
		const newStatus = status === active ? inactive : active;
		return await facadeFactorie.update({ status: newStatus, id, companyId, ...customParams });
	} catch (err) {
		catchFn?.(err);
		throw err;
	} finally {
		finallyFn?.();
		toastCustom({
			Component: (
				<StatusChangedToastsCustom
					entity={entity}
					currentStatus={getStatus(status as StatusDefaultEnum).value}
					statusActive={StatusDefaultEnum.active}
					pronoun={pronoun}
				/>
			),
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
}
