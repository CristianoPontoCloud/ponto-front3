"use client";
import { SigninForm } from "@/view/components/forms/signin/signin-form";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { useRouter } from "next/navigation";

interface SigninPageParams {
	svgLogo: string;
}

export function SigninPage({ svgLogo }: SigninPageParams) {
	const router = useRouter();
	return (
		<div className="flex flex-col items-center justify-center h-fit w-fit gap-6">
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
			<div dangerouslySetInnerHTML={{ __html: svgLogo }} />
			<h1 className="font-bold text-2xl">Bem-vindo!</h1>
			<p className="text-muted-foreground">Insira suas crendenciais abaixo para entrar</p>
			<Separator orientation="horizontal" />
			<SigninForm />
			<Separator orientation="horizontal" />
			<p>
				Ainda não é cliente?
				<Button
					variant="link"
					type="button"
					className="p-2"
					onClick={() => router.push("/signup/email-confirm")}
				>
					Cadastre-se
				</Button>
			</p>
		</div>
	);
}
