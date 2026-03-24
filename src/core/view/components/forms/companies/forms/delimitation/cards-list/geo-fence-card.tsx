import type { GeoFence } from "@/domain/entities/delimitation";
import { GridForm } from "@/view/components/formfields/grid-from";
import { Separator } from "@/view/components/ui/separator";
import { tv } from "tailwind-variants";
import { DelimitationHeaderCard } from "./delemitation-header-card";

interface GeoFenceCardParams {
	geofence: GeoFence;
}
export function GeoFenceCard({ geofence }: GeoFenceCardParams) {
	const {
		latitude,
		longitude,
		complement,
		code,
		city,
		radiusInMeters,
		neighborhood,
		state,
		street,
		zip,
	} = geofence;
	const status = geofence.active;

	const spansVariants = tv({
		base: "col-span-1",
		variants: {
			status: {
				true: "opacity-100",
				false: "opacity-50",
			},
			complement: {
				true: "col-span-2",
				false: "",
			},
		},
	});
	const separatorVariants = tv({
		variants: {
			status: {
				true: "opacity-100",
				false: "opacity-50",
			},
		},
	});
	const cardVariants = tv({
		base: "flex flex-col  border-[1px] rounded-lg",
		variants: {
			status: {
				true: "border-border",
				false: "border-border/50",
			},
		},
	});
	return (
		<div className={cardVariants({ status })}>
			<DelimitationHeaderCard geofence={geofence} />
			<Separator orientation="horizontal" className={separatorVariants({ status })} />
			<GridForm gridCol="2" className="m-4 text-muted-foreground gap-x-0 w-auto">
				<span className={spansVariants({ status })}>{`latitude: ${latitude}`}</span>
				<span className={spansVariants({ status })}>{`longitude: ${longitude}`}</span>
				{zip && <span className={spansVariants({ status })}>CEP: {zip}</span>}
				{street && <span className={spansVariants({ status })}>Rua: {street}</span>}
				{radiusInMeters && (
					<span className={spansVariants({ status })}>Raio: {radiusInMeters}m</span>
				)}
				{code && <span className={spansVariants({ status })}>Número: {code}</span>}
				{neighborhood && <span className={spansVariants({ status })}>Bairro: {neighborhood}</span>}
				{city && <span className={spansVariants({ status })}>Cidade: {city}</span>}
				{state && <span className={spansVariants({ status })}>Estado: {state}</span>}
				{complement && (
					<span
						className={spansVariants({ status, complement: true })}
					>{`Complemento: ${complement}`}</span>
				)}
			</GridForm>
		</div>
	);
}
