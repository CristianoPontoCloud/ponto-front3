import { Skeleton } from "@/view/components/ui/skeleton";
import { useEffect, useRef } from "react";
export function SkeletonTimetrackingGrid({ height }: { height: number }) {
	const sktRef = useRef<HTMLDivElement | null>(null);
	const rowHeight = 48;
	const offsetHeight = sktRef.current?.offsetHeight;
	// const [height, setHeight] = useState<number>(offsetHeight ?? 0);
	const nrlines = 1 + Math.floor(height / rowHeight);
	function rows({ isHeader }: { isHeader: boolean }) {
		return Array.from({ length: 8 }).map((_, index) => (
			<Skeleton
				key={index.toString()}
				className={`border-1 rounded-sm bg-muted 
        ${index === 0 ? "w-5/12" : "w-1/12"} 
        ${isHeader ? "h-[40px]" : "h-[48px]"}
        `}
			/>
		));
	}
	const table = Array.from({ length: nrlines }).map((_, index) => (
		<div key={index.toString()} className="w-full flex gap-1">
			{rows({
				isHeader: index === 0,
			}).map((skt) => skt)}
		</div>
	));
	useEffect(() => {}, [offsetHeight]);
	return (
		<div className="h-full w-full flex flex-col gap-1 overflow-hidden" ref={sktRef}>
			{table.map((row) => row)}
		</div>
	);
}
