import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import { TimeTrackingTypeEnum } from "@/domain/entities/time-tracking/header-form";
import DateForm from "@/view/components/formfields/date-form-field";
import DatePickerRangeForm from "@/view/components/formfields/date-picker-range-form-field";
import MonthPickerForm from "@/view/components/formfields/month-picker-form-field";
import {
	MarkFieldsUserPreferenceSheetForm,
	MarkFieldsUserPreferenceSheetFormHeader,
} from "@/view/components/forms/mark/fields-user-preference/mark-fields-user-preference";
import type { DayPickerBase } from "react-day-picker";
import { useWatch } from "react-hook-form";
import { useContextTimeTracking } from "../../provider/time-tracking-provider";
const INVALID_DATES: DayPickerBase["disabled"] = [
	(date) => {
		const today = new Date();
		return date > new Date(today.getFullYear(), today.getMonth() + 1, 0);
	},
	(date) => {
		const today = new Date();
		const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 0);
		return date < threeMonthsAgo;
	},
];
export function useTimeTrackingHeaderForm() {
	const { headerForm } = useContextTimeTracking();
	const type = useWatch({
		control: headerForm.control,
		name: "type",
	});
	const { setContentAndOpen } = useContextSheetContentController();
	// const [Fields, setFields] = useState<ReactNode>(MonthlyFields);
	function openUserPreferenceHrDetails() {
		setContentAndOpen({
			sheetMinWidth: "410px",
			Header: <MarkFieldsUserPreferenceSheetFormHeader />,
			Body: <MarkFieldsUserPreferenceSheetForm values={undefined} />,
		});
	}
	const { daily, monthly, timetracking } = TimeTrackingTypeEnum;
	const Fields = () => {
		if (type === monthly) {
			return (
				<MonthPickerForm
					form={headerForm}
					formFieldName="monthlyDate"
					classNames={{ formItem: "w-[242px]" }}
				/>
			);
		}

		if (type === daily) {
			return (
				<DateForm
					form={headerForm}
					formFieldName="dailyDate"
					classNames={{ formItem: "w-[242px]" }}
				/>
			);
		}

		if (type === timetracking) {
			return (
				<DatePickerRangeForm
					keyDateFrom="dateFrom"
					keyDateTo="dateTo"
					invalidDates={INVALID_DATES}
					form={headerForm}
					classNames={{ formItem: "w-fit" }}
					align="end"
				/>
			);
		}

		return null;
	};

	// useEffect(() => {
	// 	headerForm.setValue("search", "");
	// }, [type]);
	// useEffect(() => {
	// 	const current = headerForm.getValues("search");
	// 	if (current !== "") {
	// 		headerForm.setValue("search", "");
	// 	}
	// }, [type]);

	return {
		Fields,
		openUserPreferenceHrDetails,
	};
}
