import type { RolePermission } from "@/domain/entities/role-permission";
import type { UserRole } from "@/domain/entities/user-role";
import { ScrollArea, ScrollBar } from "@/view/components/ui/scroll-area";
import { ReactGrid } from "@silevis/reactgrid";
import type { UseQueryResult } from "@tanstack/react-query";
import { useRef } from "react";
import { useUsersRolesGrid } from "./use-users-roles-grid";

interface UsersRolesParams {
	height: number;
	rolesPermissionsQuery: UseQueryResult<RolePermission[], Error>;
	usersRolesQuery: UseQueryResult<UserRole[], Error>;
}

export function UsersRolesGrid({
	height,
	rolesPermissionsQuery,
	usersRolesQuery,
}: UsersRolesParams) {
	const divRef = useRef<HTMLDivElement | null>(null);
	const { columns, rows } = useUsersRolesGrid({
		divRef,
		rolesPermissionsQuery,
		usersRolesQuery,
	});
	return (
		<div className="w-full" ref={divRef}>
			<div className="w-full border rounded-lg grid grid-cols-2">
				<ScrollArea
					type="always"
					className="w-full h-full rounded-lg relative col-span-2"
					style={{ height }}
					scrollBarClassName="h-[calc(100%-36px)]"
					scrollBarStyle={{
						top: "38px",
					}}
				>
					<ReactGrid rows={rows} columns={columns} />
					<ScrollBar orientation="horizontal" style={{ bottom: "-12.5px" }} className="w-full" />
				</ScrollArea>
			</div>
		</div>
	);
}
