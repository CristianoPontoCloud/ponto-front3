"use client";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { Label } from "@/view/components/ui/label";
import { useRef } from "react";
import { DelimitationList } from "./cards-list/delimitation-list";
import { SheetDelimitation } from "./delimitation-form/sheet-delimitation";
import { DelimitationProvider } from "./delimitation-provider/delimitation-provider";

export function CompaniesDelimitationLayout() {
	const ref = useRef<HTMLDivElement>(null);
	const height = useBottomOffset(ref);
	return (
		<DelimitationProvider>
			<div
				className="flex flex-col gap-4 w-full h-full relative"
				data-testid="form-company-delimitation"
			>
				<div
					className="flex justify-between items-center w-full sticky top-0 z-10 bg-background"
					ref={ref}
				>
					<Label className="text-muted-foreground text-sm col-span-full ">
						Delimitações geográficas
					</Label>
					<SheetDelimitation />
				</div>
				<DelimitationList height={height - 90} />
			</div>
		</DelimitationProvider>
	);
}
