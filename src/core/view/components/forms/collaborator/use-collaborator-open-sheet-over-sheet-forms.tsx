import { useContextSheetOverSheetContentController } from "@/application/providers/sheet-over-sheet-content/sheet-over-sheet-component-provider";
import { companiesSchema } from "@/application/validation/forms/companies-schema";
import { costCenterSchema } from "@/application/validation/forms/registrations/center-cost-schema";
import { deparmentSchema } from "@/application/validation/forms/registrations/department-schema";
import { positionSchema } from "@/application/validation/forms/registrations/position-schema";
import type { CostCenterFormProps } from "@/domain/entities/center-cost";
import type { CompanyFormProps } from "@/domain/entities/companies";
import type { DepartmentFormProps } from "@/domain/entities/department";
import type { PositionFormProps } from "@/domain/entities/positions";
import { companyInitialFormValues } from "@/view/pages/companies/company-initial-values";
import { costCenterInitialFormValues } from "@/view/pages/registrations/center-cost/center-cost-initial-values";
import { departmentInitialFormValues } from "@/view/pages/registrations/departments/departments-initial-values";
import { positionInitialFormValues } from "@/view/pages/registrations/positions/positions-initial-values";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CompaniesLayoutSheetForm } from "../companies/companies-layout-sheet-form";
import CostCenterSheetForm from "../registrations/cost-center/cost-center-sheet-form";
import DepartmentSheetForm from "../registrations/department/department-sheet-form";
import PositionSheetForm from "../registrations/position/position-sheet-form";

export function useCollaboratorOpenSheetOverSheetForms() {
	const { setContentAndOpen, reset } = useContextSheetOverSheetContentController();
	const positionForm = useForm<PositionFormProps>({
		values: positionInitialFormValues,
		resolver: zodResolver(positionSchema),
		mode: "onSubmit",
	});
	const departmentForm = useForm<DepartmentFormProps>({
		values: departmentInitialFormValues,
		resolver: zodResolver(deparmentSchema),
		mode: "onSubmit",
	});
	const companyForm = useForm<CompanyFormProps>({
		values: companyInitialFormValues,
		resolver: zodResolver(companiesSchema),
		mode: "onSubmit",
	});
	const costcenterForm = useForm<CostCenterFormProps>({
		values: costCenterInitialFormValues,
		resolver: zodResolver(costCenterSchema),
		mode: "onSubmit",
	});
	function position() {
		setContentAndOpen({
			Body: (
				<FormProvider {...positionForm}>
					<PositionSheetForm closeSheet={reset} />
				</FormProvider>
			),
			Header: "Cadastro de cargo",
			sheetWidth: "22vw",
			sheetMinWidth: "410px",
		});
	}

	function department() {
		setContentAndOpen({
			Body: (
				<FormProvider {...departmentForm}>
					<DepartmentSheetForm closeSheet={reset} />
				</FormProvider>
			),
			Header: "Cadastro de departamento",
			sheetWidth: "30vw",
			sheetMinWidth: "410px",
		});
	}
	function company() {
		setContentAndOpen({
			Body: (
				<FormProvider {...companyForm}>
					<CompaniesLayoutSheetForm closeSheet={reset} />
				</FormProvider>
			),
			Header: "Cadastro de empresa",
			sheetMinWidth: "900px",
		});
	}
	function costCenter() {
		setContentAndOpen({
			Body: (
				<FormProvider {...costcenterForm}>
					<CostCenterSheetForm closeSheet={reset} />
				</FormProvider>
			),
			Header: "Cadastro de centro de custo",
			sheetWidth: "22vw",
			sheetMinWidth: "410px",
		});
	}

	return {
		position,
		department,
		company,
		costCenter,
	};
}
