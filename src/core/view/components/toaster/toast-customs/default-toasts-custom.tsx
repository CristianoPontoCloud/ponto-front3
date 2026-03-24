import { X } from "lucide-react";
import type { ReactElement } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { dateSubmited } from "../date-submited";

interface DefaultToastsCustomParams {
	entity: string;
	pronoun?: "male" | "female";
}
interface StatusToastsCustomParams extends DefaultToastsCustomParams {
	statusActive: string;
	currentStatus: string;
}
function captalized(entity: string): string {
	return entity.charAt(0).toUpperCase() + entity.slice(1);
}
function TemplateToast({ message }: { message: string }) {
	return (
		<div className="flex flex-col gap-1 w-fit">
			<span className="truncate">{message}</span>
			<span className="text-muted-foreground truncate">{dateSubmited()}</span>
		</div>
	);
}

function SaveToastsCustom({ entity, pronoun = "male" }: DefaultToastsCustomParams) {
	const wordPronoun = {
		male: "cadastrado",
		female: "cadastrada",
	};
	return <TemplateToast message={`${captalized(entity)} ${wordPronoun[pronoun]} com sucesso!`} />;
}
function EditToastsCustom({ entity, pronoun = "male" }: DefaultToastsCustomParams) {
	const wordPronoun = {
		male: "alterado",
		female: "alterada",
	};
	return <TemplateToast message={`${captalized(entity)} ${wordPronoun[pronoun]} com sucesso!`} />;
}
function ExcludeToastsCustom({ entity, pronoun = "male" }: DefaultToastsCustomParams) {
	const wordPronoun = {
		male: "excluído",
		female: "excluída",
	};
	return <TemplateToast message={`${captalized(entity)} ${wordPronoun[pronoun]} com sucesso!`} />;
}
export function StatusChangedToastsCustom({
	entity,
	pronoun = "male",
	currentStatus,
	statusActive,
}: StatusToastsCustomParams) {
	const wordsPronoun = {
		active: {
			male: "ativado",
			female: "ativada",
		},
		inative: {
			male: "inativado",
			female: "inativada",
		},
	};
	const status = currentStatus === statusActive ? "inative" : "active";
	return (
		<TemplateToast
			message={`${captalized(entity)} ${wordsPronoun[status][pronoun]} com sucesso!`}
		/>
	);
}

function ToastWithIcon({
	description,
	title,
	icon,
}: {
	title: string;
	description: string;
	icon: ReactElement;
}) {
	return (
		<div className="w-[253px] flex gap-3 relative">
			<Button
				variant="ghost"
				type="button"
				className="p-0 w-fit h-fit hover:bg-transparent absolute right-[-4px] top-[-7px]"
				onClick={() => {
					toast.dismiss();
				}}
			>
				<X className="w-[16px] h-[16px]" />
			</Button>
			<div className="w-[32px] h-[32px] flex items-center justify-center border rounded-md">
				{icon}
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-[4px]">
					<span className="test-xs text-foreground">{title}</span>
					<span className="test-xs text-muted-foreground">{description}</span>
				</div>
				<Button
					variant="ghost"
					type="button"
					className="p-0 w-fit h-fit hover:bg-transparent"
					onClick={() => {
						toast.dismiss();
					}}
				>
					Desfazer
				</Button>
			</div>
		</div>
	);
}

export function useToastCustomDefaults() {
	return {
		Save: SaveToastsCustom,
		Edit: EditToastsCustom,
		Exclude: ExcludeToastsCustom,
		StatusChanged: StatusChangedToastsCustom,
		WithIcon: ToastWithIcon,
	};
}
