import { requestsFacadeFactory } from "@/application/factories/registrations/requests-facade-factory";
import { requestInstanceFacadeFactory } from "@/application/factories/request-instace-facade-factory";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { type Request, RequestTypeEnum } from "@/domain/entities/request";
import type { RequestInstance } from "@/domain/entities/request-instance/request-instance";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";
import DateForm from "@/view/components/formfields/date-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { TimePickerForm } from "@/view/components/formfields/time-picker-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { type ReactNode, useMemo } from "react";
import { type UseFormReturn, useFormContext } from "react-hook-form";
import { RequestInstanceToast } from "../../toasts/request-management-toast";
import { RequestInstanceBodyLayoutSheetForm } from "./request-instance-body-layout-sheet-form";

function getSelectedRequestById({
	id,
	requests,
}: { requests: Request[]; id: string }): Request | undefined {
	return requests.find((request) => id === request.id);
}
const { ALL_DAY, HOUR_ADJUSTMENT, SPECIFIC_PERIOD } = RequestTypeEnum;
function RequestTypeConditionalFields({
	form,
	type,
}: {
	form: UseFormReturn<RequestInstance>;
	type?: RequestTypeEnum;
}) {
	const requestTypeConditionalFields: Record<RequestTypeEnum, ReactNode> = {
		[ALL_DAY]: (
			<div className="flex w-full gap-4">
				<DateForm
					form={form}
					formFieldName="startDate"
					placeholder="Selecione"
					label="Data ínicio"
					required
				/>
				<DateForm
					form={form}
					formFieldName="endDate"
					placeholder="Selecione"
					label="Data fim"
					required
				/>
			</div>
		),
		[HOUR_ADJUSTMENT]: (
			<div className="flex w-full gap-4">
				<DateForm
					form={form}
					formFieldName="startDate"
					placeholder="Selecione"
					label="Data"
					required
				/>
				<TimePickerForm
					form={form}
					formFieldName="startTime"
					placeholder="Selecione"
					label="Hora"
					required
				/>
			</div>
		),
		[SPECIFIC_PERIOD]: (
			<div className="flex w-full gap-4">
				<div className="flex flex-col w-1/2 gap-4">
					<DateForm
						form={form}
						formFieldName="startDate"
						placeholder="Selecione"
						label="Data ínicio"
						required
					/>
					<DateForm
						form={form}
						formFieldName="endDate"
						placeholder="Selecione"
						label="Data fim"
						required
					/>
				</div>
				<div className="flex flex-col w-1/2 gap-4">
					<TimePickerForm
						form={form}
						formFieldName="startTime"
						placeholder="Selecione"
						label="Hora ínicio"
						required
					/>
					<TimePickerForm
						form={form}
						formFieldName="endTime"
						placeholder="Selecione"
						label="Hora fim"
						required
					/>
				</div>
			</div>
		),
	};
	if (!type) return;
	return requestTypeConditionalFields[type];
}

export function RequestInstanceCreateCaseSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<RequestInstance>();
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const companyId = user?.companyId ?? "";
	const collaboratorId = user?.collaboratorId ?? "";
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("request-instance");
	const requestInstanceFacade = useMemo(() => requestInstanceFacadeFactory(token), [token]);
	const requestFacade = useMemo(() => requestsFacadeFactory(token), [token]);
	const { requestId } = form.watch();
	const { data } = useQuery({
		queryKey: ["request"],
		queryFn: async () => {
			const { data } = await requestFacade.filtered({
				companyId,
				status: StatusDefaultEnum.active,
			});
			return data;
		},
		retry: false,
		enabled: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		staleTime: Number.POSITIVE_INFINITY,
	});
	const requestSelected: Request | undefined = getSelectedRequestById({
		requests: data ?? [],
		id: requestId,
	});
	async function onSubmit(data: RequestInstance) {
		if (!requestSelected) return;
		let hasError = false;
		console.log(typeof data.startDate);
		console.log(typeof data.endDate);
		const conditionalValidation = {
			[ALL_DAY]: () => {
				if (typeof data.startDate !== "object") {
					hasError = true;
					form.setError("startDate", { message: "startDate é obrigatório", type: "required" });
					form.setValue("startDate", data.startDate, {
						shouldTouch: true,
					});
				}
				if (typeof data.endDate !== "object") {
					hasError = true;
					form.setError("endDate", { message: "endDate é obrigatório", type: "required" });
					form.setValue("endDate", data.endDate, {
						shouldTouch: true,
					});
				}
			},
			[HOUR_ADJUSTMENT]: () => {
				if (typeof data.startDate !== "object") {
					hasError = true;
					form.setError("startDate", { message: "startDate é obrigatório", type: "required" });
					form.setValue("startDate", data.startDate, {
						shouldTouch: true,
					});
				}
				if (data.startTime.length < 5) {
					hasError = true;
					form.setError("startTime", { message: "startTime é obrigatório", type: "required" });
					form.setValue("startTime", data.startTime, {
						shouldTouch: true,
					});
				}
			},
			[SPECIFIC_PERIOD]: () => {
				if (typeof data.startDate !== "object") {
					hasError = true;
					form.setError("startDate", { message: "startDate é obrigatório", type: "required" });
					form.setValue("startDate", data.startDate, {
						shouldTouch: true,
					});
				}
				if (typeof data.endDate !== "object") {
					hasError = true;
					form.setError("endDate", { message: "endDate é obrigatório", type: "required" });
					form.setValue("endDate", data.endDate, {
						shouldTouch: true,
					});
				}
				if (data.startTime.length < 5) {
					hasError = true;
					form.setError("startTime", { message: "startTime é obrigatório", type: "required" });
					form.setValue("startTime", data.startTime, {
						shouldTouch: true,
					});
				}
				if (data.endTime.length < 5) {
					hasError = true;
					form.setError("endTime", { message: "endTime é obrigatório", type: "required" });
					form.setValue("endTime", data.endTime, {
						shouldTouch: true,
					});
				}
			},
		};
		conditionalValidation[requestSelected?.type]();
		if (hasError) return;
		try {
			await requestInstanceFacade.create({ ...data, companyId, collaboratorId });
			toastCustom({
				Component: <RequestInstanceToast data={data} status="CREATED" />,
			});
			invalidateQueryAndRefetch();
			closeSheet();
		} catch {
			toastError({ tittle: "Erro ao criar solicitação" });
			return;
		}
	}

	console.log(form.formState.errors);

	return (
		<RequestInstanceBodyLayoutSheetForm onSubmit={onSubmit}>
			<>
				<SelectForm
					form={form}
					formFieldName="requestId"
					// endpoint="request/findAllFiltered?status=ACTIVE"
					datas={data?.map(({ name, id }) => ({ value: id, label: name })) ?? []}
					placeholder="Selecione"
					label="Solicitação"
					required
				/>
				<RequestTypeConditionalFields form={form} type={requestSelected?.type} />
				<div className="flex flex-col w-full gap-1">
					<TextAreaForm
						form={form}
						formFieldName="justification"
						placeholder="Digite uma justificativa"
						label="Justificativa"
						maxLength={200}
						required
					/>
					<div className="flex justify-between text-muted-foreground">
						<span>Min: 10 caracteres</span>
						<span>Máx: 200 caracteres</span>
					</div>
				</div>
				<SheetFooterSubmit labelSubmit="Solicitar" onCancel={closeSheet} />
			</>
		</RequestInstanceBodyLayoutSheetForm>
	);
}
