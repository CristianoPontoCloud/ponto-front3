import { ThemeModeToggle } from "@/view/components/toggles/theme-modo-toggle";
import { Button } from "@/view/components/ui/button";
import { ScrollArea, ScrollBar } from "@/view/components/ui/scroll-area";
import "@/view/styles/globals.css";
import Image from "next/image";
interface SinginLayoutParams {
	children: React.ReactNode;
	imagePath: string;
	companySvgPath: string;
}
export default function SinginLayout({ children, imagePath, companySvgPath }: SinginLayoutParams) {
	return (
		<ScrollArea type="always">
			<div className="flex h-[100vh] w-full items-center min-w-[716px] relative">
				<div className="h-[100vh] w-[40vw] min-w-[304px] absolute flex flex-col p-8 pt-5 justify-between text-white z-10">
					<div className="w-full flex justify-start">
						{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
						<div dangerouslySetInnerHTML={{ __html: companySvgPath }} />
					</div>
					<div className="flex flex-col gap-12 ">
						<div>
							<h2 className="text-3xl font-semibold">Conectando</h2>
							<h2 className="text-3xl font-semibold">seu tempo ao futuro</h2>
						</div>
						<div>
							<p>Conte com a tecnologia e assertividade da PontoCloud®</p>
							<p>para elevar o patamar da empresa para atingir o próximo nível.</p>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex flex-wrap items-center gap-2">
								<Button variant="link" className="p-0 underline text-white h-fit" type="button">
									Termo de uso
								</Button>
								e
								<Button variant="link" className="p-0 underline text-white h-fit" type="button">
									Política de privacidade
								</Button>
							</div>
							<ThemeModeToggle />
						</div>
					</div>
				</div>
				<div className="h-[100vh] w-[40vw] overflow-hidden relative min-w-[304px]">
					<Image alt="" src={imagePath} className=" object-cover object-center" fill />
					<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />
				</div>
				<div>
					<main className="flex items-center justify-center w-[60vw] h-[calc(100vh-80px)]">
						{children}
					</main>
					<footer className="h-[80px] flex justify-center items-center">
						<p className="bottom-8">®2025 PontoCloud. Todos os direitos reservados.</p>
					</footer>
				</div>
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
