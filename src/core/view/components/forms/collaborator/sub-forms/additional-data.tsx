import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { states } from "@/domain/data/state";
import { CNHList } from "@/domain/entities/cnh";
import { CepInputForm } from "@/view/components/formfields/cep-input-form-field";
import DateForm from "@/view/components/formfields/date-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { Label } from "@/view/components/ui/label";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export default function AdditionalDataForm() {
	const generoOption = [
		{ value: "1", label: "Masculino" },
		{ value: "2", label: "Feminino" },
	];
	const estadoCivilOption = [
		{ value: "1", label: "Solteiro(a)" },
		{ value: "2", label: "Casado(a)" },
		{ value: "3", label: "Viuvo(a)" },
	];

	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	const form = useFormContext();
	const grid6 = {
		small: "col-span-6 sm:col-span-6 md:col-span-2 lg:col-span-2 xl:col-span-2",
		large: "col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4",
	};
	return (
		<ScrollArea
			className="w-full"
			data-testid="form-collaborator-additional"
			ref={ref}
			style={{ height: height - 60 }}
		>
			<GridForm className="w-full mt-0">
				<Label className="text-muted-foreground col-span-2">Dados pessoais complementares</Label>
				<InputForm form={form} formFieldName="rg" label="RG" placeholder="Informe o RG" />
				<DateForm
					form={form}
					formFieldName="dtBirthday"
					label="Data de nascimento"
					placeholder="Selecione a data"
				/>
				<SelectForm
					form={form}
					formFieldName="gender"
					label="Gênero"
					placeholder="Selecione"
					datas={generoOption}
				/>
				<InputForm
					form={form}
					formFieldName="nationality"
					label="Nacionalidade"
					placeholder="Informe a nacionalidade"
				/>
				<InputForm
					form={form}
					formFieldName="placeOfBirth"
					label="Naturalidade"
					placeholder="Informe a naturalidade"
				/>
				<SelectForm
					form={form}
					formFieldName="civilState"
					label="Estado civil"
					placeholder="Selecione o estado"
					datas={estadoCivilOption}
				/>
				<InputForm
					form={form}
					formFieldName="socialName"
					label="Nome social"
					placeholder="Informe o nome social"
				/>
				<InputForm form={form} formFieldName="cnh" label="CNH" placeholder="Informe a CNH" />
				<SelectForm
					form={form}
					formFieldName="categoryCnh"
					label="Categoria CNH"
					placeholder="Selecione"
					datas={CNHList}
				/>
				<DateForm
					form={form}
					formFieldName="dtMaturityCnh"
					label="Data de vencimento CNH"
					placeholder="Selecione a data"
				/>
			</GridForm>
			<Separator className="w-full h-[1px] bg-muted" />
			<GridForm gridCol="6">
				<Label className="text-muted-foreground col-span-6">Endereço</Label>
				<CepInputForm
					form={form}
					formFieldName="zipcode"
					label="CEP"
					placeholder="CEP"
					classNames={{ formItem: grid6.small }}
				/>
				<InputForm
					form={form}
					formFieldName="street"
					label="Rua"
					classNames={{ formItem: grid6.large }}
					placeholder="Informe a rua"
				/>
				<InputForm
					form={form}
					formFieldName="code"
					label="Número"
					placeholder="Número"
					classNames={{ formItem: grid6.small }}
				/>
				<InputForm
					form={form}
					formFieldName="neighborhood"
					label="Bairro"
					classNames={{ formItem: grid6.large }}
					placeholder="Informe o bairro"
				/>
				<SelectForm
					form={form}
					formFieldName="state"
					label="Estado"
					classNames={{ formItem: grid6.small }}
					placeholder="Selecione"
					datas={states}
				/>
				<SelectForm
					form={form}
					formFieldName="city"
					label="Cidade"
					datas={[
						{
							label: "Concordia",
							value: "1",
						},
					]}
					placeholder="Selecione"
					classNames={{ formItem: grid6.large }}
				/>
			</GridForm>
			<Separator className="w-full h-[1px] bg-muted" />
			<GridForm>
				<Label className="text-muted-foreground col-span-2">Contatos</Label>
				<InputForm
					form={form}
					formFieldName="telephone"
					label="Telefone"
					placeholder="Informe o telefone"
					onlyNumbers
				/>
				<InputForm
					form={form}
					formFieldName="extension"
					label="Ramal"
					placeholder="Informe o ramal"
				/>
				<InputForm
					form={form}
					formFieldName="cell"
					label="Celular"
					placeholder="Informe o celular"
				/>
				<InputForm
					form={form}
					formFieldName="whatsApp"
					label="WhatsApp"
					placeholder="Informe o WhatsApp"
				/>
			</GridForm>
			<Separator className="w-full h-[1px] bg-muted" />
			<GridForm>
				<Label className="text-muted-foreground col-span-2">Contatos adicionais</Label>
				<InputForm
					form={form}
					formFieldName="fathersName"
					label="Nome do pai"
					placeholder="Informe o nome"
				/>
				<InputForm
					form={form}
					formFieldName="fathersTelephone"
					label="Telefone do pai"
					placeholder="Informe o telefone"
				/>
				<InputForm
					form={form}
					formFieldName="mothersName"
					label="Nome do mãe"
					placeholder="Informe o nome"
				/>
				<InputForm
					form={form}
					formFieldName="mothersTelephone"
					label="Telefone do mãe"
					placeholder="Informe o telefone"
				/>
			</GridForm>
		</ScrollArea>
	);
}
