import { confirmationSmsCodeSchema } from "@/application/validation/forms/recovery-password";
import type { ConfirmationSmsCodeFormProps } from "@/domain/authentication/recovery-password";
import { Button } from "@/view/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/view/components/ui/input-otp";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/view/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
interface ConfirmationCodeSmsFormParams {
	seconds: number;
	resetTimer: VoidFunction;
	resetRecoveryPhoneForm: VoidFunction;
	phone: string;
	timeParsed: string;
}
export function ConfirmationCodeSmsForm({
	resetRecoveryPhoneForm,
	resetTimer,
	seconds,
	timeParsed,
	phone,
}: ConfirmationCodeSmsFormParams) {
	const router = useRouter();
	const form = useForm<ConfirmationSmsCodeFormProps>({
		values: { code: "" },
		resolver: zodResolver(confirmationSmsCodeSchema),
		mode: "onSubmit",
	});
	const code = form.watch("code");
	function setCode(code: string) {
		const parsedCode = code.replace(/[^0-9]/g, "");
		form.setValue("code", parsedCode);
	}
	async function onSubmit() {
		router.push("forget-password?token=aksdgakhsgdhasghdgas");
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full flex flex-col items-center gap-6"
			>
				<div className="w-[320px] flex flex-col justify-center items-center gap-6">
					<div className="bg-primary/15 w-[48px] h-[48px] rounded-lg flex justify-center items-center">
						<PhoneCall className="text-primary" />
					</div>
					<h1 className="text-2xl">Cheque seu telefone</h1>
					<span className="text-muted-foreground text-center">
						Informe abaixo o código enviado via SMS
						<br />
						<span className="text-muted-foreground text-center font-semibold">{phone}</span>
					</span>
					<Separator orientation="horizontal" />
					<InputOTP maxLength={6} value={code} onChange={(code) => setCode(code)}>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
					<Button type="submit" className="w-full" disabled={code?.length < 6}>
						Avançar
					</Button>
					<Separator orientation="horizontal" />
					<span className="text-muted-foreground text-center">
						Ainda não recebeu o código de recuperação?
					</span>
					<div className="flex gap-2">
						<Button
							variant="link"
							className="p-0"
							type="button"
							onClick={() => resetRecoveryPhoneForm()}
						>
							Atualizar e-mail
						</Button>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="link"
										className="p-0 min-w-[105px]"
										type="button"
										disabled={seconds > 0}
										onClick={() => resetTimer()}
									>
										Reenviar
									</Button>
								</TooltipTrigger>
								<TooltipContent>{timeParsed}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<Separator orientation="horizontal" />
					<div>
						Precisando de ajuda?{" "}
						<Button className="underline text-primary p-0" variant="link" type="button">
							Fale com o suporte
						</Button>
					</div>
				</div>
			</form>
		</FormProvider>
	);
}
