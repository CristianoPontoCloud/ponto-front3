import "@/view/styles/globals.css";
import type { Metadata } from "next";

import RootLayout from "@/view/layouts/root-layout";

export const metadata: Metadata = {
	title: "Ponto Cloud",
	description: "Tracking and Management",
};

export default function LayoutPublicPages({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <RootLayout>{children}</RootLayout>;
}
