"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

type ToasterCustomProps = React.ComponentProps<typeof Toaster>;

export const ToasterCustom = ({ ...props }: ToasterCustomProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Toaster
			theme={theme as ToasterCustomProps["theme"]}
			className="toaster group"
			data-testid="toaster"
			position="bottom-right"
			offset={"1rem"}
			{...props}
		/>
	);
};
