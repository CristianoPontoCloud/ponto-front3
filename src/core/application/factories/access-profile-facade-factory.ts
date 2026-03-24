import { AccessProfileFacade } from "../facades/access-profile-facade";

export function accessProfileFacadeFactory(
  // token: string
): AccessProfileFacade {
  return new AccessProfileFacade()
}
