"use client";
import { useShortcutScreen } from "@/application/hooks/use-shortcut-screen";
import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { useScreen } from "@/application/providers/screen/screen-provider";
import { SheetContentControllerProvider } from "@/application/providers/sheet-content/sheet-component-provider";
import { useRef } from "react";
import IrregularitiesUserGrid from "./components/grid/irrugularities-user/irregularities-user-grid";
import { IrregularitiesHeader } from "./components/irregularities-header";
import { IrregulariesProvider } from "./components/irregularities-provider";

export function IrregularitiesPage() {
	useShortcutScreen();
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	const { isFullScreen } = useScreen();
	return (
		<SheetContentControllerProvider>
			<IrregulariesProvider>
				<div className="flex flex-col h-full gap-4" ref={ref} style={{ height: height - 65 }}>
					<IrregularitiesHeader />
					<IrregularitiesUserGrid height={height - 65} isFullScreen={isFullScreen} />
				</div>
			</IrregulariesProvider>
		</SheetContentControllerProvider>
	);
}
