export function DashedSeparator({ className = "" }: { className?: string }) {
	return <div className={`w-full border-t-[1px] border-dashed border-boder ${className}`} />;
}
