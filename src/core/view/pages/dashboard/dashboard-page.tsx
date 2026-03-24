"use client";
import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { PunchClockViewer } from "@/view/components/entities/punch-clock/punch-clock-viewer/punch-clock-viewer";
import { Skeleton } from "@/view/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useRef } from "react";

export function DashboardPage() {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useTopOffset(headerRef);
	const heightLines = height / 3 - 16;
	const user = useSession()?.data?.user;
	const fullHeight = height - 16;
	return (
		<div className="flex flex-col h-full gap-4">
			<h1 className="text-2xl font-semibold">{`Olá, ${user?.firstName}`}</h1>
			<div className="flex gap-4" ref={headerRef}>
				{/* <Skeleton className="w-1/3 rounded-lg" style={{ height: height - 16 }} /> */}
				<PunchClockViewer height={fullHeight} />
				<div className="flex flex-col gap-4 w-full" style={{ height: fullHeight }}>
					<div className="flex gap-4 h-[116px]">
						<Skeleton className="w-full rounded-lg h-[116px]" />
						<Skeleton className="w-full rounded-lg h-[116px]" />
						<Skeleton className="w-full rounded-lg h-[116px]" />
						<Skeleton className="w-full rounded-lg h-[116px]" />
					</div>
					<Skeleton className="w-full rounded-lg" style={{ height: heightLines }} />
				</div>
			</div>
		</div>
	);
}
