interface TimetrackingGridNoResultsParams {
	height: number;
}

export function TimetrackingGridNoResults({ height }: TimetrackingGridNoResultsParams) {
	return (
		<div
			className="w-full h-full border-spacing-4 border-background-foreground border-[1px] border-dashed rounded-lg flex flex-col gap-4 justify-center items-center"
			style={{ height }}
		>
			<p className="text-2xl font-bold">Nenhum resultado encontrado</p>
			<p>Tente alterar sua busca para encontrar o que está procurando.</p>
		</div>
	);
}
