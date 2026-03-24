import { svgCompanyNameWhite } from "@/view/components/svgs/svg-company-name-text-white";
import SinginLayout from "@/view/layouts/signin-layout";
import type { ReactNode } from "react";

export default function LayoutPublicPages({ children }: { children: ReactNode }) {
	const path = `${process.env.IMG_URL}image-login-pc.png`;
	return (
		<SinginLayout imagePath={path} companySvgPath={svgCompanyNameWhite}>
			{children}
		</SinginLayout>
	);
}
