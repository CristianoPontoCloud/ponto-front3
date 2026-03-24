import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface SignupEmailConfirmLayoutParams {
	children: ReactNode;
	header: ReactNode;
}

export function SignupEmailConfirmLayout({ children, header }: SignupEmailConfirmLayoutParams) {
	const router = useRouter();
	return (
		<div className="flex flex-col gap-6 w-[320px] text-center">
			{header}
			<Separator orientation="horizontal" />
			{children}
			<Separator orientation="horizontal" />
			<div className="flex items-center flex-wrap justify-center text-muted-foreground">
				<span className="text-xs">Este site é protegido por reCAPTCHA e a</span>
				<Button variant="link" className="px-1 py-0">
					Política de Privacidade
				</Button>
				<span className="text-xs">e os </span>
				<Button variant="link" className="px-1 py-0">
					Termos de Serviço
				</Button>
				<span className="text-xs">do Google se aplicam.</span>
			</div>
			<div className="flex items-center justify-center">
				<span className="text-muted-foreground">Já tem uma conta?</span>
				<Button variant="link" className="py-0 px-2" onClick={() => router.push("/signin")}>
					Entrar
				</Button>
			</div>
		</div>
	);
}
