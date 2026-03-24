import FiscalReportsPage from "@/view/pages/fiscal-reports/fiscal-reports-page";

export default async function FiscalReports() {
	// export default async function FiscalReports({ urlParams }: ServerSideUrlParams) {
	// const token = await getToken();
	// const collaborators = await safePaginationCall({
	// 	facadeFactory: fiscalResportsFacadeFactory,
	// 	urlParams,
	// 	token,
	// });
	return <FiscalReportsPage />;
}
