import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { LockOpen } from "lucide-react";
import type { ReactNode } from "react";

interface ForgetPasswordLayoutParams {
	children: ReactNode;
	description: string;
}

export function ForgetPasswordLayout({ children, description }: ForgetPasswordLayoutParams) {
	return (
		<div className="w-[320px] flex flex-col justify-center items-center gap-6">
			<div className="bg-primary/15 w-[48px] h-[48px] rounded-lg flex justify-center items-center">
				<LockOpen className="text-primary" />
			</div>
			<h1 className="text-2xl">Esqueci a senha</h1>
			<span className="text-muted-foreground text-center">{description}</span>
			<Separator orientation="horizontal" />
			{children}
			<Separator orientation="horizontal" />
			<div>
				Precisando de ajuda?{" "}
				<Button className="underline text-primary p-0" variant="link">
					Fale com o suporte
				</Button>
			</div>
		</div>
	);
}
