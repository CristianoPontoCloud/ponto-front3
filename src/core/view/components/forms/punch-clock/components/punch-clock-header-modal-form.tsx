import type { PunchFormProps } from "@/domain/entities/punch";
import { AlarmClockCheck, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import type { UseFormReturn } from "react-hook-form";

interface PunchClockHeaderModalFormParams {
	form: UseFormReturn<PunchFormProps>;
}

export function PunchClockHeaderModalForm({ form }: PunchClockHeaderModalFormParams) {
	const user = useSession().data?.user;

	if (form.formState.isSubmitSuccessful) {
		return (
			<div className="flex flex-col gap-3 items-center w-full" id="after-submit">
				<div className="w-[78px] h-[78px] rounded-full flex justify-center items-center bg-muted-foreground/10">
					<div className="w-[64px] h-[64px] rounded-full flex justify-center items-center bg-muted-foreground/15">
						<AlarmClockCheck className="text-muted-foreground w-[32px] h-[32px]" id="clock-icon" />
					</div>
				</div>
				<p className="text-xl font-semibold w-[200px] text-center" id="success-message">
					Ponto registrado com sucesso!
				</p>
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-3 items-center w-full" id="before-submit">
			<div className="w-[64px] h-[64px] flex justify-center items-center rounded-xl bg-sidebar-accent">
				<UserRound className="text-muted-foreground" id="user-round-icon" />
			</div>
			<p
				className="text-xl font-semibold"
				id="user-full-name"
			>{`${user?.firstName} ${user?.lastName}`}</p>
			<p
				className="text-muted-foreground"
				id="user-position"
			>{`${user?.positionName ?? "Cargo do collaborador"}`}</p>
		</div>
	);
}
