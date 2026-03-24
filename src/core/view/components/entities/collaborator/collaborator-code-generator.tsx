import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { faker } from "@faker-js/faker/locale/el";
import { Copy, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
interface CollaboratorCodeGeneratorParams {
	id?: string;
}
export function CollaboratorCodeGenerator({ id }: CollaboratorCodeGeneratorParams) {
	const [code, setCode] = useState<string>(!id ? faker.number.int({ max: 999999 }).toString() : "");
	const { setModalAndOpen, resetModal } = useModal();
	async function handleCopy(code: string) {
		await navigator.clipboard.writeText(code);
	}

	function openModalCodeGenerate() {
		setModalAndOpen({
			title: "Atenção!",
			content: (
				<span>
					Ao gerar um código de acesso, a senha atual do colaborador será substituída, tornando
					obrigatório o preenchimento do código gerado no próximo acesso. <br /> <br /> Tem certeza
					que deseja prosseguir?
				</span>
			),
			footer: (
				<div className="w-full flex justify-end items-center gap-2">
					<Button id="close" type="button" variant="outline" onClick={() => resetModal()}>
						Cancelar
					</Button>
					<Button
						id="code-genarate"
						type="button"
						variant="destructive"
						onClick={() => {
							setCode(faker.number.int({ max: 999999 }).toString());
							resetModal();
						}}
					>
						Continuar
					</Button>
				</div>
			),
		});
	}
	return (
		<div className="w-full border rounded-lg flex bg-primary/5 p-4 gap-3 col-span-2">
			<Info className="w-4 h-4 text-primary mt-[1px]" />
			<div className="w-full rounded-md flex flex-col gap-3">
				<span>Código de acesso temporário</span>
				<span>
					Forneça este código de acesso ao colaborador que irá utilizar CPF ou Celular no próximo
					acesso.
				</span>
				{code && (
					<div className="h-fit w-fit flex border py-2 px-4 gap-3 rounded-md bg-background text-muted-foreground justify-between items-center">
						<span id="code">{code}</span>
						<Button
							id="code-copy"
							variant="ghost"
							type="button"
							className="h-fit p-0 rounded-lg hover:bg-transparent cursor-pointer !important"
							onClick={() => handleCopy(code)}
						>
							<Copy />
						</Button>
					</div>
				)}
				{!code && (
					<div className="h-fit w-fit justify-between items-center">
						<Button
							id="call-modal"
							variant="link"
							className="p-0"
							type="button"
							onClick={() => openModalCodeGenerate()}
						>
							Gerar código
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
