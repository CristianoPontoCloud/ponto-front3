import { getUrlImgApi } from "@/application/helpers/get-base-url-img-api";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { RequestManagementFormProps } from "@/domain/entities/request-management/request-management";
import { StaticFieldReader } from "@/view/components/static-field-reader/static-field-reader";
import { Button } from "@/view/components/ui/button";
import { format } from "date-fns";
import { Expand, UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";
import { RequestInstanceAceptedOrRejectButtons } from "../shared/request-instance-acepted-or-reject-buttons";
import { RequestInstanceBodyLayoutSheetForm } from "./request-instance-body-layout-sheet-form";

const { ptBR } = require("date-fns/locale/pt-BR");

export function RequestInstanceNoRecognizePhotoCaseSheetForm({ closeSheet }: SheetFormProps) {
	const [loadImg, setLoadImg] = useState<boolean>(true);
	const { setModalAndOpen } = useModal();
	function openImgModal() {
		setModalAndOpen({
			classNames: {
				content: "p-0",
				close: "bg-background round-log p-1",
				closeSvg: "text-black dark:text-white w-6 h-6",
			},
			content: (
				<Image
					src={getUrlImgApi("collaborators/img1.jpg")}
					alt=""
					className={imgVariants({ loadImg })}
					width={812}
					height={708}
					onLoadingComplete={() => setLoadImg(false)}
					onError={() => setLoadImg(true)}
				/>
			),
		});
	}
	const form = useFormContext<RequestManagementFormProps>();
	const createdAt = form.watch("createdAt");
	const date = new Date(createdAt);
	const dateFormated = format(date, "dd/MM/yyyy", { locale: ptBR });
	const timeFormated = format(date, "HH:mm", { locale: ptBR });
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
		<RequestInstanceBodyLayoutSheetForm className="items">
			<StaticFieldReader
				label="Marcação com foto não reconhecida"
				value={`Realizada em ${dateFormated} às ${timeFormated}`}
				classNames={{ wrapper: "w-full" }}
			/>
			{loadImg && (
				<div className="w-[48px] h-[48px] bg-muted flex items-center justify-center rounded-lg">
					<UserRound className="text-muted-foreground" />
				</div>
			)}
			<div className="relative">
				<Image
					src={getUrlImgApi("collaborators/img1.jpg")}
					alt=""
					className={imgVariants({ loadImg })}
					width={400}
					height={350}
					onLoadingComplete={() => setLoadImg(false)}
					onError={() => setLoadImg(true)}
				/>
				<Button
					variant="outline"
					size="icon"
					type="button"
					className="absolute bottom-1 right-1 rounded-lg"
					onClick={() => openImgModal()}
				>
					<Expand />
				</Button>
			</div>
			<RequestInstanceAceptedOrRejectButtons closeSheet={closeSheet} />
		</RequestInstanceBodyLayoutSheetForm>
	);
}
