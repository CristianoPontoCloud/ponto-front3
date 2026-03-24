"use client";
import { authorizeFacadeFactory } from "@/application/factories/authorize-facade-factory";
import { sysConfigFacadeFactory } from "@/application/factories/sys-config-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { signinSchema } from "@/application/validation/forms/signin-schema";
import type { SigninFormProps } from "@/domain/authentication/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toastController } from "../../toaster/toast-controller";
import { HeadquarterSignin } from "./change-company-signin";
export function useSigninForm() {
	const router = useRouter();
	const form = useForm<SigninFormProps>({
		mode: "onSubmit",
		resolver: zodResolver(signinSchema),
	});
	const { setModalAndOpen, open } = useModal();
	const authorizeFacade = useMemo(() => authorizeFacadeFactory(), []);

	async function onSubmit({ password, stayConnected, identifier }: SigninFormProps) {
		try {
			const response = await authorizeFacade.login({ password, stayConnected, identifier });
			const loginResponse = response?.data;
			if (!loginResponse?.accessToken) {
				throw new Error("invalid response");
			}
			if (loginResponse.requiresCompanySelection) {
				setModalAndOpen({
					title: "Empresa",
					description: "Selecione a empresa que deseja acessar abaixo",
					classNames: {
						content: "max-h-[448px] w-[369px] !important",
					},
					content: (
						<HeadquarterSignin
							compayGroups={loginResponse.companyGroups}
							token={loginResponse.accessToken}
						/>
					),
				});
				return;
			}
			const { accessToken } = loginResponse;
			const headQuarterId = response?.data?.company.id ?? "";
			const metadata = await authorizeFacadeFactory(accessToken).selectCompany(headQuarterId);
			const sessionToken = metadata?.data?.accessToken ?? "";
			await sysConfigFacadeFactory(sessionToken).loadAndSaveParameters();
			await signIn("credentials", {
				token: sessionToken,
				redirect: true,
				callbackUrl: "/dashboards",
			});
		} catch (error) {
			toastController.error({
				tittle: "Credenciais ínválidas",
				description: "Verifique sua identificação e senha e tente novamente",
				position: "bottom-center",
				className: "left-[21.5vw] important w-[291px]",
				action: {
					label: "Ok",
					onClick: () => { },
				},
			});
			throw error;
		}
	}
	function navigateToForgetPasswordPage() {
		router.push("/forget-password");
	}
	useEffect(() => {
		if (!open) {
			const values = form.watch();
			form.reset(values);
		}
	}, [form, open]);
	return {
		form,
		onSubmit,
		navigateToForgetPasswordPage,
	};
}
