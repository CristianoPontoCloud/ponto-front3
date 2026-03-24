import { dateSubmited } from "../../toaster/date-submited";
import { PunchClockFooterButton } from "./components/punch-clock-footer-button";
import { PunchClockHeaderModalForm } from "./components/punch-clock-header-modal-form";
import { PunchClockTimeViewer } from "./components/punch-clock-time-viewer";
import { PunchClockTypeTabs } from "./components/punch-clock-type-tabs";
import { usePunchClockModalForm } from "./use-punch-clock-modal-form";

export function PunchClockModalForm() {
	const { onTabChange, type, form, onSubmit, loadingButtonDisabler, pin, onPinValueChange } =
		usePunchClockModalForm();
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-col gap-3 items-center w-[400px]"
			id="punch-clock"
		>
			<PunchClockHeaderModalForm form={form} />
			<PunchClockTimeViewer form={form} />
			<PunchClockTypeTabs
				form={form}
				onPinValueChange={onPinValueChange}
				onTabChange={onTabChange}
				type={type}
				pin={pin}
			/>
			<p className="text-muted-foreground">{dateSubmited()}</p>
			<PunchClockFooterButton form={form} loadingButtonDisabler={loadingButtonDisabler} />
		</form>
	);
}
