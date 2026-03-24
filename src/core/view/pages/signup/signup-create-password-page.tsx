"use client";
import { signupFacadeFactory } from "@/application/factories/enrollment/signup-facade-factory";
import { sysConfigFacadeFactory } from "@/application/factories/sys-config-facade-factory";
import type { SignupFormProps } from "@/domain/authentication/signup";
import { SignupCreatePasswordForm } from "@/view/components/forms/signup/signup-create-password-form";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { checkSignupDataOrRedirect } from "./check-missing-fields";

export function SignupCreatePasswordPage() {
	const router = useRouter();
	const [token] = useQueryState("token", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const form = useFormContext<SignupFormProps>();
	const singupFacade = useMemo(() => signupFacadeFactory(), []);
	const pathname = usePathname();
	const checkDataOrRedirect = useMemo(
		() => new checkSignupDataOrRedirect(pathname, form, router),
		[pathname, form, router],
	);
	async function onSubmit(props: SignupFormProps) {
		try {
			const response = await singupFacade.singup(props);
			const token = response?.data?.token ?? "";
			if (token === "") {
				throw new Error("invalid token");
			}
			await sysConfigFacadeFactory(token).loadAndSaveParameters();
			await signIn("credentials", {
				token,
				redirect: false,
			});
			router.push("/dashboard");
		} catch {
			toastError({
				tittle: "Erro ao cadastrar",
			});
		}
	}

	useEffect(() => {
		async function checkOrRedirect() {
			await checkDataOrRedirect.execute();
		}
		checkOrRedirect();
	}, [checkDataOrRedirect]);

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-col gap-6 w-[320px] text-center"
		>
			<h1 className="text-2xl font-bold">Crie uma senha</h1>
			<span className="text-muted-foreground text-center">
				Defina uma senha de acesso para a sua conta
			</span>
			<Separator orientation="horizontal" />
			<SignupCreatePasswordForm />
			<div className="flex w-full gap-3">
				<Button
					type="button"
					variant="outline"
					className="w-full"
					onClick={() => router.push(`/signup/subscription-plans?token=${token}`)}
					disabled={form.formState.isSubmitting}
				>
					Voltar
				</Button>
				<Button
					type="submit"
					className={"w-full"}
					// onClick={() => form.handleSubmit(onSubmit)()}
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? (
						<>
							Cadatrando...
							<LoaderCircle className="animate-spin" />
						</>
					) : (
						"Cadastrar"
					)}
				</Button>
			</div>
		</form>
	);
}
