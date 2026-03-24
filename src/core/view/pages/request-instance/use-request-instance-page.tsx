import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { requestInstanceSchema } from "@/application/validation/forms/request-instance-schema";
import type {
	RequestInstance,
	RequestInstanceDetails,
} from "@/domain/entities/request-instance/request-instance";
import { getRequestInstanceStatus } from "@/domain/entities/request-instance/request-instance-status";
import { getRequestInstaceType } from "@/domain/entities/request-instance/request-instance-type";
import { ViewTypeEnum } from "@/domain/view-type";
import { RequestInstanceStatusViewer } from "@/view/components/entities/request-instance/request-instance-status-viewer";
import { generateStatusColumn } from "@/view/components/inifity-table/generate-status-column";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { requestInstanceInitialFormValues } from "./request-instance-initial-values";
import { RequestInstancePageOption } from "./request-instance-page-options";

export function useRequestInstancePage() {
	const [formValues, setFormValues] = useState<RequestInstance | RequestInstanceDetails>(
		requestInstanceInitialFormValues,
	);
	const form = useForm<RequestInstance | RequestInstanceDetails>({
		values: formValues,
		resolver: zodResolver(requestInstanceSchema),
		mode: "onSubmit",
	});
	const { open, setOpen } = useSheet();
	function formateDateMessage(date: string, time: string) {
		const currentDate = new Date(date);
		const formatedDate = format(currentDate, "dd/MM/yyyy");
		return `${formatedDate} às ${time}`;
	}
	const [viewtype] = useQueryState("viewtype", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});

	const collaboratorColumn: ColumnDef<RequestInstanceDetails>[] =
		viewtype === ViewTypeEnum.COMPANY
			? [
					{
						accessorKey: "collaborator",
						header: () => {
							return <div>Collabortor</div>;
						},
						cell: ({ row }) => {
							const { name, surname } = row.original.collaborator;
							return <div>{`${name}${surname}`}</div>;
						},
					},
				]
			: [];
	const columns: ColumnDef<RequestInstanceDetails>[] = [
		...collaboratorColumn,
		{
			accessorKey: "type",
			header: () => {
				return <div>Tipo</div>;
			},
			cell: ({ row }) => <div>{getRequestInstaceType(row.original.type).label}</div>,
		},
		{
			accessorKey: "name",
			header: () => <div>Nome</div>,
			size: 1,
			cell: ({ row }) => {
				return <div>{row.original.request.name}</div>;
			},
		},
		{
			accessorKey: "date",
			header: () => <div>Data</div>,
			size: 1,
			cell: ({ row }) => {
				const { startDate, startTime } = row.original;
				return <div>{formateDateMessage(startDate as string, startTime as string)}</div>;
			},
		},
		generateStatusColumn<RequestInstanceDetails>({
			classNames: {
				cell: "justify-between",
				header: "justify-start",
			},
			CustomOption: ({ row }) => (
				<RequestInstancePageOption requestInstance={row.original} setFormValues={setFormValues} />
			),
			CustomStatusViewer: ({ row }) => (
				<RequestInstanceStatusViewer status={getRequestInstanceStatus(row.original.status)} />
				// <>teste</>
			),
		}),
	];
	function closeSheet() {
		setFormValues(requestInstanceInitialFormValues);
		setOpen(false);
	}
	useEffect(() => {
		if (open) return;
		setFormValues(requestInstanceInitialFormValues);
		form.reset();
	}, [open, form]);
	return {
		columns,
		closeSheet,
		form,
	};
}
