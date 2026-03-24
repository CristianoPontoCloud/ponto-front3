import type { MutableRefObject, ReactNode } from "react";
import { tv } from "tailwind-variants";

interface GridFormParams {
	gridCol?: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
	className?: string;
	children: ReactNode;
	ref?: MutableRefObject<HTMLDivElement>
}

export function GridForm({
	children,
	className,
	gridCol = "2",
	ref
}: GridFormParams) {
	const baseGridStr = tv({
		base: `my-6 grid gap-4 w-full px-1 ${className}`,
		variants: {
			gridCol: {
				"2": "grid-cols-2",
				"3": "grid-cols-3",
				"4": "grid-cols-4",
				"5": "grid-cols-5",
				"6": "grid-cols-6",
				"7": "grid-cols-7",
				"8": "grid-cols-8",
				"9": "grid-cols-9",
				"10": "grid-cols-10",
				"11": "grid-cols-11",
				"12": "grid-cols-12",
			},
		},
	});

	return <div className={baseGridStr({ gridCol: gridCol })} ref={ref}>{children}</div>;
}
