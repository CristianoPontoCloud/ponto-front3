import { authorizeFacadeFactory } from "@/application/factories/authorize-facade-factory";
import { sysConfigFacadeFactory } from "@/application/factories/sys-config-facade-factory";
import type { CompanyGroup } from "@/domain/authentication/signin";
import { signIn } from "next-auth/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "../../buttons/loading-button";
import { CardCheckbox } from "../../card-checkbox/card-checkbox";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";

interface HeadquarterSigninParams {
	token: string;
	compayGroups: CompanyGroup[];
}
export function HeadquarterSignin({ compayGroups, token }: HeadquarterSigninParams) {
	const authorizeFacade = useMemo(() => authorizeFacadeFactory(token), [token]);
	const form = useForm<{ companyId: string }>({
		values: {
			companyId: "",
		},
		mode: "onSubmit",
	});
	async function onSubmit({ companyId }: { companyId: string }) {
		const response = (await authorizeFacade.selectCompany(companyId))?.data;
		if (!response?.accessToken) {
			throw new Error("invalid response");
		}
		const { accessToken } = response;
		const token = accessToken;
		await sysConfigFacadeFactory(token).loadAndSaveParameters();
		await signIn("credentials", {
			token,
			redirect: true,
			callbackUrl: "/dashboards",
		});
	}
	return (
		<div className="w-full flex flex-col gap-4">
			<ScrollArea className="h-[288px] rounded-md">
				<div className="flex flex-col gap-3 py-1">
					{compayGroups.map(({ headquarters: { companyId, companyName } }, index) => {
						return (
							<CardCheckbox
								title={companyName}
								checked={form.watch("companyId") === companyId}
								onClick={() => form.setValue("companyId", companyId)}
								key={index.toString()}
							/>
						);
					})}
				</div>
			</ScrollArea>
			<div className="flex justify-end gap-2">
				<Button variant="outline" type="button">
					Cancelar
				</Button>
				<LoadingButton
					type="button"
					isLoading={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
					onClick={() => form.handleSubmit(onSubmit)()}
				>
					Acessar
				</LoadingButton>
			</div>
		</div>
	);
}
