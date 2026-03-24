import { useTopOffset } from "@/application/hooks/use-top-off-set";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { ExportTabEnum } from "@/domain/entities/exports/exports";
import { Trash } from "lucide-react";
import { useRef, useState } from "react";
import { FormProvider } from "react-hook-form";
import { SheetFooterSubmit } from "../../../sheet/sheet-footer-submit";
import { Button } from "../../../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../../ui/tabs";
import { ExportConfigs } from "./export-configs";
import { ExportEventsList } from "./export-events-list/export-events-list";
import { ExportFieldsList } from "./export-fields-list/export-field-list";
import { ExportFieldsAndEventsProvider } from "./providers/export-fields-and-events-provider";
import { useExportSheetForm } from "./use-export-sheet-form";

export function ExportSheetForm(params: SheetFormProps) {
	const [tab, setTab] = useState<ExportTabEnum>(ExportTabEnum.FIELDS);
	const { form, id, openModalExlcudeExport, onSubmit } = useExportSheetForm(params);
	const ref = useRef<HTMLFormElement>(null);
	const height = useTopOffset(ref);
	const wrapperHeight = height - 70;
	const scrollHeight = height - 193;
	return (
		<FormProvider {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
				data-testid="form"
				className="flex flex-col h-full"
				ref={ref}
			>
				<div className="flex gap-6 h-full" style={{ height: wrapperHeight }}>
					<ExportConfigs />
					<div className="w-full h-full flex flex-col gap-4">
						<Tabs
							defaultValue={ExportTabEnum.FIELDS}
							onValueChange={(e) => setTab(e as ExportTabEnum)}
							data-testid="tabs"
						>
							<TabsList className="w-full">
								<TabsTrigger value={ExportTabEnum.FIELDS} className="w-full" type="button">
									Campos
								</TabsTrigger>
								<TabsTrigger value={ExportTabEnum.EVENTS} className="w-full" type="button">
									Eventos
								</TabsTrigger>
							</TabsList>
						</Tabs>
						<ExportFieldsAndEventsProvider form={form} tab={tab}>
							<ExportFieldsList height={scrollHeight} />
							<ExportEventsList height={scrollHeight} />
						</ExportFieldsAndEventsProvider>
					</div>
				</div>
				<SheetFooterSubmit
					errorsMap={[
						{
							key: "name",
							message: "Para salvar, certifique-se de definir um nome para a exportação",
						},
						{
							key: "events",
							message: "Para salvar, certifique-se de definir um campo",
						},
						{
							key: "events",
							message: "Para salvar, certifique-se de definir um evento",
						},
					]}
					LeftChild={
						id ? (
							<Button
								variant="outline"
								size="icon"
								type="button"
								onClick={() =>
									openModalExlcudeExport({
										id,
										name: form.watch("name"),
									})
								}
							>
								<Trash className="text-red-500" />
							</Button>
						) : undefined
					}
				/>
			</form>
		</FormProvider>
	);
}
