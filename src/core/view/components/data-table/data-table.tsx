"use client";

import type {
	Cell,
	ColumnDef,
	ColumnFiltersState,
	Header as HeaderTData,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/view/components/ui/table";
import { useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface DataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData>[];
	getCellClassName?: (cell: TData, columnId: string) => string;
	entity: string;
	activeStatusValue?: string;
	pronoun?: "male" | "female";
}

type Header<TData> = HeaderTData<TData, unknown>;

export function DataTable<TData>({
	data,
	columns,
	getCellClassName,
	entity,
	pronoun = "male",
	activeStatusValue,
}: DataTableProps<TData>) {
	const searchParams = useSearchParams();

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		// getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	function formatHeaderSizeStatusAndOptions(header: Header<TData>) {
		const headerText =
			typeof header.column.columnDef.header === "string"
				? header.column.columnDef.header.toLowerCase()
				: "";
		const extraClass = ["status", "options"].includes(headerText) ? "w-fit w-5" : "";
		return "options".includes(headerText) ? `${extraClass} pr-4` : extraClass;
	}

	// function formatCellSizeStatusAndOptions(cell: Cell<TData, unknown>) {
	// 	const columnId = cell.column.id.toLowerCase();
	// 	let extraClass = ["status", "options"].includes(columnId)
	// 		? "w-fit w-5"
	// 		: "";
	// 	return (extraClass = "options".includes(columnId)
	// 		? `${extraClass} pr-4`
	// 		: extraClass);
	// }
	function formatCellSizeStatusAndOptions(cell: Cell<TData, unknown>) {
		const columnId = cell.column.id.toLowerCase();
		let extraClass = ["status", "options"].includes(columnId) ? "w-fit w-5" : "";

		if ("options".includes(columnId)) {
			extraClass = `${extraClass} pr-4`;
		}

		return extraClass;
	}

	if (data.length <= 0) {
		const statusFilter = searchParams ? searchParams.get("status") : null;
		const terms =
			pronoun === "male"
				? {
						none: "Nenhum",
						active: "ativo",
						inative: "inativo",
						founded: "encontrado",
					}
				: {
						none: "Nenhuma",
						active: "ativa",
						inative: "inativa",
						founded: "encontrada",
					};
		const status = statusFilter === activeStatusValue ? terms.active : terms.inative;
		const { none, founded } = terms;
		const firstMessage = `${none} ${entity} ${status} ${founded}`;

		return (
			<div className="w-full h-full border-spacing-4 border-background-foreground border-[1px] border-dashed rounded-lg flex flex-col gap-4 justify-center items-center">
				<p className="text-2xl font-bold">{firstMessage}</p>
				<p>Para adicionar, clique no botão no canto superior direito.</p>
			</div>
		);
	}

	return (
		<ScrollArea
			type="always"
			className="rounded-lg border h-[calc(80vh-7rem)] sm:h-[calc(80vh-6rem)] md:h-[calc(80vh-4.8rem)] lg:h-[calc(80vh-4rem)] xl:h-[calc(80vh-3rem)] "
			data-testid="data-table"
		>
			<Table className="min-w-[250px]">
				<TableHeader className="">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="">
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										className={`${formatHeaderSizeStatusAndOptions(header)}`}
									>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => {
									return (
										<TableCell
											key={cell.id}
											className={`truncate ${formatCellSizeStatusAndOptions(cell)} ${getCellClassName ? getCellClassName(row.original, cell.column.id) : ""}`}
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									);
								})}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
