"use client";
import type { SignupFormProps } from "@/domain/authentication/signup";
import { SignupSubscriptionPlansForm } from "@/view/components/forms/signup/signup-subscription-plans-form";
import { Button } from "@/view/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { checkSignupDataOrRedirect } from "./check-missing-fields";

export function SignupSubscriptionPlansPage() {
	const router = useRouter();
	const form = useFormContext<SignupFormProps>();
	const [token] = useQueryState("token", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const pathname = usePathname();
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
		<div className="flex flex-col gap-6 w-[812px] text-center">
			<h1 className="text-2xl font-bold">Selecione um plano</h1>
			<span className="text-muted-foreground text-center">
				Temos um plano perfeito para a sua empresa
			</span>
			<SignupSubscriptionPlansForm />
			<div className="flex w-full gap-3 justify-center">
				<Button
					type="button"
					variant="outline"
					className="w-[154px]"
					onClick={() => router.push(`/signup/personal-data?token=${token}`)}
				>
					Voltar
				</Button>
				<Button
					type="button"
					className="w-[154px]"
					onClick={async () => {
						const isPlanId = await form.trigger("planId");

						if (!isPlanId) return;

						router.push(`/signup/create-password?token=${token}`);
					}}
				>
					Avançar
				</Button>
			</div>
		</div>
	);
}
