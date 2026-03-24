"use client";
import { getUrlImgApi } from "@/application/helpers/get-base-url-img-api";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { tv } from "tailwind-variants";

export interface CollaboratorViewerParams {
	name: string;
	position: string;
	src?: string;
	className?: string;
}
export function CollaboratorViewer({
	name,
	position,
	src,
	className = "",
}: CollaboratorViewerParams) {
	const [loadImg, setLoadImg] = useState<boolean>(true);
	const imgVariants = tv({
		base: "rounded-lg border-1",
		variants: {
			loadImg: {
				true: "w-0 h-0",
				false: "",
			},
		},
	});
	return (
		<div className={`flex flex-col w-full items-center  ${className}`}>
			<div className="flex gap-2 w-full ">
				{loadImg && (
					<div className="w-[48px] h-[48px] bg-muted flex items-center justify-center rounded-lg">
						<UserRound className="text-muted-foreground" />
					</div>
				)}
				<Image
					src={src ? getUrlImgApi(src) : ""}
					alt="teste"
					className={imgVariants({ loadImg })}
					width={48}
					height={48}
					onLoadingComplete={() => setLoadImg(false)}
					onError={() => setLoadImg(true)}
				/>
				<div className="flex flex-col gap-2 justify-start truncate">
					<p className="font-semibold">{name}</p>
					<p className="text-muted-foreground truncate">{position}</p>
				</div>
			</div>
		</div>
	);
}
