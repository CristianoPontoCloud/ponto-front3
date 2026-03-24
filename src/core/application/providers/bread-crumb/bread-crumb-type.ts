export interface BreadCrumbProviderParams {
	children: React.ReactNode;
}

export interface Breadcrumbs {
	name: string;
	url: string;
}

export interface BreadcrumbContextProps {
	breadcrumbs: Breadcrumbs[];
}
