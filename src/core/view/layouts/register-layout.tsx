import type { ChildrenReactNode } from "@/domain/children";
import { CompanyLogo } from "@/view/components/sidebar/company-logo";
import { svgCompanyName } from "@/view/components/svgs/svg-company-name";
import { svgLogo } from "@/view/components/svgs/svg-logo";
import { Button } from "@/view/components/ui/button";

export default function LayoutRegisterPages({ children }: ChildrenReactNode) {
	return (
		<div className="flex flex-col w-full">
			<header className="w-full flex h-[68px] px-[160px] py-4 justify-between items-center">
				<CompanyLogo svgCompanyName={svgCompanyName} svgLogo={svgLogo} />
				<div className="flex items-center gap-[8px]">
					<span className="px-4 py-2">Torne-se uma revenda</span>
					<Button>Cadastre-se</Button>
				</div>
			</header>
			<main className="h-[calc(100vh-148px)] w-full flex py-[96px] justify-center">{children}</main>
			<footer className="h-[80px] flex justify-center items-center">
				<p>®2025 PontoCloud. Todos os direitos reservados.</p>
			</footer>
		</div>
	);
}
