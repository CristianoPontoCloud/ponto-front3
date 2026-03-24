import React from "react";
import { afterAll, beforeEach, vi } from "vitest";
vi.stubGlobal(
	"ResizeObserver",
	class {
		observe() {}
		unobserve() {}
		disconnect() {}
	},
);

beforeEach(() => {
	vi.clearAllMocks();
	vi.mock("next/router", () => require("next-router-mock"));
	vi.mock("next/navigation", () => ({
		useRouter: () => ({
			push: vi.fn(),
			replace: vi.fn(),
			pathname: "/",
		}),
		usePathname: () => "/path",
		useSearchParams: () => "",
	}));
});
afterAll(() => {
	vi.clearAllMocks();
});

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

globalThis.React = React;
