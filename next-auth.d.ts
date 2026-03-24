import type { UserSession } from "@/domain/authentication/signin";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserSession
  }

  interface User extends UserSession {
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserSession {
    email: string
  }
}
