export interface createdBy {
	id: string;
	username: string;
	password: string;
	phone: string;
	email: string;
	status: "ACTIVE";
	isCompanyAdmin: true;
	isResellerAdmin: false;
	lastLogin: string;
	cpf: string;
	temporaryAccessCode: string;
	temporaryCodeExpiry: string;
	requiresPasswordReset: false;
	createdAt: string | Date | null;
	updatedAt: string | Date | null;
	deletedAt: string;
	deletedBy: string;
	lastAccessedCompany: string;
	userRoleIds: string[];
}
