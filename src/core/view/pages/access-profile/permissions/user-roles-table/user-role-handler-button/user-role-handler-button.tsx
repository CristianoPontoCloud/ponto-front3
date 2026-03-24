import { userRoleFacadeFactory } from "@/application/factories/user-role-facade-factory";
import type { UserRole, UserRoleIds } from "@/domain/entities/user-role";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import type { UseQueryResult } from "@tanstack/react-query";
import { CheckCircle2, Circle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { tv } from "tailwind-variants";
import { UserRoleToasSuccess } from "./user-role-toast-success";
interface UserPermissionHandlerButtonParams {
	paramsToChangeUserRole: UserRoleIds;
	currentRoleId: string;
	usersRolesQuery: UseQueryResult<UserRole[], Error>;
	form: UseFormReturn<UserRoleIds>;
}
export function UserRoleHandlerButton({
	paramsToChangeUserRole,
	currentRoleId,
	form,
	usersRolesQuery,
	// formRef,
}: UserPermissionHandlerButtonParams) {
	const roleIdsIsSame = currentRoleId === paramsToChangeUserRole.roleId;
	const buttonDisabler = roleIdsIsSame || form.formState.isSubmitting;
	const token = useSession().data?.user.token ?? "";
	const userRoleFacade = useMemo(() => userRoleFacadeFactory(token), [token]);
	async function onSubmit() {
		if (buttonDisabler) return;
		form.setValue("roleId", paramsToChangeUserRole.roleId);
		form.setValue("userId", paramsToChangeUserRole.userId);
		const data = form.watch();
		try {
			const response = await userRoleFacade.update(data);
			if (response === null) {
				throw new Error("Falha ao alterar permissão");
			}
			usersRolesQuery.refetch();
			form.reset({ roleId: "", userId: "" });
			toastCustom({
				Component: <UserRoleToasSuccess response={response} />,
			});
		} catch (e) {
			toastError({
				tittle: `${e}`,
			});
		}
	}
	const buttonVariant = tv({
		base: "w-full flex justify-center p-0 hover:bg-transparent [&_svg]:size-[20px]",
		variants: {
			roleIdsIsSame: {
				true: "cursor-not-allowed",
				false: "cursor-pointer",
			},
		},
	});
	return (
		<form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
			<Button
				className={buttonVariant({ roleIdsIsSame })}
				variant="ghost"
				size="icon"
				type="submit"
				disabled={form.formState.isSubmitting}
			>
				{!roleIdsIsSame && <Circle className="text-border" />}
				{roleIdsIsSame && <CheckCircle2 className="text-primary" />}
			</Button>
		</form>
	);
}
