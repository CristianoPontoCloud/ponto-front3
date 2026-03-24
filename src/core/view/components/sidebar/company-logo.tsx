"use client";
interface CompanyLogo {
	svgLogo: string;
	svgCompanyName: string;
}

export function CompanyLogo({ svgCompanyName, svgLogo }: CompanyLogo) {
	return (
		<div className="h-full flex items-center gap-2">
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
			<div dangerouslySetInnerHTML={{ __html: svgLogo }} />
			<div
				className="group-data-[state=collapsed]:hidden"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: svgCompanyName }}
			/>
		</div>
	);
}
