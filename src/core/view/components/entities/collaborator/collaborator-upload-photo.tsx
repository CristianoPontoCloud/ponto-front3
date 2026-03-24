import { getUrlImgApi } from "@/application/helpers/get-base-url-img-api";
import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import { CollaboratorStatusEnum } from "@/domain/entities/collaborator/collaborator-status";
import { Camera, UserRound } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";
import { InputFileForm } from "../../formfields/input-file-form-field";

export function CollaboratorPhotoUploader() {
	const form = useFormContext<CollaboratorFormProps>();
	const status = form.watch("status");
	const img = form.watch("image");
	const initialImage = form.watch("imageUrl");
	const [imageUrl, setImageUrl] = useState(initialImage ? getUrlImgApi(initialImage) : "");

	const wrapperVariants = tv({
		base: "w-48 h-48 flex items-center justify-center rounded-lg relative",
		variants: {
			hasImageUrl: {
				true: "bg-transparante",
				false: "bg-gray-100",
			},
		},
	});

	const imageVariants = tv({
		base: "rounded-lg w-full h-full",
		variants: {
			isDismissal: {
				true: "filter grayscale",
			},
		},
	});

	function getFileUrl(fileslist: Array<File>) {
		if (fileslist.length < 1) return "";
		const file = fileslist[0];
		const url = URL.createObjectURL(file);

		return url;
	}

	useEffect(() => {
		if (Array.isArray(img) && img.length > 0 && img[0] instanceof File) {
			setImageUrl(getFileUrl(img));
		}
	}, [img]);
	return (
		<div id="collaborator-photo-uploader" className={wrapperVariants({ hasImageUrl: !!imageUrl })}>
			{!imageUrl && <UserRound size={48} className="text-gray-300" />}
			{imageUrl && (
				<Image
					src={imageUrl}
					alt=""
					className={imageVariants({
						isDismissal: status === CollaboratorStatusEnum.dismissed,
					})}
					fill
				/>
			)}
			<label
				id="image-label"
				htmlFor="image"
				className="flex justify-center items-center w-full h-full absolute z-10 opacity-0 rounded-lg hover:bg-black/65 hover:opacity-100 hover:cursor-pointer transition duration-200 ease-in"
			>
				<Camera size={24} className="text-white" />
			</label>
			<InputFileForm
				form={form}
				formFieldName="image"
				type="file"
				classNames={{ formItem: "opacity-0 absolute" }}
			/>
		</div>
	);
}
