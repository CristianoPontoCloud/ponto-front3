import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { RequestInstance } from "@/domain/entities/request-instance/request-instance";
import { RequestInstanceTypeEnum } from "@/domain/entities/request-instance/request-instance-type";
import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { RequestInstanceCreateCaseSheetForm } from "./components/body-cases/request-instance-create-case-sheet-form";
import { RequestInstanceFakeGpsCaseSheetForm } from "./components/body-cases/request-instance-fake-gps-case-sheet-form";
import { RequestInstanceGeoDelimitationCaseSheetForm } from "./components/body-cases/request-instance-geo-delimitation-case-sheet-form";
import { RequestInstanceNoRecognizePhotoCaseSheetForm } from "./components/body-cases/request-instance-no-recognize-photo-case-sheet-form";
import { RequestInstanceOfflineMarkCaseSheetForm } from "./components/body-cases/request-instance-offline-mark-case-sheet-form";
import { RequestInstanceSheetFormCase } from "./components/body-cases/request-instance-sheet-form-case";

export function RequestInstanceSheetForm(params: SheetFormProps) {
	const form = useFormContext<RequestInstance>();

	const {
		FAKE_GPS,
		GEO_DELIMITATION,
		NO_RECOGNIZE_PHOTO,
		OFFLINE_MARK,
		REQUEST,
		ESPECIFIC_DAY,
		FULL_DAY,
		HOURS_ADJUSTMENT,
	} = RequestInstanceTypeEnum;

	const keyCase: RequestInstanceTypeEnum | "CREATE" =
		form.watch("id") === "" ? "CREATE" : form.watch("type");

	const requestInstanceCases: Record<RequestInstanceTypeEnum | "CREATE", ReactNode> = {
		CREATE: <RequestInstanceCreateCaseSheetForm {...params} />,
		[FAKE_GPS]: <RequestInstanceFakeGpsCaseSheetForm {...params} />,
		[GEO_DELIMITATION]: <RequestInstanceGeoDelimitationCaseSheetForm {...params} />,
		[NO_RECOGNIZE_PHOTO]: <RequestInstanceNoRecognizePhotoCaseSheetForm {...params} />,
		[OFFLINE_MARK]: <RequestInstanceOfflineMarkCaseSheetForm {...params} />,
		[REQUEST]: <RequestInstanceSheetFormCase {...params} />,
		[ESPECIFIC_DAY]: <RequestInstanceSheetFormCase {...params} />,
		[FULL_DAY]: <RequestInstanceSheetFormCase {...params} />,
		[HOURS_ADJUSTMENT]: <RequestInstanceSheetFormCase {...params} />,
	};
	return requestInstanceCases[keyCase];
}
