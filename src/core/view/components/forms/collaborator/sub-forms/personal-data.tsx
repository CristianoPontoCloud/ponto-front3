import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { useSysConfigStore } from "@/application/providers/sys-config/use-sys-config";
import { sysConfigEnumAdapters } from "@/application/usecases/sys-config-paramters-maper";
import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import { CheckboxForm } from "@/view/components/formfields/checkbox-form";
import { CpfInputForm } from "@/view/components/formfields/cpf-input-form-field";
import DateForm from "@/view/components/formfields/date-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import { LabelForm } from "@/view/components/formfields/label-form";
import SelectForm from "@/view/components/formfields/select-form";
import type { CompanyNameId } from "@/view/components/header/company-selector";
import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { Separator } from "@/view/components/ui/separator";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCollaboratorOpenSheetOverSheetForms } from "../use-collaborator-open-sheet-over-sheet-forms";

export default function PersonalDataForm() {
	const form = useFormContext<CollaboratorFormProps>();
	const user = useSession().data?.user;
	const companyId = user?.companyId ?? "";
	const companyGroups = useMemo(() => user?.companyGroups ?? [], [user?.companyGroups]);
	// const [companyList, setCompanyList] = useState<CompanyNameId[]>([]);
	const [company, setCompany] = useState<string>("");
	const companyIdSelected = form.watch("company");
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	const openForm = useCollaboratorOpenSheetOverSheetForms();
	const { parameters } = useSysConfigStore();
	function AddEntityLink({ open }: { open: VoidFunction }) {
		return (
			<Button variant="link" type="button" onClick={open} className="p-0 h-fit">
				Adicionar
			</Button>
		);
	}
	const fullspan = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	const halfspan = "col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1";
	useEffect(() => {
		const companies: CompanyNameId[] = [];
		for (const { branches, headquarters } of companyGroups) {
			companies.push({ companyName: headquarters.companyName, companyId: headquarters.companyId });
			for (const { companyName, companyId } of branches) {
				companies.push({ companyName, companyId });
			}
		}
		console.log({ companies });
		console.log({ companyIdSelected });
		setCompany(
			companies?.find((item) => {
				console.log({ item });
				return item.companyId === companyIdSelected;
			})?.companyName ?? "",
		);
	}, [companyGroups, companyIdSelected]);
	return (
		<ScrollArea
			className="w-full"
			data-testid="form-collaborator-personal"
			ref={ref}
			style={{ height: height - 60 }}
		>
			<GridForm className="mt-0">
				<Label className="text-muted-foreground col-span-2">Dados pessoais</Label>
				<InputForm
					form={form}
					formFieldName="name"
					label="Nome"
					required
					placeholder="Informe o nome"
					classNames={{ formItem: halfspan }}
				/>
				<InputForm
					form={form}
					formFieldName="surname"
					label="Sobrenome"
					required
					placeholder="Informe o sobrenome"
					classNames={{ formItem: halfspan }}
				/>

				<InputForm
					form={form}
					formFieldName="email"
					label="E-mail"
					placeholder="Informe o e-mail"
					classNames={{ formItem: fullspan }}
				/>
				<div className="flex flex-col gap-4 w-full col-span-1 md:col-span-2 lg:col-span-1">
					<InputForm
						form={form}
						formFieldName="pis"
						label="PIS"
						placeholder="Informe o PIS"
						disabled={form.watch("hasNoPis")}
					/>
					<CheckboxForm form={form} label="Não possui PIS" formFieldName="hasNoPis" />
				</div>
				<CpfInputForm
					form={form}
					formFieldName="cpf"
					label="CPF"
					placeholder="Informe o CPF"
					required
				/>
			</GridForm>
			<Separator className="w-full h-[1px] bg-muted" />
			<GridForm>
				<Label className="text-muted-foreground col-span-2">Contrato de trabalho</Label>
				<div className={"w-full col-span-2 md:col-span-2 lg:col-span-2 flex flex-col gap-2"}>
					<div className="flex justify-between items-center h-fit">
						<LabelForm label="Empresa" disabled />
					</div>
					<div className="flex gap-1 items-center h-9 relative">
						<Input value={company} disabled />
					</div>
				</div>
				<DateForm
					form={form}
					formFieldName="dtAdmission"
					label="Data de admissão"
					placeholder="Selecione a data"
					classNames={{ formItem: halfspan }}
					required
				/>
				<DateForm
					form={form}
					formFieldName="dtStartSystem"
					label="Início do uso do sistema"
					placeholder="Selecione a data"
					classNames={{ formItem: halfspan }}
					description="descrição"
					required
				/>
				<SelectForm
					form={form}
					formFieldName="positionTrust"
					label="Cargo de confiança"
					placeholder="Selecione"
					classNames={{ formItem: halfspan }}
					datas={[
						{ label: "Sim", value: "true" },
						{ label: "Não", value: "false" },
					]}
				/>
				<SelectForm
					form={form}
					formFieldName="position"
					label="Cargo"
					placeholder="Selecione"
					endpoint={`position/findAllFiltered?status=ACTIVE&companyId=${companyId}`}
					classNames={{ formItem: halfspan }}
					required
					HeadGenericComponent={<AddEntityLink open={openForm.position} />}
				/>
				<SelectForm
					form={form}
					formFieldName="department"
					label="Departamento"
					placeholder="Selecione"
					endpoint={`department/findAllFiltered?status=ACTIVE&companyId=${companyId}`}
					classNames={{ formItem: halfspan }}
					required
					HeadGenericComponent={<AddEntityLink open={openForm.department} />}
				/>
				<SelectForm
					form={form}
					formFieldName="costCenter"
					label="Centro de custo"
					placeholder="Selecione"
					classNames={{ formItem: halfspan }}
					required
					endpoint={`center-cost/findAllFiltered?status=ACTIVE&companyId=${companyId}`}
					HeadGenericComponent={<AddEntityLink open={openForm.costCenter} />}
				/>
				<Separator orientation="horizontal" className={fullspan} />
				<InputForm
					form={form}
					formFieldName="registration"
					label="Matrícula"
					placeholder="Informe a matrícula"
					description="descrição"
				/>
				<InputForm
					form={form}
					formFieldName="sheet"
					label="Nº da Folha"
					placeholder="Informe o número da folha"
					description="descrição"
				/>
				<InputForm
					form={form}
					formFieldName="ctps"
					label="CTPS"
					placeholder="Informe o CTPS"
					description="descrição"
				/>
				<SelectForm
					form={form}
					formFieldName="clt"
					label="CLT"
					placeholder="Selecione"
					datas={sysConfigEnumAdapters({ field: "yesNo", parameters })}
				/>
			</GridForm>
		</ScrollArea>
	);
}
