export interface Plan {
  id: string,
  name: string,
  status: string,
  description: string,
  maxCollaborators: number,
  maxCompany: number,
  price: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  deletedBy: string,
  resellerPlanIds: string[],
  licenseIds: string[]
}
