import { authOptions } from "@/application/providers/auth/auth-options";
import { getServerSession } from "next-auth/next";
export async function getToken() {
  const session = await getServerSession(authOptions);
  return session?.user.token ?? '';
}
