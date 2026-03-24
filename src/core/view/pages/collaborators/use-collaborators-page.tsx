import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { useSysConfigStore } from "@/application/providers/sys-config/use-sys-config";
import { collaboratorSchema } from "@/application/validation/forms/collaborators/collaborator-schema";
import type {
	Collaborator,
	CollaboratorFormProps,
} from "@/domain/entities/collaborator/collaborator";
import { getCollaboratorStatus } from "@/domain/entities/collaborator/collaborator-status";
import type { DepartmentDetails } from "@/domain/entities/department";
import type { PositionDetails } from "@/domain/entities/positions";
import { CollaboratorStatusViewer } from "@/view/components/entities/collaborator/collaborator-status-viewer";
import { generateStatusColumn } from "@/view/components/inifity-table/generate-status-column";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { CollaboratorCell } from "../../components/entities/collaborator/collaborator-cell";
import { collaboratorInitialFormValues } from "./collaborator-initial-values";
import { CollaboratorPageOption } from "./collaborator-page-options";

export function useCollaboratorsPage() {
	const user = useSession().data?.user;
	const userId = user?.id;
	const companyId = user?.companyId ?? "";
	// const companyList = useMemo(() => user?.companyGroups ?? [], [user?.companyGroups]);
	const { load } = useSysConfigStore();
	const cltYes = "1";
	const initialFormValues: CollaboratorFormProps = useMemo(
		() => ({
			...collaboratorInitialFormValues,
			company: companyId,
			clt: cltYes,
		}),
		[companyId],
	);
	const [formValues, setFormValues] = useState<CollaboratorFormProps>(initialFormValues);
	const form = useForm({
		values: formValues,
		resolver: zodResolver(collaboratorSchema),
		mode: "onSubmit",
	});
	const { open, setOpen } = useSheet();
	function closeSheet() {
		setFormValues(initialFormValues);
		setOpen(false);
	}

	const columns: ColumnDef<Collaborator>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => (
				<CollaboratorCell
					name={row.getValue("name")}
					src={row.original.imageUrl}
					status={row.original.status}
				/>
			),
		},
		{
			accessorKey: "department",
			header: () => <div>Departamento</div>,
			cell: ({ row }) => {
				return (
					<div className="font-medium">
						{row.getValue<DepartmentDetails | null>("department")?.name ?? "Não atribuído"}
					</div>
				);
			},
		},
		{
			accessorKey: "position",
			header: () => <div>Cargo</div>,
			size: 1,
			cell: ({ row }) => {
				return (
					<div className="font-medium">
						{row.getValue<PositionDetails | null>("position")?.name ?? "Não atribuído"}
					</div>
				);
			},
		},
		generateStatusColumn<Collaborator>({
			CustomStatusViewer: ({ cell }) => (
				<CollaboratorStatusViewer status={getCollaboratorStatus(cell.row.original.status)} />
			),
			CustomOption: ({ cell }) => (
				<CollaboratorPageOption collaborator={cell.row.original} setFormValues={setFormValues} />
			),
		}),
	];

	useEffect(() => {
		if (open) return;
		setFormValues(initialFormValues);
		form.reset();
	}, [open, form, initialFormValues]);

	useEffect(() => {
		if (userId) {
			load(userId);
		}
	}, [load, userId]);
	return {
		formValues,
		columns,
		closeSheet,
		form,
	};
}
