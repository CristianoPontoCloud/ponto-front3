"use client";
import { useInfinityQueryContext } from "@/application/providers/infinity-pagination/infinity-provider";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/view/components/ui/table";
import type { ColumnDef } from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { Suspense, useEffect, useRef } from "react";
import { tv } from "tailwind-variants";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface InfinityTableProps<TData> {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	columns: ColumnDef<TData, any>[];
	getCellClassName?: (cell: TData, columnId: string) => string;
	entity: string;
	pronoun?: "male" | "female";
	heightTable: number;
	customNoValuesMessage?: {
		title: string;
		message: string;
	};
	className?: string;
}

function InfinityTableContent<TData>({
	columns,
	getCellClassName,
	entity,
	pronoun = "male",
	heightTable,
	customNoValuesMessage,
	className = "",
}: InfinityTableProps<TData>) {
	const loadMoreRef = useRef<HTMLDivElement>(null);
	const [status] = useQueryState("status");

	const { flatData, query } = useInfinityQueryContext<TData>();
	const hasNextPage = query?.hasNextPage;
	const fetchNextPage = query?.fetchNextPage;
	const isFetchingNextPage = query?.isFetchingNextPage;
	// const error = query?.error;
	const isLoading = query?.isLoading;
	const isPaused = query?.isPaused;

	const table = useReactTable({
		data: flatData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage?.().catch((e) => console.error("Failed to fetch next page:", e));
				}
			},
			{ rootMargin: "100px" },
		);

		const currentRef = loadMoreRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	// if (error) {
	// 	return (
	// 		<div
	// 			style={{ height: heightTable }}
	// 			className="w-full border rounded-lg flex items-center justify-center"
	// 		>
	// 			<p className="text-red-500">Error loading data</p>
	// 		</div>
	// 	);
	// }

	if (flatData.length <= 0 && !isLoading) {
		const terms =
			pronoun === "male"
				? { none: "Nenhum", active: "ativo", inactive: "inativo", founded: "encontrado" }
				: { none: "Nenhuma", active: "ativa", inactive: "inativa", founded: "encontrada" };

		const statusLabelMap: Record<string, string> = {
			[`${StatusDefaultEnum.active}`]: terms.active,
			[`${StatusDefaultEnum.inactive}`]: terms.inactive,
			[`${StatusDefaultEnum.any}`]: "",
		};
		const title = `${terms.none} ${entity} ${status ? statusLabelMap[status ?? ""] : ""} ${terms.founded}`;
		const titleCase = customNoValuesMessage ? customNoValuesMessage.title : title;
		const message = "Para adicionar, clique no botão no canto superior direito.";
		const messageCase = customNoValuesMessage ? customNoValuesMessage.message : message;
		return (
			<div
				style={{ height: heightTable }}
				className={`w-full border-spacing-4 border-background-foreground border-[1px] border-dashed rounded-lg flex flex-col gap-4 justify-center items-center ${className}`}
			>
				<p className="text-2xl font-bold">{titleCase}</p>
				<p>{messageCase}</p>
			</div>
		);
	}

	const loadingVariants = tv({
		base: "w-full h-1 relative overflow-hidden bottom-[0px] transition-all duration-200 ease-in-out",
		variants: {
			isLoading: {
				true: "bottom-[-10px]",
				false: "",
			},
		},
	});

	return (
		<ScrollArea
			type="always"
			className={`rounded-lg border ${className}`}
			scrollBarClassName="h-[calc(100%-35px)]"
			style={{ height: heightTable }}
			scrollBarStyle={{
				top: "35px",
			}}
		>
			<Table className="min-w-[250px]">
				<TableHeader className="z-10">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className={
										typeof header.column.columnDef.header === "string" &&
										["status", "options"].includes(header.column.columnDef.header.toLowerCase())
											? "w-[85px] pr-4"
											: ""
									}
								>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
							{row.getVisibleCells().map((cell) => (
								<TableCell
									key={cell.id}
									className={`truncate ${
										["status", "options"].includes(cell.column.id.toLowerCase())
											? "w-[85px] pr-4"
											: ""
									} ${getCellClassName ? getCellClassName(row.original, cell.column.id) : ""}`}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<ScrollBar orientation="horizontal" />
			<div ref={loadMoreRef} className="h-1" />
			{!isPaused && hasNextPage && (
				<div className={loadingVariants({ isLoading: isLoading || isFetchingNextPage })}>
					<div className="absolute inset-0 bg-primary animate-loading-bar" />
				</div>
			)}
		</ScrollArea>
	);
}

export function InfinityTable<TData>(props: InfinityTableProps<TData>) {
	return (
		<Suspense
			fallback={
				<div
					style={{ height: props.heightTable }}
					className="w-full border rounded-lg flex items-center justify-center"
				>
					<p>Loading table...</p>
				</div>
			}
		>
			<InfinityTableContent {...props} />
		</Suspense>
	);
}
