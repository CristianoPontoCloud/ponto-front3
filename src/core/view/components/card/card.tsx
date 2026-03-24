import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Separator } from "../ui/separator";

export interface CardParams {
	header: ReactNode;
	children: ReactNode;
	footer?: ReactNode;
	disable?: boolean;
	classNames?: {
		wrapper?: string;
		header?: string;
		content?: string;
		footer?: string;
	};
}
export function Card({ header, children, disable = false, footer, classNames }: CardParams) {
	const cardVariants = tv({
		base: `rounded-lg border-[1px] overflow-hidden ${classNames?.wrapper}`,
		variants: {
			disable: {
				false: "border-border",
				true: "border-border/50",
			},
		},
	});
	const separtorVariants = tv({
		variants: {
			disable: {
				false: "border-border",
				true: "border-border/50",
			},
		},
	});
	const childVariants = tv({
		base: "px-4 py-3",
		variants: {
			disable: {
				false: "opacity-100",
				true: "opacity-50",
			},
		},
	});
	return (
		<div className={cardVariants({ disable })} id="card-wrapper">
			<div className={`px-4 py-3 ${classNames?.header ?? ""}`} id="card-header">
				{header}
			</div>
			<Separator
				id="card-header-separator"
				orientation="horizontal"
				className={separtorVariants({ disable })}
			/>
			<div className={childVariants({ disable })} id="card-content">
				{children}
			</div>
			{footer && (
				<Separator
					orientation="horizontal"
					className={separtorVariants({ disable })}
					id="card-footer-separator"
				/>
			)}
			{footer && (
				<div id="card-footer" className={childVariants({ disable })}>
					{footer}
				</div>
			)}
		</div>
	);
}
