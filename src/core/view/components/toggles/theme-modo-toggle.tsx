"use client";

import { Button } from "@/view/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { tv } from "tailwind-variants";

export function ThemeModeToggle() {
	const { setTheme, theme } = useTheme();
	const buttonVariants = tv({
		base: "h-[28px] w-[32px] flex items-center justify-center hover:text-background-foreground",
		variants: {
			theme: {
				light: "bg-background dark:bg-transparent hover:bg-background",
				dark: "bg-transparent dark:bg-background",
			},
			isSelected: {
				true: "text-black dark:text-white",
				false: "text-muted-foreground",
			},
		},
	});
	return (
		<div className="bg-muted p-1 rounded-lg flex">
			<Button
				variant="ghost"
				className={buttonVariants({ theme: "light", isSelected: theme === "light" })}
				onClick={() => setTheme("light")}
				data-testid="button-mode-theme"
			>
				<Sun className="h-[16px] w-[16px] transition-all" data-testid="svg-sun" />
				{/* <Moon
					className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0
				dark:scale-100"
					data-testid="svg-moon"
				/> */}
			</Button>
			<Button
				variant="ghost"
				className={buttonVariants({ theme: "dark", isSelected: theme === "dark" })}
				onClick={() => setTheme("dark")}
				data-testid="button-mode-theme"
			>
				<Moon className="h-[16px] w-[16px] transition-all" data-testid="svg-moon" />
			</Button>
		</div>
	);
}
