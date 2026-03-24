import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		devServer: {
			framework: "next",
			bundler: "webpack",
		},
		viewportWidth: 1280,
		viewportHeight: 800,
	},
	e2e: {
		setupNodeEvents() {
			// implement node event listeners here
		},
	},
});
