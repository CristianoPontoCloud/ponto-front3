import { type ZodErrorMap, z } from "zod";

export const errorMessagesZod = {
	invalid_type: "Obrigatório.",
	too_small: (minimum: number) => `No mínimo ${minimum} caracteres.`,
	too_big: (maximum: number) => `No máximo ${maximum} caracteres.`,
};
const { invalid_type, too_big, too_small } = errorMessagesZod;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const customErrorMap: ZodErrorMap = (issue: any, ctx) => {
	const messages: Record<string, string> = {
		invalid_type: invalid_type,
		too_small: too_small(Number(issue.minimum)),
		too_big: too_big(Number(issue.maximum)),
	};

	const message = messages[issue.code];
	return { message: message || ctx.defaultError };
};

z.setErrorMap(customErrorMap);
