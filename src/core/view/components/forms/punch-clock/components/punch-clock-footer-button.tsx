import type { PunchFormProps } from "@/domain/entities/punch";
import LoadingButton from "@/view/components/buttons/loading-button";
import { Button } from "@/view/components/ui/button";
import { Download } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface PunchClockFooterButtonParams {
	form: UseFormReturn<PunchFormProps>;
	loadingButtonDisabler: boolean;
}
export function PunchClockFooterButton({
	form,
	loadingButtonDisabler,
}: PunchClockFooterButtonParams) {
	if (!form.formState.isSubmitSuccessful) {
		return (
			<LoadingButton
				className="w-full"
				type="submit"
				isLoading={form.formState.isSubmitting}
				disabled={loadingButtonDisabler}
				id="submit"
			>
				Registrar ponto
			</LoadingButton>
		);
	}

	return (
		<Button className="w-full" type="button" variant="outline" id="dowload">
			<Download /> Baixar comprovante
		</Button>
	);
}
