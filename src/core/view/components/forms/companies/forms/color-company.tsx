import { useTopOffset } from "@/application/hooks/use-top-off-set";
import type { CompanyFormProps } from "@/domain/entities/companies";
import { Button } from "@/view/components/ui/button";
import { DashedSeparator } from "@/view/components/ui/dashed-separator";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";
import type colors from "tailwindcss/colors";

type TailwindColorKeys = keyof typeof colors;

export function ColorCompany() {
	const form = useFormContext<CompanyFormProps>();
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	const color = form.watch("color");
	const buttonColorVariant = tv({
		base: "w-[36px] h-[36px] flex justify-center items-center p-0",
		variants: {
			isSelectd: {
				true: "border-muted-foreground ",
			},
		},
	});
	function ButtonColor({ colorKey }: { colorKey: TailwindColorKeys }) {
		const bgColor = colorKey === "zinc" ? `bg-${colorKey}-950` : `bg-${colorKey}-500`;
		return (
			<Button
				variant="outline"
				type="button"
				className={buttonColorVariant({ isSelectd: colorKey === color })}
				onClick={() => form.setValue("color", colorKey)}
			>
				<span className={`w-[20px] h-[20px] border rounded-sm ${bgColor}`} />
			</Button>
		);
	}
	const colors: Array<TailwindColorKeys> = [
		"zinc",
		"slate",
		"neutral",
		"stone",
		"stone",
		"orange",
		"amber",
		"yellow",
		"lime",
		"green",
		"emerald",
		"teal",
		"sky",
		"blue",
		"indigo",
		"violet",
		"fuchsia",
		"pink",
		"rose",
		"red",
	];
	return (
		<ScrollArea
			className="w-full p-1 mr-2"
			data-testid="form-company-registration"
			ref={ref}
			style={{ height: height - 60 }}
			tabIndex={-1}
		>
			<div className="h-full flex flex-col gap-6">
				<div className="flex flex-col gap-[16px] text-muted-foreground">
					<span>Cor da marca</span>
					<span>Selecione ou personalize com a cor da sua marca</span>
				</div>
				<DashedSeparator />
				<div className="flex flex-wrap gap-[8px]">
					{/* precisa do span para que a concatenação da cor com bg-${color}-500 funcione normalmente */}
					<span className="hidden bg-slate-500 bg-neutral-500 bg-stone-500 bg-orange-500 bg-amber-500 bg-yellow-500 bg-lime-500 bg-green-500 bg-emerald-500 bg-teal-500 bg-sky-500 bg-blue-500 bg-indigo-500 bg-violet-500 bg-fuchsia-500 bg-pink-500 bg-rose-500 bg-red-500" />
					{colors.map((colorKey) => (
						<ButtonColor colorKey={colorKey} key={colorKey} />
					))}
				</div>
				<DashedSeparator />
				<div className="w-fit h-fit flex gap-2 py-[6px] px-[11px] border rounded-md">
					<span
						className={`w-[20px] h-[20px] border rounded-sm bg-${color}-${color === "zinc" ? "950" : "500"}`}
					/>
					<span>{color}</span>
				</div>
			</div>
		</ScrollArea>
	);
}
