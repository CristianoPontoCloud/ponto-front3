import { RequestInstancePage } from "@/view/pages/request-instance/request-instance-page";

export default async function RequestInstance() {
	// const token = await getToken();
	// const requests = await safePaginationCall({
	// 	facadeFactory: requestInstanceFacadeFactory,
	// 	token,
	// });

	return (
		<RequestInstancePage requests={{ lastPage: 1, page: 1, success: false, total: 1, data: [] }} />
	);
}
