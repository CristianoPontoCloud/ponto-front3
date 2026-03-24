import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import type { Option } from "@/domain/components/options";
import type {
	RequestInstance,
	RequestInstanceDetails,
} from "@/domain/entities/request-instance/request-instance";
import { Options } from "@/view/components/options/options";
import type { Dispatch, SetStateAction } from "react";

interface RequestInstanceOptionParams {
	setFormValues: Dispatch<SetStateAction<RequestInstance | RequestInstanceDetails>>;
	requestInstance: RequestInstanceDetails;
}

export function RequestInstancePageOption({
	setFormValues,
	requestInstance,
}: RequestInstanceOptionParams) {
	const { setOpen } = useSheet();
	async function editRequestInstance(requestInstance: RequestInstanceDetails) {
		const { startDate, endDate } = requestInstance;
		setFormValues({
			...requestInstance,
			requestId: requestInstance.request.id,
			endDate: endDate ? new Date(endDate) : null,
			startDate: startDate ? new Date(startDate) : null,
		});
		setOpen(true);
	}
	const optionsConfig = (requestInstance: RequestInstanceDetails): Option[] => {
		return [
			{
				label: "Detalhes",
				onClick: () => editRequestInstance(requestInstance),
			},
		];
	};
	return <Options options={optionsConfig(requestInstance)} label="Ações" />;
}
