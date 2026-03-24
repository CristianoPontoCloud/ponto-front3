import { authorizeFacadeFactory } from "@/application/factories/authorize-facade-factory";
import type { TokenJWT } from "@/domain/authentication/signin";
import { decodeJWT } from "@/domain/global-helpers/decode-jwt";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				token: { label: "token", type: "text" },
			},

			async authorize(credentials) {
				if (!credentials) return null;
				const { token } = credentials;
				const data = await authorizeFacadeFactory(token).getSessionMetadata();
				const response = data?.data;
				const decodedToken = decodeJWT<TokenJWT>(token ?? "");
				if (!response || !decodedToken) return null;
				const collaborator = response?.collaborator;
				const user = response?.user;
				const company = response?.company;
				const companyGroups = response?.companyGroups;
				const metadata: TokenJWT = {
					sub: decodedToken.sub,
					iat: decodedToken.iat,
					exp: decodedToken.exp,
					collaboratorId: collaborator.id ?? "",
					email: collaborator?.email ?? "",
					admin: "",
					companyId: company?.id ?? "",
					firstName: collaborator?.name ?? "",
					lastName: collaborator?.surname ?? "",
					username: user?.username ?? "",
					parentCompanyId: companyGroups?.[0]?.headquarters?.companyId ?? "",
					hasCpf: !!collaborator.cpf,
					origin: "",
					positionName: collaborator?.position?.name ?? "",
					startDay: company.startDay,
					companyGroups,
				};

				return {
					...metadata,
					token,
					id: decodedToken.sub,
				};
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	cookies: {
		sessionToken: {
			name: "next-auth.session-token",
			options: {
				httpOnly: true,
				sameSite: "strict", // ou "strict"
				path: "/",
				secure: process.env.NODE_ENV === "production", // verificar em ambiente de produção
			},
		},
	},
	pages: {
		signIn: "/login",
		// error: "/login",
	},
	debug: true,
	callbacks: {
		async jwt({ token, user }) {
			return {
				...user,
				...token,
			};
		},

		async session({ session, token }) {
			if (token && session.user) {
				const {
					admin,
					collaboratorId,
					hasCpf,
					id,
					origin,
					username,
					email,
					companyId,
					firstName,
					lastName,
					parentCompanyId,
					positionName,
					companyGroups,
					startDay,
				} = token;
				session.user = {
					admin,
					collaboratorId,
					hasCpf,
					id,
					origin,
					username,
					companyId,
					firstName,
					lastName,
					email,
					companyGroups,
					parentCompanyId,
					positionName,
					startDay,
					token: token.token,
				};
			}
			return session;
		},
	},
};
