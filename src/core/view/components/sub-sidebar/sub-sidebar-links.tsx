"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";

interface MenuItem {
	title: string;
	url: string;
	Icon: React.ElementType;
}

interface SubSidebarLinkParams {
	title: string;
	pages: MenuItem[];
	statusFilterDefault?: string;
}

// Movido para fora para evitar recriação em toda renderização
const buttonVariants = tv({
	base: "justify-start w-full text-sm font-normal border-none mb-2 bg-transparent gap-2",
	variants: {
		selectedPage: {
			true: "bg-primary/10 text-primary hover:bg-primary hover:text-background",
			false: "text-background-foreground bg-background hover:bg-primary hover:text-background",
		},
	},
});

export default function SubSidebarLinks({ pages, title, statusFilterDefault = "" }: SubSidebarLinkParams) {
	const pathname = usePathname();

	return (
		<div className="h-full">
			<h1 className="text-2xl font-semibold mt-1 mb-[1.70rem]">{title}</h1>
			<div className="flex flex-col gap-1">
				{pages.map(({ Icon, title, url }, index) => {
					const fullUrl = `${url}${statusFilterDefault}`;
					const isSelected = pathname === url || pathname.startsWith(url); // Melhoria: mantém ativo se estiver em subpáginas

					return (
						// Com Shadcn UI, passamos o asChild para o Button mesclar suas classes com a tag <Link>
						<Button
							key={url}
							asChild
							data-testid={`sub-page-${index}`}
							className={buttonVariants({ selectedPage: isSelected })}
						>
							<Link
								href={fullUrl}
								prefetch={true} // Força o prefetch completo, mesmo em rotas dinâmicas
							>
								<Icon />
								<span>{title}</span>
							</Link>
						</Button>
					);
				})}
			</div>
		</div>
	);
}
