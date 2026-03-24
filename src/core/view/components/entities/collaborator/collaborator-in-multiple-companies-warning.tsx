import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
interface CollaboratorInMultipleCompaniesWarningParams {
	id?: string;
}
export function CollaboratorInMultipleCompaniesWarning({
	id,
}: CollaboratorInMultipleCompaniesWarningParams) {
	const [hasRegisterMultiplesCompanies, setHasRegisterMultiplesCompanies] =
		useState<boolean>(false);
	useEffect(() => {
		setHasRegisterMultiplesCompanies(!!id);
	}, [setHasRegisterMultiplesCompanies, id]);
	if (!hasRegisterMultiplesCompanies) return;
	return (
		<div className="w-full border rounded-lg flex p-4 gap-3 col-span-2" id="warning">
			<TriangleAlert className="w-4 h-4 text-yellow-500 mt-[1px]" />
			<div className="w-full rounded-md flex flex-col gap-3">
				<span>Cadastro em múltiplas empresas identificado</span>
				<span>
					Este usuário já está cadastrado em outra empresa do grupo. Para registrar o ponto, ele
					deverá acessar a aplicação com a senha já definida e selecionar a empresa desejada para
					registrar o ponto.
				</span>
			</div>
		</div>
	);
}
