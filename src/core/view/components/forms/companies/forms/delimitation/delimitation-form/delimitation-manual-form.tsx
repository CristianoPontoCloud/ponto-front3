import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import { useDelimitationProvider } from "../delimitation-provider/delimitation-provider";

export function DelimitationManualForm() {
	const { delimitationForm } = useDelimitationProvider();
	return (
		<div className="flex flex-col gap-4 w-full">
			<GridForm className="m-0" gridCol="3">
				<InputForm
					form={delimitationForm}
					label="Latitude"
					formFieldName="latitude"
					required
					placeholder="Latitude"
					onlyNumbers
					disabled
					classNames={{ formItem: "sm:col-span-3 md:col-span-3 lg:col-span-3  xl:col-span-3" }}
				/>
				<InputForm
					form={delimitationForm}
					label="Longitude"
					formFieldName="longitude"
					required
					placeholder="Longitude"
					onlyNumbers
					disabled
					classNames={{ formItem: "sm:col-span-3 md:col-span-3 lg:col-span-3  xl:col-span-3" }}
				/>
			</GridForm>
		</div>
	);
}
