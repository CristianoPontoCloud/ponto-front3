import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { ScanFace } from "lucide-react";
import { PunchClockModalForm } from "../../forms/punch-clock/punch-clock-modal-form";
import { Button } from "../../ui/button";

export function PunchClockButton() {
	const { setModalAndOpen } = useModal();
	function openPucnhClockModalForm() {
		setModalAndOpen({
			content: <PunchClockModalForm />,
		});
	}
	return (
		<Button id="punch-clock" variant="outline" onClick={() => openPucnhClockModalForm()}>
			<ScanFace id="scan-face" /> Registrar ponto
		</Button>
	);
}
