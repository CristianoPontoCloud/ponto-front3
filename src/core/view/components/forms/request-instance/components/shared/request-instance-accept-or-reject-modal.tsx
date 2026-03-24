import { requestInstanceFacadeFactory } from "@/application/factories/request-instace-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { RequestInstanceDetails } from "@/domain/entities/request-instance/request-instance";
import { RequestInstanceStatusEnum } from "@/domain/entities/request-instance/request-instance-status";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { Separator } from "@/view/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { RequestInstanceToast } from "../../toasts/request-management-toast";

export interface ModalAcceptOrRejectParams {
	status: "APPROVE" | "REJECT";
	fatherForm: UseFormReturn<RequestInstanceDetails>;
}
interface ModalForm {
	id: string;
	justification: string;
}
interface OnSuccessResetsParams {
	status: RequestInstanceStatusEnum;
	id: string;
}
export function FormAcceptAndReject({ status, fatherForm }: ModalAcceptOrRejectParams) {
	const { resetModal } = useModal();
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("request-instance");
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const requestInstanceFacade = useMemo(() => requestInstanceFacadeFactory(token), [token]);
	const statusCase = status === "APPROVE";
	const form = useForm<ModalForm>({
		values: {
			justification: "",
			id: "",
		},
		mode: "onSubmit",
		resolver: zodResolver(
			z.object({ justification: !statusCase ? z.string().min(10) : z.string() }),
		),
	});
	const label = statusCase ? "Observação" : "Justificativa";
	const placeholderCase = statusCase ? "observação" : "justificativa";
	const placeholder = `Digite uma ${placeholderCase}`;
	async function onSuccessResets({ status, id }: OnSuccessResetsParams) {
		invalidateQueryAndRefetch();
		const updatedRequestInstace = await requestInstanceFacade.findById(id);
		if (!updatedRequestInstace) {
			throw new Error("Request instance not found");
		}
		fatherForm.reset({ ...updatedRequestInstace });
		toastCustom({
			Component: <RequestInstanceToast data={updatedRequestInstace} status={status} />,
		});
		resetModal();
	}
	const { APPROVED, REJECTED } = RequestInstanceStatusEnum;
	async function approveSubmit({ justification, id }: ModalForm) {
		try {
			await requestInstanceFacade.approve({
				body: { justification },
				id,
			});
			await onSuccessResets({ status: APPROVED, id });
		} catch {
			toastError({ tittle: "Erro ao aprovar solicitação" });
		}
	}

	async function rejectSubmit({ justification, id }: ModalForm) {
		try {
			await requestInstanceFacade.reject({
				body: { justification },
				id,
			});
			await onSuccessResets({ status: REJECTED, id });
		} catch {
			toastError({ tittle: "Erro ao rejeitar solicitação" });
		}
	}

	async function onSubmit(data: ModalForm) {
		if (!statusCase) {
			await rejectSubmit({ ...data, id: fatherForm.watch("id") });
			return;
		}
		await approveSubmit({ ...data, id: fatherForm.watch("id") });
	}

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-6"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)();
				}}
			>
				<Separator orientation="horizontal" />
				<span>
					Essa ação é irreversível e não poderá ser desfeita. Tem certeza que deseja continuar?
				</span>
				<div className="flex felx-col w-full gap-1">
					<TextAreaForm
						form={form}
						formFieldName="justification"
						label={label}
						placeholder={placeholder}
						required={!statusCase}
					/>
				</div>
				<div className="flex gap-3 items-center justification-end">
					<Button type="button" className="w-fit" variant="outline">
						Cancelar
					</Button>
					<Button
						type="submit"
						className={`w-fit ${statusCase ? "bg-lime-500 hover:bg-lime-600" : ""}`}
						variant={statusCase ? "default" : "destructive"}
					>
						Rejeitar
					</Button>
				</div>
			</form>
		</Form>
	);
}
