import { ExportTabEnum } from "@/domain/entities/exports/exports";
import {
	type ExportFields,
	ExportFieldsEnum,
	exportFieldsEnumMap,
} from "@/domain/entities/exports/exports-fields";
import { Button } from "@/view/components/ui/button";
import { DashedSeparator } from "@/view/components/ui/dashed-separator";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { useContextExportFieldsAndEventsProvider } from "../providers/export-fields-and-events-provider";
import { ExportFieldCard } from "./card/export-field-card";

export function ExportFieldsList({ height }: { height: number }) {
	const { form, tab } = useContextExportFieldsAndEventsProvider();
	// const ref = useRef<HTMLDivElement>(null);
	// const height = useTopOffset(ref) - 150;
	if (tab !== ExportTabEnum.FIELDS) return;
	function createNewFieldUseCase(params: { name: string; type: ExportFieldsEnum }): ExportFields {
		const { type } = params;
		const defaultFields = {
			...params,
			size: "",
			startPosition: "",
			endPosition: "",
		};
		const fieldsCases = {
			[ExportFieldsEnum.TEXT]: {
				...defaultFields,
				text: "",
			},
			[ExportFieldsEnum.DATE]: {
				...defaultFields,
				fill: "",
				align: "",
				format: "",
			},
			[ExportFieldsEnum.DECIMAL]: {
				...defaultFields,
				fill: "",
				align: "",
				decimalPlaces: "",
			},
			[ExportFieldsEnum.DEFAULT]: {
				...defaultFields,
				fill: "",
				align: "",
			},
		};
		return fieldsCases[type];
	}
	function addNewField(params: { name: string; type: ExportFieldsEnum }) {
		const arr = [...form.watch("fields")];
		arr.push({
			...createNewFieldUseCase(params),
		});
		form.setValue("fields", arr);
	}
	return (
		<>
			<div className="flex justify-between items-end">
				<div className="flex flex-col gap-1">
					<span className="text-black dark:text-white">Campos específicos</span>
					<span className="text-muted-foreground">
						Clique no botão à direita para adicionar um novo campo.
					</span>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							className={"hover:bg-transparent"}
							data-testid="open-options-button"
						>
							Adicionar campo <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent data-testid="options-content" align="end">
						<DropdownMenuLabel>Eventos</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{exportFieldsEnumMap.map((params, index) => (
								<div key={index.toString()}>
									<DropdownMenuItem onClick={() => addNewField(params)} className="cursor-pointer">
										{params.name}
									</DropdownMenuItem>
								</div>
							))}
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<DashedSeparator />
			<ScrollArea className="rounded-lg" style={{ height }}>
				<div className="flex flex-col gap-3">
					{form.watch("fields").map((params, index) => (
						<ExportFieldCard index={index} fieldParams={params} key={index.toString()} />
					))}
				</div>
			</ScrollArea>
		</>
	);
}
