import { ScrollArea } from "@/view/components/ui/scroll-area";
import { useDelimitationProvider } from "../delimitation-provider/delimitation-provider";
import { GeoFenceCard } from "./geo-fence-card";

export interface DelimitationListParams {
	height: number;
}

export function DelimitationList({ height }: DelimitationListParams) {
	// const form = useFormContext<CompanyFormProps>();
	// const delimitations = form.getValues("delimitations") ?? [];
	const { delimitationsQuery } = useDelimitationProvider();
	const delimitations = delimitationsQuery?.data?.data ?? [];
	if (delimitations.length < 1) {
		return (
			<div
				className="border-spacing-4 border-background-foreground border-[1px] border-dashed rounded-lg  flex flex-col items-center justify-center gap-3 "
				style={{ height: height }}
			>
				<div className="text-xl font-bold text-center">
					<p>Adicione uma</p>
					<p>delimitação geográfica</p>
				</div>
				<div className="text-muted-foreground text-sm text-center">
					<p>Para adicionar, clique no botão</p>
					<p>no canto superior direito.</p>
				</div>
			</div>
		);
	}

	return (
		<ScrollArea className="w-full rounded-lg" style={{ height: height }}>
			<div className="flex flex-col gap-4">
				{delimitations.map((geofence, index) => (
					<GeoFenceCard key={`manual-card-${index.toString()}`} geofence={geofence} />
				))}
			</div>
		</ScrollArea>
	);
}
