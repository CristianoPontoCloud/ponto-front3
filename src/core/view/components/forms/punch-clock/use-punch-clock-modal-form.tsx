import { punchClockFacadeFactory } from "@/application/factories/punch-clock-facade-factory";
import type { PunchFormProps, PunchType } from "@/domain/entities/punch";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toastError } from "../../toaster/toast-error";

export function usePunchClockModalForm() {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const [type, setType] = useState<PunchType>("simple");
	const [pin, setPin] = useState<string>("");
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const collaboratorId = user?.collaboratorId ?? "";
	const companyId = user?.companyId ?? "";
	const punchClockFacade = useMemo(() => punchClockFacadeFactory(token), [token]);
	const form = useForm<PunchFormProps>({
		values: {
			collaboratorId,
			companyId,
			origin: "02",
			type: "01",
			date: "",
			time: "",
			timestamp: "",
			companyTimeZone: timezone,
			collectorId: "web",
		},
		mode: "onSubmit",
	});

	function onTabChange(type: PunchType) {
		setType(type);
	}
	function onPinValueChange(code: string) {
		const parsedCode = code.replace(/[^0-9]/g, "");
		setPin(parsedCode);
	}
	async function onSubmit() {
		const now = new Date();
		const time = format(now, "HH:mm:ss");
		const timestamp = format(now, "yyyy-MM-dd'T'HH:mm:ssXXX");
		form.setValue("date", format(now, "yyyy-MM-dd"));
		form.setValue("time", time);
		form.setValue("timestamp", timestamp);
		const body = form.watch();
		try {
			const response = await punchClockFacade.punch(body);
			if (response?.success === false) {
				throw new Error("invalid request");
			}
		} catch (error) {
			toastError({
				tittle: "erro de servidor",
			});
			form.reset(body);
			throw error;
		}
	}
	const loadingButtonDisabler = type === "PIN" && pin.length !== 6;
	return {
		onTabChange,
		type,
		pin,
		form,
		onSubmit,
		loadingButtonDisabler,
		setPin,
		onPinValueChange,
	};
}
