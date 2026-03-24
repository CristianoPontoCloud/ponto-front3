"use client";
import { signupSchema } from "@/application/validation/forms/signup-schema";
import type { SignupFormProps } from "@/domain/authentication/signup";
import type { ChildrenReactNode } from "@/domain/children";
import { decodeJWT } from "@/domain/global-helpers/decode-jwt";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
export default function LayoutRegister({ children }: ChildrenReactNode) {
	const router = useRouter();
	const form = useForm<SignupFormProps>({
		values: {
			cnpj: "",
			confirmPassword: "",
			companySize: "",
			email: "",
			fantasyName: "",
			phone: "",
			firstName: "",
			lastName: "",
			password: "",
			planId: "",
			positionId: "",
		},
		mode: "onSubmit",
		resolver: zodResolver(signupSchema),
	});
	const [token] = useQueryState("token", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	useEffect(() => {
		if (!token) return router.push("/signin");
		const decodedToken = decodeJWT<{ email: string }>(token);
		if (!decodedToken?.email) return router.push("/signin");
		form.setValue("email", decodedToken.email);
	}, [token, router, form]);
	return <FormProvider {...form}>{children}</FormProvider>;
}
