"use client";
import type { SignupFormProps } from "@/domain/authentication/signup";
import { SignupPersonalDataForm } from "@/view/components/forms/signup/signup-personal-data-form";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { checkSignupDataOrRedirect } from "./check-missing-fields";

export function SignupPersonalDataPage() {
	const router = useRouter();
	const form = useFormContext<SignupFormProps>();
	const pathname = usePathname();
	const [token] = useQueryState("token", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const checkDataOrRedirect = useMemo(
		() => new checkSignupDataOrRedirect(pathname, form, router),
		[pathname, form, router],
	);
	useEffect(() => {
		async function checkOrRedirect() {
			await checkDataOrRedirect.execute();
		}
		checkOrRedirect();
	}, [checkDataOrRedirect]);
	return (
		<div className="flex flex-col gap-6 w-[320px] text-center">
			<h1 className="text-2xl font-bold">Dados pessoais</h1>
			<span className="text-muted-foreground text-center">Preencha os campos abaixo</span>
			<Separator orientation="horizontal" />
			<SignupPersonalDataForm />
			<div className="flex w-full gap-3">
				<Button
					type="button"
					className="w-full"
					variant="outline"
					onClick={() => router.push(`/signup/company?token=${token}`)}
				>
					Voltar
				</Button>
				<Button
					type="button"
					className="w-full"
					onClick={async () => {
						const isFirstNameValid = await form.trigger("firstName");
						const isLastNameValid = await form.trigger("lastName");
						const isPhoneValid = await form.trigger("phone");
						const isPositionValid = await form.trigger("positionId");

						if (!isFirstNameValid || !isLastNameValid || !isPhoneValid || !isPositionValid) return;

						router.push(`/signup/subscription-plans?token=${token}`);
					}}
				>
					Avançar
				</Button>
			</div>
		</div>
	);
}
