import { type MiddlewareConfig, type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
	{ path: "/signin", whenAuthenticated: "redirect" },
	{ path: "/signup/email-confirm", whenAuthenticated: "redirect" },
	{ path: "/signup/personal-data", whenAuthenticated: "redirect" },
	{ path: "/signup/subscription-plans", whenAuthenticated: "redirect" },
	{ path: "/signup/create-password", whenAuthenticated: "redirect" },
	{ path: "/signup/company", whenAuthenticated: "redirect" },
	{ path: "/forget-password", whenAuthenticated: "next" },
] as const;

const privateRoutes = [
	"/dashboard",
	"/timetracking",
	"/collaborators",
	"/companies",
	"/hours",
	"/registrations",
	"/fiscal-reports",
	"/exports",
	"/settings/permissions",
	"/settings/access-profile",
	"/irregularities",
	"/receipts",
	"/mirror-mark",
	"/request-instance",
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/signin";
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = "/dashboard";

function isValidPrivateRoute(path: string): boolean {
	return privateRoutes.some((route) => path === route || path.startsWith(`${route}/`));
}

export function middleware(request: NextRequest) {
	const { pathname, searchParams } = request.nextUrl;
	const publicRoute = publicRoutes.find((route) => route.path === pathname);
	const isPrivateRoute = isValidPrivateRoute(pathname);
	const authToken = request.cookies.get("next-auth.session-token");

	// Rota pública
	if (publicRoute) {
		if (authToken && publicRoute.whenAuthenticated === "redirect") {
			const redirectUrl = request.nextUrl.clone();
			redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE;
			return NextResponse.redirect(redirectUrl);
		}
		return NextResponse.next();
	}

	// Rota privada
	if (isPrivateRoute) {
		if (
			pathname === "/timetracking" &&
			(!searchParams.has("type") || searchParams.get("type") === "")
		) {
			const url = request.nextUrl.clone();

			// Seta type = 2
			url.searchParams.set("type", "2");

			return NextResponse.redirect(url);
		}
		if (!authToken) {
			const redirectUrl = request.nextUrl.clone();
			redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
			return NextResponse.redirect(redirectUrl);
		}
		return NextResponse.next();
	}

	// Rota desconhecida
	const redirectUrl = request.nextUrl.clone();
	redirectUrl.pathname = authToken
		? REDIRECT_WHEN_AUTHENTICATED_ROUTE
		: REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
	return NextResponse.redirect(redirectUrl);
}

export const config: MiddlewareConfig = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|data).*)"],
};
