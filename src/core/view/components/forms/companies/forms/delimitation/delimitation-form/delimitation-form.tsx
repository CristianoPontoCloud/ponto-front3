import type { DelimitationFormType } from "@/domain/entities/delimitation";
import { zeroMarkBr } from "@/domain/mark-zero-br";
import { InputForm } from "@/view/components/formfields/input-form-field";
import { SwitchForm } from "@/view/components/formfields/switch-form-field";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { Maps } from "@/view/components/maps/maps";
import { MapsArea } from "@/view/components/maps/maps-aria";
import { MapsMark } from "@/view/components/maps/maps-mark";
import { SheetFooterCustomSubmit } from "@/view/components/sheet/sheet-footer-custom-submit";
import { Button } from "@/view/components/ui/button";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { Separator } from "@/view/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/view/components/ui/tabs";
import { Trash2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useDelimitationProvider } from "../delimitation-provider/delimitation-provider";
import { DelimitationAddressForm } from "./delimitation-address-form";
import { DelimitationManualForm } from "./delimitation-manual-form";
import { useDelimitationForm } from "./use-delimitation-form";

export function DelimitationForm() {
	const {
		delimitationForm,
		openModalExcludeDelimitation,
		setOpenSheetDelimitation,
		delimitationId,
		setType,
		type,
		handleSubmit,
	} = useDelimitationProvider();
	const { setCoors } = useDelimitationForm();
	const isEdit = delimitationForm.watch("id");
	function LeftChildFooter() {
		return (
			<div className="flex items-center gap-2">
				{isEdit && (
					<Button
						variant="outline"
						size="icon"
						onClick={() => openModalExcludeDelimitation(delimitationId)}
					>
						<Trash2 className="text-destructive" />
					</Button>
				)}
				<SwitchForm formFieldName="active" form={delimitationForm} label="Status" />
			</div>
		);
	}

	const coors = {
		lat: delimitationForm.watch("latitude") ?? zeroMarkBr.SP.lat,
		lng: delimitationForm.watch("longitude") ?? zeroMarkBr.SP.lng,
	};
	return (
		<FormProvider {...delimitationForm}>
			<form
				key="delimitation-form"
				className="flex flex-col h-[76%] sm:h-[78%] md:h-[80%] lg:h-[82%]  xl:h-[84%]"
			>
				<div className="flex gap-4 h-full">
					<ScrollArea className="">
						<div className="w-[500px] flex flex-col gap-4 h-full p-1 pt-0 md:h-[80%] ">
							<InputForm
								form={delimitationForm}
								label="Nome"
								formFieldName="delimitationName"
								required
								placeholder="Nome da delimitação"
							/>
							<InputForm
								form={delimitationForm}
								label="Raio"
								formFieldName="radiusInMeters"
								required
								placeholder="0"
								onlyNumbers
								rightNote="Metro(s)"
							/>
							<Tabs
								value={type}
								onValueChange={(value) => setType(value as string as DelimitationFormType)}
								data-testid="tabs"
							>
								<TabsList className="w-full">
									<TabsTrigger value={"address"} className="w-full" type="button">
										Endereço
									</TabsTrigger>
									<TabsTrigger value={"manual"} className="w-full" type="button">
										Seleção manual
									</TabsTrigger>
								</TabsList>
							</Tabs>
							<Separator orientation="horizontal" />
							{type === "manual" ? <DelimitationManualForm /> : <DelimitationAddressForm />}
							{/* <DelimitationManualForm /> */}
							<TextAreaForm
								form={delimitationForm}
								label="Complemento"
								formFieldName="complement"
								placeholder="Informe o complemento"
							/>
						</div>
					</ScrollArea>
					<Maps
						className="h-full"
						mapProps={{
							onClick: (e) => {
								if (type === "address") return;
								const latLng = e.detail.latLng;
								setCoors({
									lat: latLng?.lat.toString() ?? "",
									lng: latLng?.lng.toString() ?? "",
								});
							},
						}}
						defaultZoom={16}
						// center={type === "address" ? coors : undefined}
						center={coors}
					>
						<MapsMark coors={coors} />
						<MapsArea coors={coors} radius={Number(delimitationForm.watch("radiusInMeters"))} />
					</Maps>
				</div>
				<SheetFooterCustomSubmit
					LeftChild={<LeftChildFooter />}
					onCancel={() => setOpenSheetDelimitation(false)}
					handleSubmit={async () => delimitationForm.handleSubmit(handleSubmit)()}
				/>
			</form>
		</FormProvider>
	);
}
