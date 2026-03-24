import type { PunchFormProps, PunchType } from "@/domain/entities/punch";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/view/components/ui/input-otp";
import { Tabs, TabsList, TabsTrigger } from "@/view/components/ui/tabs";
import { ScanFace } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface PunchClockTypeTabs {
	form: UseFormReturn<PunchFormProps>;
	pin: string;
	onPinValueChange: (newValue: string) => void;
	type: PunchType;
	onTabChange: (value: PunchType) => void;
}

function TypeSimpleContent() {
	return (
		<>
			<ScanFace className="text-muted-foreground h-[40px] w-[40px]" id="" />
			<p className="text-muted-foreground w-[240px] text-center">
				Clique no botão `&quot;`Registrar ponto`&quot;` para confirmar a marcação
			</p>
		</>
	);
}

export function PunchClockTypeTabs({
	form,
	onPinValueChange,
	pin,
	type,
	onTabChange,
}: PunchClockTypeTabs) {
	function TypePinContent() {
		return (
			<>
				<InputOTP maxLength={6} value={pin} autoFocus onChange={(code) => onPinValueChange(code)}>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
				<p>Insira o PIN</p>
			</>
		);
	}

	if (form.formState.isSubmitSuccessful) return <></>;
	return (
		<>
			<Tabs
				defaultValue={type}
				onValueChange={(e) => onTabChange(e as "simple" | "PIN")}
				data-testid="tabs"
				className="w-full"
				id="tabs-type"
			>
				<TabsList className="w-full">
					<TabsTrigger value={"simple"} className="w-full" type="button" id="simple-option">
						Simples
					</TabsTrigger>
					<TabsTrigger value={"PIN"} className="w-full" type="button" id="pin-option">
						PIN
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<div
				id="type-container"
				className="rounded-md bg-muted-foreground/5 w-full h-[280px] flex flex-col items-center justify-center gap-2 border border-dashed border-sidebar-accent-foreground/20"
			>
				{type === "PIN" ? <TypePinContent /> : <TypeSimpleContent />}
			</div>
		</>
	);
}
