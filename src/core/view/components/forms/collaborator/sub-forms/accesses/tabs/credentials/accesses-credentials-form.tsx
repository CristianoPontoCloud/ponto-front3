import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import { CollaboratorCodeGenerator } from "@/view/components/entities/collaborator/collaborator-code-generator";
import { CollaboratorInMultipleCompaniesWarning } from "@/view/components/entities/collaborator/collaborator-in-multiple-companies-warning";
import { CpfInputForm } from "@/view/components/formfields/cpf-input-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import { LabelForm } from "@/view/components/formfields/label-form";
import SelectForm from "@/view/components/formfields/select-form";
import { LockInput } from "@/view/components/lock-input/lock-input";
import { Separator } from "@/view/components/ui/separator";
import { useFormContext } from "react-hook-form";

export function AccessesCredentialsForm() {
	const form = useFormContext<CollaboratorFormProps>();
	const id = form.watch("id");
	// const { setValue, getValues } = form;
	// const password = form.watch("password");
	// function copyPassword() {
	// 	const password = getValues("password");
	// 	navigator.clipboard.writeText(password);
	// }

	// function generatePassword() {
	// 	setValue("password", uuidv4(), { shouldValidate: true });
	// }

	// const RightSideButtons = () => (
	// 	<div className="relative">
	// 		<TooltipProvider delayDuration={0}>
	// 			<Tooltip>
	// 				<TooltipTrigger asChild>
	// 					<Button
	// 						variant={"link"}
	// 						className="my-[23.5px] absolute left-[-40px] text-black dark:text-white"
	// 						type="button"
	// 						size="icon"
	// 						onClick={() => copyPassword()}
	// 						data-testid={"button-copy-password"}
	// 					>
	// 						<Copy />
	// 					</Button>
	// 				</TooltipTrigger>
	// 				<TooltipContent
	// 					align="start"
	// 					className="bg-black text-xs text-white dark:bg-white dark:text-black"
	// 				>
	// 					Copia
	// 				</TooltipContent>
	// 			</Tooltip>
	// 		</TooltipProvider>
	// 		<TooltipProvider delayDuration={0}>
	// 			<Tooltip>
	// 				<TooltipTrigger asChild>
	// 					<Button
	// 						variant={"outline"}
	// 						className="my-[23.5px]"
	// 						size="icon"
	// 						type="button"
	// 						onClick={() => generatePassword()}
	// 						data-testid={"button-generate-password"}
	// 					>
	// 						<RefreshCw />
	// 					</Button>
	// 				</TooltipTrigger>
	// 				<TooltipContent
	// 					align="start"
	// 					className="bg-black text-xs text-white dark:bg-white dark:text-black"
	// 				>
	// 					Gerar senha
	// 				</TooltipContent>
	// 			</Tooltip>
	// 		</TooltipProvider>
	// 	</div>
	// );

	return (
		<GridForm className="m-0">
			<SelectForm
				form={form}
				formFieldName="perfil"
				placeholder="Selecione o perfil"
				classNames={{
					formItem: "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2",
				}}
				label="Perfil"
				datas={[{ value: "1", label: "Colaborador" }]}
				required
			/>
			<Separator orientation="horizontal" className="col-span-2" />
			<LabelForm
				classNameLabel="text-muted-foreground col-span-2"
				label="Login"
				description="descrition"
			/>
			<CpfInputForm
				form={form}
				formFieldName="cpf"
				placeholder="000.000.000-00"
				classNames={{
					formItem: "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2",
				}}
				label="CPF"
			/>
			<LockInput
				inputParams={{
					form,
					formFieldName: "cell",
					placeholder: "Informe o número de celular",
					label: "Celular",
					classNames: {
						formItem: "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 ",
						input: "pr-[38px]",
					},
				}}
				modal={{
					title: "Atenção!",
					description:
						"Você está prestes a alterar número de celular de acesso deste usuário. A atualização será refletida automaticamente em todas as empresas em que ele possui cadastro.",
				}}
			/>
			<LockInput
				inputParams={{
					form,
					formFieldName: "email",
					placeholder: "Informe o email",
					label: "E-mail",
					classNames: {
						formItem: "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 ",
						input: "pr-[38px]",
					},
				}}
				modal={{
					title: "Atenção!",
					description:
						"Você está prestes a alterar o email de acesso deste usuário. A atualização será refletida automaticamente em todas as empresas em que ele possui cadastro.",
				}}
			/>
			<CollaboratorInMultipleCompaniesWarning id={id} />
			<CollaboratorCodeGenerator id={id} />
		</GridForm>
	);
}
