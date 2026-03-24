"use client";
import { useShortcutScreen } from "@/application/hooks/use-shortcut-screen";
import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { SheetContentControllerProvider } from "@/application/providers/sheet-content/sheet-component-provider";
import { useEffect, useRef, useState } from "react";
import { TimeTrackingFooter } from "./components/footer/time-tracking-footer";
import { TimetrackingGrids } from "./components/grids/time-tracking-grids";
import { TimeTrackingHeader } from "./components/header/time-tracking-header";
import { TimeTrackingProvider } from "./provider/time-tracking-provider";

export function TimerTackingPage() {
	useShortcutScreen();
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	const [gridWidth, setGridWidth] = useState<number>(ref.current?.offsetWidth ?? 900);
	useEffect(() => {
		if (!ref.current) return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setGridWidth(entry.contentRect.width);
			}
		});
		observer.observe(ref.current);
		return () => {
			observer.disconnect();
		};
	}, []);
	return (
		<SheetContentControllerProvider>
			<TimeTrackingProvider>
				<div className="flex flex-col h-full gap-4" ref={ref} style={{ height: height - 115 }}>
					<TimeTrackingHeader />
					<TimetrackingGrids height={height - 115} gridWidth={gridWidth} />
					<TimeTrackingFooter />
				</div>
			</TimeTrackingProvider>
		</SheetContentControllerProvider>
	);
}
