import { Check } from "lucide-react";
import { type ReactNode, useRef } from "react";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";

export interface CardCheckboxParams {
	checked: boolean;
	title: string;
	description?: string;
	onClick: VoidFunction;
	children?: ReactNode;
	className?: string;
	clasNameButton?: string;
	gradientElement?: ReactNode;
	floatElement?: {
		position:
			| "top-left"
			| "top-center"
			| "top-right"
			| "middle-left"
			| "middle-center"
			| "middle-right"
			| "bottom-left"
			| "bottom-center"
			| "bottom-right";
		component: ReactNode;
	};
}
export const cardCheckboxFloatPositions = {
	"top-left": "top-4 left-4",
	"top-center": "top-4 left-1/2 -translate-x-1/2",
	"top-right": "top-4 right-4",
	"middle-left": "top-1/2 left-4 -translate-y-1/2",
	"middle-center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
	"middle-right": "top-1/2 right-4 -translate-y-1/2",
	"bottom-left": "bottom-4 left-4",
	"bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
	"bottom-right": "bottom-4 right-4",
};
export function CardCheckbox({
	title,
	onClick,
	checked,
	description,
	children,
	className = "",
	clasNameButton = "",
	floatElement,
	gradientElement,
}: CardCheckboxParams) {
	const ref = useRef<HTMLButtonElement>(null);
	const floatPosition = tv({
		base: "absolute",
		variants: {
			position: cardCheckboxFloatPositions,
		},
	});
	function CheckComponent() {
		if (!checked)
			return (
				<div
					className="min-w-[15px] h-[15px] rounded-full border-[1px] border-black dark:border-white"
					id="card-checkbox-unchecked"
				/>
			);
		return (
			<div
				className="min-w-[15px] h-[15px] rounded-full  bg-primary flex items-center justify-center text-white dark:text-black"
				id="card-checkbox-checked"
			>
				<Check />
			</div>
		);
	}
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			id="card-checkbox-wrapper"
			className={`border border-input flex flex-col p-4 rounded-md relative overflow-hidden ${className}`}
			onClick={() => ref?.current?.click()}
			tabIndex={0}
			role="button"
		>
			{gradientElement}
			{floatElement && (
				<div
					className={floatPosition({ position: floatElement.position })}
					id="card-checkbox-float-element"
				>
					{floatElement.component}
				</div>
			)}
			<Button
				ref={ref}
				className={`w-full h-fit flex p-0 gap-2 items-start justify-start border-none text-start rounded-lg shadow-none hover:cursor-pointer hover:bg-background ${clasNameButton}`}
				onClick={() => onClick()}
				type="button"
				variant="outline"
				id="card-checkbox-button"
			>
				<CheckComponent />
				<div className="flex flex-col gap-1 w-full">
					<p>{title}</p>
					{description && (
						<p className="text-muted-foreground" id="card-checkbox-description">
							{description}
						</p>
					)}
				</div>
			</Button>
			{children}
		</div>
	);
}
