import type { OptionsParams } from "@/domain/components/options";
import { Button } from "@/view/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

export function Options({
	label,
	options,
	buttonTrigger,
	classNameDropDownContent,
	classNameDropdownMenuTrigger,
}: OptionsParams) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className={classNameDropdownMenuTrigger}>
				<Button
					id="option-trigger"
					variant={buttonTrigger?.variant ?? "ghost"}
					className={`p-2 w-8 h-8 bg-background ${buttonTrigger?.className ?? ""}`}
					data-testid="open-options-button"
				>
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={`${classNameDropDownContent}`}
				id="options-content"
				align="end"
			>
				{label && (
					<>
						<DropdownMenuLabel>{label}</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</>
				)}
				<DropdownMenuGroup>
					{options.map(({ onClick, className, hasSeparator, isDisable = false, label }, index) => (
						<div key={index.toString()}>
							<DropdownMenuItem
								onClick={() => onClick()}
								className={`cursor-pointer ${className}`}
								disabled={isDisable}
								data-testid={label}
							>
								{label}
							</DropdownMenuItem>
							{hasSeparator && <DropdownMenuSeparator />}
						</div>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
