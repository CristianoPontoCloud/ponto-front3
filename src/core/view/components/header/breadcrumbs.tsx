import { useBreadcrumb } from "@/application/providers/bread-crumb/bread-crumb-provider";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function HeaderBreadcrumbs() {
	const { breadcrumbs } = useBreadcrumb();
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((page, index) => {
					const isntLastPage = index < breadcrumbs.length - 1;
					return (
						<div className="flex items-center gap-3" key={index.toString()}>
							<BreadcrumbItem className="hidden md:block" key={index.toString()}>
								<BreadcrumbLink href={page.url}>{page.name}</BreadcrumbLink>
							</BreadcrumbItem>
							{isntLastPage && <BreadcrumbSeparator className="hidden md:block mt-[1px]" />}
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
