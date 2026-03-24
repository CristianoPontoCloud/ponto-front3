import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";

interface ModalFooterSubmitParams {
	LeftChild?: ReactNode;
	className?: string;
}
export function ModalFooterSubmit({ LeftChild, className }: ModalFooterSubmitParams) {
	const {
		formState: { isSubmitting },
	} = useFormContext();
	const { resetModal } = useModal();
	return (
		<DialogFooter id="modal-footer-submit" className={`py-4 ${className ?? ""}`}>
			<div
				className={`flex items-center w-full ${LeftChild !== undefined ? "justify-between" : "justify-end"} `}
			>
				{LeftChild}
				<div className="flex gap-2">
					<Button variant="outline" type="button" onClick={() => resetModal()}>
						Cancelar
					</Button>
					<Button
						variant="default"
						type="submit"
						disabled={isSubmitting}
						data-testid="button-submit"
					>
						{isSubmitting ? (
							<>
								Salvando...
								<LoaderCircle className="animate-spin" />
							</>
						) : (
							"Salvar"
						)}
					</Button>
				</div>
			</div>
		</DialogFooter>
	);
}
