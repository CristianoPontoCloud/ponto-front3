import {
	AppRouterContext,
	type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";

export function createMockRouter(): AppRouterInstance {
	return {
		back: () => {},
		forward: () => {},
		push: () => Promise.resolve(),
		replace: () => Promise.resolve(),
		refresh: () => {},
		prefetch: () => Promise.resolve(),

		// pathname: "/",
		// query: {},
		// asPath: "/",
		// basePath: "",
		// locale: undefined,
		// isReady: true,
		// isFallback: false,
		// events: {
		// 	on: () => {},
		// 	off: () => {},
		// 	emit: () => {},
		// },
	};
}

export const withRouter = (component: React.ReactNode) => (
	<AppRouterContext.Provider value={createMockRouter()}>{component}</AppRouterContext.Provider>
);
