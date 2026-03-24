import type { ExtraHourRules } from "@/domain/entities/extra-hour/extra-hour-rules";
import { toastController } from "@/view/components/toaster/toast-controller";
import { Button } from "@/view/components/ui/button";
import { SheetFooter } from "@/view/components/ui/sheet";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";

interface SheetFooterSubmitParams {
	labelSubmit?: string;
	sheetHasDescription?: boolean;
	className?: string;
	closeOverSheet: VoidFunction;
	submitRules: () => void;
}

export function RulesManagerSheetFooter({
	labelSubmit = "Salvar",
	sheetHasDescription = false,
	closeOverSheet,
	submitRules,
}: SheetFooterSubmitParams) {
	const {
		formState: { isSubmitting, errors, submitCount },
	} = useFormContext<ExtraHourRules>();
	const sheetFoorterVariants = tv({
		base: "flex flex-col w-full absolute bg-background sm:justify-between p-1 items-center pb-6 ",
		variants: {
			sheetHasDescription: {
				true: "bottom-[60px]",
				false: "bottom-[34px]",
			},
		},
	});
	useEffect(() => {
		const errorsMap = Object.values(errors);
		if (errorsMap.length > 0) {
			toastController.error({
				tittle: "Ops! Não foi possível salvar.",
				description: "Preencha os campos obrigatórios para concluir o cadastro",
				action: {
					label: "OK",
					onClick: () => {},
				},
			});
		}
	}, [submitCount, errors]);
	return (
		<SheetFooter
			className={sheetFoorterVariants({
				sheetHasDescription: sheetHasDescription,
			})}
		>
			<div className="flex w-full items-center justify-end">
				<div className="flex gap-2">
					<Button
						variant="outline"
						type="button"
						onClick={() => {
							closeOverSheet();
						}}
					>
						Cancelar
					</Button>
					<Button
						variant="default"
						type="button"
						disabled={isSubmitting}
						data-testid="button-submit"
						onClick={() => submitRules()}
					>
						{isSubmitting ? (
							<>
								Salvando...
								<LoaderCircle className="animate-spin" />
							</>
						) : (
							labelSubmit
						)}
					</Button>
				</div>
			</div>
		</SheetFooter>
	);
}
