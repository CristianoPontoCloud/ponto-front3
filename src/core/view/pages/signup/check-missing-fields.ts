import type { SignupFormProps } from "@/domain/authentication/signup";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { UseFormReturn } from "react-hook-form";

export class checkSignupDataOrRedirect {
  private basePathName = '/signup/';

  constructor(
    private readonly pathName: string,
    private readonly form: UseFormReturn<SignupFormProps>,
    private readonly router: AppRouterInstance
  ) { }

  private async company(): Promise<boolean> {
    const isCnpjValid = this.form.watch("cnpj");
    const isFantasyNameValid = this.form.watch("fantasyName");
    const isCompanySizeValid = this.form.watch("companySize");

    if (!isCnpjValid || !isFantasyNameValid || !isCompanySizeValid) {
      this.router.push("/signup/company");
      return true;
    }
    return false;
  }

  private async personalData(): Promise<boolean> {
    const isFirstNameValid = this.form.watch("firstName");
    const isLastNameValid = this.form.watch("lastName");
    const isPhoneValid = this.form.watch("phone");
    const isPositionValid = this.form.watch("positionId");

    if (!isFirstNameValid || !isLastNameValid || !isPhoneValid || !isPositionValid) {
      this.router.push("/signup/personal-data");
      return true;
    }
    return false;
  }

  private async subscriptionPlan(): Promise<boolean> {
    const isPlanId = this.form.watch("planId");

    if (!isPlanId) {
      this.router.push("/signup/subscription-plans");
      return true;
    }
    return false;
  }

  async execute() {
    if (this.pathName === `${this.basePathName}personal-data`) {
      if (await this.company()) return;
    }

    if (this.pathName === `${this.basePathName}subscription-plans`) {
      if (await this.company()) return;
      if (await this.personalData()) return;
    }

    if (this.pathName === `${this.basePathName}create-password`) {
      if (await this.company()) return;
      if (await this.personalData()) return;
      if (await this.subscriptionPlan()) return;
    }
  }
}
