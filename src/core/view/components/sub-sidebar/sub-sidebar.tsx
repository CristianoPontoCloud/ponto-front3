"use client";
import { usePathname, useRouter } from "next/navigation";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";

interface MenuItem {
	title: string;
	url: string;
	Icon: React.ElementType;
}

interface SubSidebarParams {
	title: string;
	pages: MenuItem[];
	statusFilterDefault?: string;
}

export default function SubSidebar({ pages, title, statusFilterDefault = "" }: SubSidebarParams) {
	const router = useRouter();
	const pathname = usePathname();

	const buttonVariants = tv({
		base: "justify-start w-full text-sm font-normal border-none w-full justify-start mb-2 bg-transparent",
		variants: {
			selectedPage: {
				true: "bg-primary/10 text-primary hover:bg-primary hover:text-background",
				false: "text-background-foregound bg-background hover:bg-primary hover:text-background",
			},
		},
	});
	return (
		<div className="h-full">
			<h1 className="text-2xl font-semibold mt-1 mb-[1.70rem]">{title}</h1>
			<div className="flex flex-col gap-1 ">
				{pages.map(({ Icon, title, url }, index) => {
					return (
						<Button
							onClick={() => {
								router.push(`${url}${statusFilterDefault}`);
							}}
							data-testid={`sub-page-${index}`}
							className={buttonVariants({ selectedPage: url === pathname })}
							key={index.toString()}
						>
							<Icon />
							<span>{title}</span>
						</Button>
					);
				})}
			</div>
		</div>
	);
}
