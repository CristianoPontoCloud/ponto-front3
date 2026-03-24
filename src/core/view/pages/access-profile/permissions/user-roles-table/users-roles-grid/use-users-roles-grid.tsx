import type { RolePermission } from "@/domain/entities/role-permission";
import type { UserRole, UserRoleIds } from "@/domain/entities/user-role";
import type { CellStyle, Column, DefaultCellTypes, Row } from "@silevis/reactgrid";
import type { UseQueryResult } from "@tanstack/react-query";
import type { MutableRefObject } from "react";
import { useForm } from "react-hook-form";
import { UserRoleHandlerButton } from "../user-role-handler-button/user-role-handler-button";
import { UserRoleViewer } from "./user-role-viewer";

interface useAccessProfileGridParams {
	rolesPermissionsQuery: UseQueryResult<RolePermission[], Error>;
	usersRolesQuery: UseQueryResult<UserRole[], Error>;
	divRef: MutableRefObject<HTMLDivElement | null>;
}

export function useUsersRolesGrid({
	divRef,
	rolesPermissionsQuery,
	usersRolesQuery,
}: useAccessProfileGridParams) {
	const form = useForm<UserRoleIds>({
		values: {
			roleId: "",
			userId: "",
		},
		mode: "onSubmit",
	});

	const offsetWidthRef = divRef.current?.offsetWidth ?? 0;
	const rolesPermissions = rolesPermissionsQuery?.data ?? [];
	const usersRoles = usersRolesQuery?.data ?? [];
	const getColumns = (): Column[] => {
		const columns = rolesPermissions?.length ?? 2;
		const PermissionWidth: number = (offsetWidthRef * 0.41) / columns;
		const nameWidth = offsetWidthRef * 0.59 - 1.5;

		const dinyamicColumns = rolesPermissions.map((RolePermission) => {
			return { columnId: RolePermission.role.name, width: PermissionWidth };
		});
		return [{ columnId: "Nome", width: nameWidth }, ...dinyamicColumns];
	};
	const headerRow = (): Row => {
		const borderLeftNone: CellStyle = { border: { right: { width: "0px" } } };
		const dynamicHeaders: DefaultCellTypes[] = rolesPermissions?.map((RolePermission, index) => {
			return {
				type: "header",
				text: RolePermission.role.name,
				className: "header-bg-backgorund header-px-2",
				style: rolesPermissions.length === index ? borderLeftNone : undefined,
			};
		});
		return {
			rowId: "header",
			height: 40,
			cells: [
				{
					type: "header",
					text: "Nome",
					className: "header-start header-bg-backgorund header-px-2",
				},
				...dynamicHeaders,
			],
		};
	};

	const getRows = (usersRoles: UserRole[]): Row<DefaultCellTypes>[] => [
		headerRow(),
		...usersRoles.map((userRole, index): Row<DefaultCellTypes> => {
			const { userId } = userRole;
			const currentRoleId = userRole.roleId;
			const lastItemStyle = (removeRightBorder: boolean): CellStyle => ({
				border: {
					right: {
						width: removeRightBorder ? "0px" : "",
					},
				},
			});
			const dinamycCells = rolesPermissions?.map(({ role }): DefaultCellTypes => {
				const roleId = role.id;
				return {
					type: "text",
					text: "",
					style: lastItemStyle(false),
					nonEditable: true,
					renderer: () => (
						<UserRoleHandlerButton
							usersRolesQuery={usersRolesQuery}
							currentRoleId={currentRoleId}
							paramsToChangeUserRole={{ roleId, userId }}
							form={form}
						/>
					),
				};
			});
			return {
				rowId: index,
				height: 48,
				cells: [
					{
						type: "text",
						text: "",
						nonEditable: true,
						style: lastItemStyle(false),
						renderer: () => <UserRoleViewer userRole={userRole} />,
					},
					...dinamycCells,
				],
			};
		}),
	];

	const rows = getRows(usersRoles);
	const columns = getColumns();

	return {
		rows,
		columns,
	};
}
