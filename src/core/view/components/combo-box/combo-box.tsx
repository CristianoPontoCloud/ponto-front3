"use client";
import type { ValueLabel } from "@/domain/value-label";
import { Button } from "@/view/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/view/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/view/components/ui/popover";
import { cn } from "@/view/lib/utils";
import { Check, ChevronsUpDown, LoaderCircle, XIcon } from "lucide-react";
import * as React from "react";
import { tv } from "tailwind-variants";

export interface ComboboxParams {
	onChangeValue: (value: string) => void;
	hasError?: boolean;
	classNames?: {
		buttonTrigger?: string;
		popoverContent?: string;
		commandList?: string;
	};
	IconLeftOnList?: React.ReactNode;
	datas: ValueLabel[];
	placeholder?: string;
	placeholderInput?: string;
	disabled?: boolean;
	value: string;
	isLoading?: boolean;
}

export function Combobox({
	IconLeftOnList,
	datas,
	onChangeValue,
	classNames,
	hasError,
	placeholder = "Selecione",
	placeholderInput = "Pesquisar",
	disabled,
	value,
	isLoading = false,
}: ComboboxParams) {
	const [open, setOpen] = React.useState(false);
	const [label, setLabel] = React.useState<string>("");
	const [options, setOptions] = React.useState<ValueLabel[]>(datas);
	const wrapperRef = React.useRef<HTMLDivElement | null>(null);
	// const value: PathValue<T, Path<T>> = form.watch(formFieldName);

	// React.useEffect(() => {
	// 	form.trigger(formFieldName);
	// 	form.setValue(formFieldName, value as PathValue<T, Path<T>>);
	// }, [value]);

	const inputVariants = tv({
		base: `w-full justify-between ${classNames?.buttonTrigger ?? ""}`,
		variants: {
			hasError: {
				true: "border-red-500",
				false: "",
			},
			isSelected: {
				true: "text-background-foreground",
				false: "",
			},
			hasValue: {
				true: "",
				false: "text-muted-foreground",
			},
		},
	});

	React.useEffect(() => {
		const newLabel = options.find((data) => data.value === value)?.label;
		// if (!newLabel) return;
		setLabel(newLabel ?? "");
	}, [value, options]);

	React.useEffect(() => {
		setOptions(datas);
	}, [datas]);

	return (
		<div className="space-y-2" ref={wrapperRef}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={inputVariants({ hasError, hasValue: value !== "" })}
						disabled={disabled}
					>
						{label !== "" ? label : placeholder}
						{label !== "" ? (
							<Button
								variant="ghost"
								size="sm"
								className="p-0 opacity-50"
								onClick={(e) => {
									e.preventDefault();
									onChangeValue("");
								}}
							>
								<XIcon />
							</Button>
						) : (
							<ChevronsUpDown className="opacity-50" />
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className={`w-full p-0 ${classNames?.popoverContent}`}
					style={{
						width: wrapperRef.current?.offsetWidth,
					}}
				>
					<Command>
						<CommandInput placeholder={placeholderInput} className="h-9" />
						<CommandList className={classNames?.commandList}>
							<CommandEmpty>
								{isLoading ? (
									<div className="w-full flex justify-center items-center gap-2">
										carregando
										<LoaderCircle className="animate-spin" />
									</div>
								) : (
									"Nenhum dado encontrado"
								)}
							</CommandEmpty>
							<CommandGroup>
								{options.map((data) => (
									<CommandItem
										key={data.value}
										value={data.value}
										onSelect={(currentValue) => {
											onChangeValue(currentValue);
											setOpen(false);
										}}
									>
										{IconLeftOnList}
										{data.label}
										<Check
											className={cn("ml-auto", value === data.value ? "opacity-100" : "opacity-0")}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
