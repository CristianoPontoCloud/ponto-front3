import { signupFacadeFactory } from "@/application/factories/enrollment/signup-facade-factory";
import type { SignupFormProps } from "@/domain/authentication/signup";
import { CnpjInputForm } from "@/view/components/formfields/cnpj-input-form-field";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

export function SignupCompanyForm() {
	const form = useFormContext<SignupFormProps>();
	const [token] = useQueryState("token", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const cnpj = form.watch("cnpj");
	const cnpjValidLength = cnpj.length === 18;
	const singupFacade = useMemo(() => signupFacadeFactory(), []);
	const router = useRouter();
	const [disabledFantasyName, setDisabledFantasyName] = useState<boolean>(true);
	const { refetch } = useQuery({
		queryKey: ["cnpj", cnpj],
		queryFn: async () => {
			form.setValue("fantasyName", "");
			if (!disabledFantasyName) {
				setDisabledFantasyName(true);
			}
			const response = await singupFacade.cnpjCofirm({ cnpj });
			if (!response?.success) {
				return toastError({
					tittle: "CNPJ inválido",
					description: "Verifique o CNPJ informado e tente novamente.",
					position: "bottom-center",
					action: {
						label: "OK",
						onClick: () => {},
					},
					className: "w-[341px]",
				});
			}

			const newFantasyName = response?.data?.nomeFantasia ?? "";

			if (newFantasyName === "") {
				setDisabledFantasyName(false);
			}

			form.setValue("fantasyName", newFantasyName);
			return response;
		},
		retry: false,
		enabled: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		staleTime: Number.POSITIVE_INFINITY,
	});

	return (
		<>
			<CnpjInputForm
				form={form}
				formFieldName="cnpj"
				placeholder="cnpj"
				label="CNPJ"
				onBlur={async () => {
					if (cnpjValidLength) {
						await refetch();
					}
				}}
			/>
			<InputForm
				form={form}
				formFieldName="fantasyName"
				placeholder="digite o nome fantasia"
				label="Nome fantasia"
				disabled={disabledFantasyName}
			/>
			<SelectForm
				form={form}
				formFieldName="companySize"
				placeholder="selecione o tamanho da empresa"
				label="Tamanho da empresa"
				datas={[
					{
						label: "0 - 10 colaboradores",
						value: "0 - 10",
					},
					{
						label: "11 - 20 colaboradores",
						value: "11 - 20",
					},
					{
						label: "21 - 50 colaboradores",
						value: "21 - 50",
					},
					{
						label: "51 - 100 colaboradores",
						value: "51 - 100",
					},
					{
						label: "mais de 100 colaboradores",
						value: "100 + ",
					},
				]}
			/>
			<Button
				type="button"
				onClick={async () => {
					const isCnpjValid = await form.trigger("cnpj");
					const isFantasyNameValid = await form.trigger("fantasyName");
					const isCompanySizeValid = await form.trigger("companySize");

					if (!isCnpjValid || !isFantasyNameValid || !isCompanySizeValid) return;
					router.push(`/signup/personal-data?token=${token}`);
				}}
			>
				Avançar
			</Button>
		</>
	);
}
