import type { UserRole } from "@/domain/entities/user-role";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";

interface UserRoleToasSuccessParams {
	response: UserRole;
}

export function UserRoleToasSuccess({ response }: UserRoleToasSuccessParams) {
	return (
		<div className="w-[311px] flex gap-3 relative">
			<Button
				type="button"
				variant="ghost"
				className="p-0 absolute right-[-10px] top-[-10px] hover:bg-transparent [&_svg]:size-[16px]"
				size="icon"
				onClick={() => toast.dismiss()}
			>
				<X />
			</Button>
			<div className="w-[32px] h-[32px] flex border rounded justify-center items-center">
				<ShieldCheck className="text-green-500" />
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col ">
					<p>Permissão alterada com sucesso</p>
					<span className="text-muted-foreground">{response?.user.email}</span>
				</div>
				<Badge className="px-2 py-1 bg-muted text-muted-foreground w-fit text-xs">
					{response?.role.name}
				</Badge>
			</div>
		</div>
	);
}
