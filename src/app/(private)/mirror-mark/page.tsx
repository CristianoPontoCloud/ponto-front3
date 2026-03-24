import { MirrorMarkPage } from "@/view/pages/mirror-mark/mirror-mark-page";
import { v4 as uuidv4 } from "uuid";

export default function MirrorMark() {
	return (
		<MirrorMarkPage
			mirrorsMark={{
				lastPage: 1,
				page: 1,
				success: true,
				total: 1,
				data: Array.from({ length: 12 }).map((_, index) => {
					const year = new Date().getFullYear();
					const month = index;
					return {
						id: uuidv4(),
						periodFrom: new Date(year, month, 1),
						periodTo: new Date(year, month + 1, 0),
						urlDownload: "",
						createdAt: "2025-09-16T14:35:22-03:00",
						deletedAt: "",
						deletedBy: "",
						updatedAt: "",
					};
				}),
			}}
		/>
	);
}
