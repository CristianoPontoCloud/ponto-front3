"use client";
import { RolePermissionFacadeFactory } from "@/application/factories/role-permission-facade-factory";
import { userRoleFacadeFactory } from "@/application/factories/user-role-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { SheetOverSheetContentControllerProvider } from "@/application/providers/sheet-over-sheet-content/sheet-over-sheet-component-provider";
import { RoleSettingViewEnum, RoleSettingViewOptions } from "@/domain/entities/role-permission";
import DataManager from "@/view/components/data-manager/data-manager";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import { useMemo, useRef } from "react";
import { AccessProfileTable } from "./acess-profile-table/access-profile-table";
import { UsersRolesGrid } from "./user-roles-table/users-roles-grid/users-roles-grid";

export function PermissionsPage() {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef) - 33;
	const [view] = useQueryState("view", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const token = useSession().data?.user.token ?? "";
	const rolePermissionFacade = useMemo(() => RolePermissionFacadeFactory(token), [token]);
	const userRoleFacade = useMemo(() => userRoleFacadeFactory(token), [token]);
	const rolesPermissionsQuery = useQuery({
		queryKey: ["user-Permission"],
		queryFn: async () => {
			return await rolePermissionFacade.findAll();
		},
		enabled: !!token,
		retry: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		staleTime: Number.POSITIVE_INFINITY,
	});

	const usersRolesQuery = useQuery({
		queryKey: ["user-role"],
		queryFn: async () => {
			return await userRoleFacade.findAll();
		},
		enabled: !!token,
		retry: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		staleTime: Number.POSITIVE_INFINITY,
	});
	return (
		<SheetOverSheetContentControllerProvider>
			<div className="flex flex-col py-4">
				<div className="flex justify-between items-center" ref={headerRef}>
					<h1 className="text-xl font-semibold w-48">Perfis de acesso</h1>
					<DataManager
						filterParams={{
							customFilters: RoleSettingViewOptions,
							customFieldName: "view",
						}}
						renderingSearch
					/>
				</div>
			</div>
			{view === RoleSettingViewEnum.ASSIGNMENTS ? (
				<UsersRolesGrid
					height={height}
					rolesPermissionsQuery={rolesPermissionsQuery}
					usersRolesQuery={usersRolesQuery}
				/>
			) : (
				<AccessProfileTable
					height={height}
					rolesPermissionsQuery={rolesPermissionsQuery}
					usersRolesQuery={usersRolesQuery}
				/>
			)}
		</SheetOverSheetContentControllerProvider>
	);
}
