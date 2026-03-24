import PrivateLayout from "@/view/layouts/private-layout";
import type { ReactNode } from "react";

export default function LayoutPrivatePages({ children }: { children: ReactNode }) {
	return <PrivateLayout>{children}</PrivateLayout>;
}
