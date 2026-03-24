"use client";
import { SignupCompanyForm } from "@/view/components/forms/signup/signup-company-form";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { useRouter } from "next/navigation";

export function SignupCompanyPage() {
	const router = useRouter();
	return (
		<div className="flex flex-col gap-6 w-[320px] text-center">
			<h1 className="text-2xl font-bold">Cadastre sua empresa</h1>
			<span className="text-muted-foreground text-center">Preencha os campos abaixo</span>
			<Separator orientation="horizontal" />
			<SignupCompanyForm />
			<div className="flex items-center justify-center">
				<span className="text-muted-foreground">Já tem uma conta?</span>
				<Button variant="link" className="py-0 px-2" onClick={() => router.push("/signin")}>
					Entrar
				</Button>
			</div>
		</div>
	);
}
