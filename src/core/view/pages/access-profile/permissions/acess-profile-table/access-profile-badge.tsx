import { AccessLevelEnum } from "@/domain/entities/permission";
import { Badge } from "@/view/components/ui/badge";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

export function AccessProfileBadge({ permission }: { permission: AccessLevelEnum }) {
	const badgeVariants = tv({
		base: "px-2 py-1 text-xs",
		variants: {
			status: {
				[AccessLevelEnum.FULL_ACCESS]: "bg-lime-600/10 text-lime-600",
				[AccessLevelEnum.READ]: "bg-muted-foreground/10 text-muted-foreground",
				[AccessLevelEnum.DENIED]: "bg-red-600/10 text-red-600",
			},
		},
	});

	const badges: Record<AccessLevelEnum, ReactNode> = {
		[AccessLevelEnum.FULL_ACCESS]: (
			<Badge className={badgeVariants({ status: AccessLevelEnum.FULL_ACCESS })}>Acesso total</Badge>
		),
		[AccessLevelEnum.READ]: (
			<Badge className={badgeVariants({ status: AccessLevelEnum.READ })}>Somente leitura</Badge>
		),
		[AccessLevelEnum.WRITE]: (
			<Badge className={badgeVariants({ status: AccessLevelEnum.READ })}>Somente leitura</Badge>
		),
		[AccessLevelEnum.DENIED]: (
			<Badge className={badgeVariants({ status: AccessLevelEnum.DENIED })}>Sem acesso</Badge>
		),
	};
	return <div className="w-full flex justify-center">{badges[permission]}</div>;
}
