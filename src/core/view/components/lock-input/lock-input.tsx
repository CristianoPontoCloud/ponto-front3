import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { InputForm } from "../formfields/input-form-field";
import { Button } from "../ui/button";
interface LockInputParams<T extends FieldValues> {
	inputParams: InputFormParams<T>;
	className?: string;
	modal: {
		title: string;
		description: string;
	};
}
export function LockInput<T extends FieldValues>({
	inputParams,
	className = "",
	modal: { description, title },
}: LockInputParams<T>) {
	const [isLocked, setIsLocked] = useState<boolean>(true);
	const { setModalAndOpen, resetModal } = useModal();
	function unlockInput() {
		setIsLocked(false);
		resetModal();
	}
	function openModalUnlockInput() {
		setModalAndOpen({
			title,
			description,
			footer: (
				<div className="w-full flex justify-end items-center gap-2">
					<Button type="button" variant="outline" onClick={() => resetModal()}>
						Cancelar
					</Button>
					<Button type="button" variant="destructive" onClick={() => unlockInput()}>
						Continuar
					</Button>
				</div>
			),
		});
	}
	return (
		<div className={`w-full flex gap-2 col-span-2 items-end ${className}`}>
			<InputForm {...inputParams} disabled={isLocked} />
			{isLocked && (
				<Button
					id="open-unlock-input-modal"
					type="button"
					variant="outline"
					className="w-9 h-9"
					onClick={() => openModalUnlockInput()}
				>
					<PencilLine className="w-4 h-4" />
				</Button>
			)}
		</div>
	);
}
