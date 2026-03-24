import { useTopOffset } from "@/application/hooks/use-top-off-set";
import type { CompanyFormProps } from "@/domain/entities/companies";
import type { ValueLabel } from "@/domain/value-label";
import { CpfCnpjInputForm } from "@/view/components/formfields/cpf-cnpj-input-form-field";
import { CpfInputForm } from "@/view/components/formfields/cpf-input-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { Label } from "@/view/components/ui/label";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export function CompaniesRegistrationForm() {
	const form = useFormContext<CompanyFormProps>();
	const startDayValues: ValueLabel[] = Array.from({ length: 31 }, (_, index) => {
		const day = `${index + 1}`;
		return {
			label: day,
			value: day,
		};
	});
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	return (
		<ScrollArea
			className="w-full p-1 mr-2"
			data-testid="form-company-registration"
			ref={ref}
			style={{ height: height - 60 }}
			tabIndex={-1}
		>
			<GridForm className="mt-0">
				<Label className="text-muted-foreground text-sm col-span-full">Dados da empresa</Label>
				<InputForm
					form={form}
					label="Razão social"
					formFieldName="name"
					placeholder="Digite a razão social"
					classNames={{ formItem: "sm:col-span-2 md:col-span-2 lg:col-span-2" }}
					required
				/>
				<InputForm
					form={form}
					label="Nome fantasia"
					formFieldName="fantasyName"
					placeholder="Digite o nome fantasia"
					classNames={{ formItem: "sm:col-span-2 md:col-span-2 lg:col-span-2" }}
					required
				/>
				<CpfCnpjInputForm
					form={form}
					label="CNPJ/CPF"
					formFieldName="cnpj"
					placeholder="Informe o CNPJ/CPF"
					required
				/>
				<InputForm form={form} label="IE" formFieldName="ie" placeholder="Informe a IE" />
				<InputForm
					form={form}
					label="CEI/CNO"
					formFieldName="ceicno"
					placeholder="Informe o CEI/CNO"
				/>
				<InputForm form={form} label="CAEPF" formFieldName="caepf" placeholder="Informe o CAEPF" />
				<InputForm
					form={form}
					label="Código folha"
					formFieldName="sheetCode"
					placeholder="Informe o código"
				/>
				<SelectForm
					form={form}
					label="Dia de início"
					formFieldName="startDay"
					placeholder="Informe dia de início"
					required
					datas={startDayValues}
				/>
			</GridForm>
			<Separator className="w-full h-[1px] bg-muted" />
			<GridForm>
				<Label className="text-muted-foreground text-sm col-span-2">Responsável</Label>
				<InputForm
					form={form}
					label="Nome"
					formFieldName="responsibleName"
					placeholder="Nome do responsável"
					classNames={{ formItem: "lg:col-span-1 " }}
					required
				/>
				<InputForm
					form={form}
					label="Sobrenome"
					formFieldName="responsibleSurname"
					placeholder="Sobrenome do responsável"
					classNames={{ formItem: "lg:col-span-1 " }}
					required
				/>
				<InputForm
					form={form}
					label="E-mail"
					formFieldName="responsibleEmail"
					placeholder="E-mail do responsável"
					classNames={{ formItem: "sm:col-span-2 md:col-span-2 lg:col-span-2" }}
					required
				/>
				<CpfInputForm
					form={form}
					label="CPF"
					formFieldName="responsibleCpf"
					placeholder="CPF do responsável"
					classNames={{ formItem: "sm:col-span-2 md:col-span-2 lg:col-span-2" }}
					required
				/>
			</GridForm>
		</ScrollArea>
	);
}
