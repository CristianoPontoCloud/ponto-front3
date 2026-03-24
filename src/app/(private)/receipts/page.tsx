import { MarkTypeEnum } from "@/domain/entities/marks/mark-type";
import { ReceiptsPage } from "@/view/pages/receipts/receipts-page";
import { v4 as uuidv4 } from "uuid";

export default function RequestManagement() {
	return (
		<ReceiptsPage
			receipts={{
				lastPage: 1,
				page: 1,
				success: true,
				total: 1,
				data: Array.from({ length: 40 }).map(() => {
					return {
						id: uuidv4(),
						date: new Date(),
						hour: "00:00:00",
						typeMark: MarkTypeEnum.PIN,
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
