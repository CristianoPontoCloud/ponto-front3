import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { RequestInstanceDetails } from "@/domain/entities/request-instance/request-instance";
import { RequestInstanceStatusEnum } from "@/domain/entities/request-instance/request-instance-status";
import { Button } from "@/view/components/ui/button";
import { SheetFooter } from "@/view/components/ui/sheet";
import { useFormContext } from "react-hook-form";
import {
	FormAcceptAndReject,
	type ModalAcceptOrRejectParams,
} from "./request-instance-accept-or-reject-modal";

export function RequestInstanceAceptedOrRejectButtons({ closeSheet }: SheetFormProps) {
	const form = useFormContext<RequestInstanceDetails>();
	const status = form.watch("status");
	const { setModalAndOpen } = useModal();

	if (status !== RequestInstanceStatusEnum.PENDING)
		return (
			<SheetFooter className="flex w-full absolute bg-background sm:justify-between md:justify-end p-1 items-center pb-6 bottom-[34px] gap-2">
				<Button
					className="w-fit"
					type="button"
					variant="outline"
					onClick={() => closeSheet()}
					id="submit"
				>
					fechar
				</Button>
			</SheetFooter>
		);
	// const values: RequestManagementFormProps = form.watch();
	function makeModalAcceptOrReject(status: ModalAcceptOrRejectParams["status"]) {
		const statusCase = status === "APPROVE";
		const titleCase = statusCase ? "Aceitar" : "Rejeitar";
		const title = `${titleCase} solicitação`;
		setModalAndOpen({
			title,
			content: (
				<FormAcceptAndReject
					status={status}
					fatherForm={form}
					// zodSchema={statusCase ? requestInstanceSchema : requestInstanceOnRejectSchema}
				/>
			),
			classNames: {
				title: statusCase ? "text-lime-600" : "text-red-500",
				content: "w-[380px]",
			},
		});
	}

	function openModalReject() {
		makeModalAcceptOrReject("REJECT");
	}
	function openModalAccept() {
		makeModalAcceptOrReject("APPROVE");
	}

	return (
		<SheetFooter className="flex w-full absolute bg-background sm:justify-between md:justify-end p-1 items-center pb-6 bottom-[34px] gap-2">
			<Button
				className="w-fit text-red-600 "
				type="button"
				variant="outline"
				onClick={() => openModalReject()}
				id="submit"
			>
				Rejeitar
			</Button>
			<Button
				className="w-fit text-lime-600 "
				type="button"
				variant="outline"
				onClick={() => openModalAccept()}
				id="submit"
			>
				Aceitar
			</Button>
		</SheetFooter>
	);
}
