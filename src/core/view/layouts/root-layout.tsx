import "@/view/styles/globals.css";
import type { Metadata } from "next";

import SessionProvider from "@/application/providers/auth/session-provider";
import CacheProvider from "@/application/providers/cache/cache-provider";
import { ModalProvider } from "@/application/providers/modal-provider/modal-provider";
import { ScreenProvider } from "@/application/providers/screen/screen-provider";
import { SheetProvider } from "@/application/providers/sheet-provider/sheet-provider";
import ColorsProvider from "@/application/providers/themes/context-colors";
import { ToasterCustom } from "@/view/components/toaster/toaster";
import "@silevis/reactgrid/styles.css";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
	title: "Ponto Cloud",
	description: "Tracking and Management",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className="antialiased overflow-x-hidden overflow-y-hidden w-full max-h-full"
				suppressHydrationWarning
			>
				<SessionProvider>
					<CacheProvider>
						<NuqsAdapter>
							<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
								<ColorsProvider>
									<ToasterCustom
										toastOptions={{
											style: { pointerEvents: "auto" },
										}}
									/>
									<ScreenProvider>
										<SheetProvider>
											<ModalProvider>{children}</ModalProvider>
										</SheetProvider>
									</ScreenProvider>
								</ColorsProvider>
							</ThemeProvider>
						</NuqsAdapter>
					</CacheProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
