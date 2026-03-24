interface StaticFieldReaderParams {
	classNames?: {
		label?: string;
		value?: string;
		wrapper?: string;
	};
	label: string;
	value: string;
}
export function StaticFieldReader({ label, value, classNames }: StaticFieldReaderParams) {
	return (
		<div className={`w-full flex flex-col gap-1 ${classNames?.wrapper ?? ""}`}>
			<span className={classNames?.label ?? ""}>{label}</span>
			<span className={`text-muted-foreground ${classNames?.value ?? ""}`}>{value}</span>
		</div>
	);
}
