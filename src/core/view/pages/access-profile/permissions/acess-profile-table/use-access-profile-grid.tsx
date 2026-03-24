import type { RolePermission } from "@/domain/entities/role-permission";
import type { UserRole } from "@/domain/entities/user-role";
import type { CellStyle, Column, DefaultCellTypes, Row } from "@silevis/reactgrid";
import type { UseQueryResult } from "@tanstack/react-query";
import type { MutableRefObject } from "react";
import { AccessProfileBadge } from "./access-profile-badge";
import { accessProfilesMockRoles } from "./access-profile-mock";

interface useAccessProfileGridParams {
	divRef: MutableRefObject<HTMLDivElement | null>;
	rolesPermissionsQuery: UseQueryResult<RolePermission[], Error>;
	usersRolesQuery: UseQueryResult<UserRole[], Error>;
}

export function useAccessProfileGrid({ divRef }: useAccessProfileGridParams) {
	const offsetWidthRef = divRef.current?.offsetWidth ?? 0;

	const getColumns = (): Column[] => {
		// const columns = rolesPermissions?.length ?? 2;
		const permissionWidth: number = (offsetWidthRef * 0.41) / 4;
		const nameWidth = offsetWidthRef * 0.59 - 1.5;

		// const dinyamicColumns = rolesPermissions.map((RolePermission) => {
		// 	return { columnId: RolePermission.role.name, width: permissionWidth };
		// });
		return [
			{ columnId: "Nome", width: nameWidth },
			{ columnId: "Super admin", width: permissionWidth },
			{ columnId: "Administrador", width: permissionWidth },
			{ columnId: "Supervisor", width: permissionWidth },
			{ columnId: "Colaborador", width: permissionWidth },
		];
	};
	const headerRow = (): Row => {
		const borderLeftNone: CellStyle = { border: { right: { width: "0px" } } };
		// const dynamicHeaders: DefaultCellTypes[] = rolesPermissions?.map((RolePermission, index) => {
		// 	return {
		// 		type: "header",
		// 		text: RolePermission.role.name,
		// 		className: "header-bg-backgorund header-px-2",
		// 		style: rolesPermissions.length === index ? borderLeftNone : undefined,
		// 	};
		// });
		return {
			rowId: "header",
			height: 40,
			cells: [
				{
					type: "header",
					text: "Nome",
					className: "header-start header-bg-backgorund header-px-2",
				},
				{ type: "header", text: "Super admin", className: "header-bg-backgorund header-px-2" },
				{ type: "header", text: "Administrador", className: "header-bg-backgorund header-px-2" },
				{ type: "header", text: "Supervisor", className: "header-bg-backgorund header-px-2" },
				{
					type: "header",
					text: "Colaborador",
					className: "header-bg-backgorund",
					style: borderLeftNone,
				},
			],
		};
	};

	const getRows = (): Row<DefaultCellTypes>[] => [
		headerRow(),
		...accessProfilesMockRoles.map((value, index): Row<DefaultCellTypes> => {
			const lastItemStyle = (removeRightBorder: boolean): CellStyle => ({
				border: {
					right: {
						width: removeRightBorder ? "0px" : "",
					},
				},
			});
			const { administrator, collaborator, name, superAdmin, supervisor } = value;

			return {
				rowId: index,
				height: 48,
				cells: [
					{
						type: "text",
						text: "",
						nonEditable: true,
						style: lastItemStyle(false),
						renderer: () => <div className="px-2">{name}</div>,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(false),
						nonEditable: true,
						renderer: () => <AccessProfileBadge permission={superAdmin} />,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(false),
						nonEditable: true,
						renderer: () => <AccessProfileBadge permission={administrator} />,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(false),
						nonEditable: true,
						renderer: () => <AccessProfileBadge permission={supervisor} />,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(true),
						nonEditable: true,
						renderer: () => <AccessProfileBadge permission={collaborator} />,
					},
				],
			};
		}),
	];

	const rows = getRows();
	const columns = getColumns();
	return {
		rows,
		columns,
	};
}
