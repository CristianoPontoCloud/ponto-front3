import { Check } from "lucide-react";
import { tv } from "tailwind-variants";

export interface PasswordStrengthCheckerParams {
	password: string;
	className?: string;
}
interface CheckParams {
	requirementName: string;
	hasComplexityRequirement: boolean;
	id: string;
}

function CheckView({ hasComplexityRequirement, requirementName, id }: CheckParams) {
	const checkVariant = tv({
		base: "flex gap-2",
		variants: {
			case: {
				true: "text-lime-500",
				false: "text-muted-foreground",
			},
		},
	});
	return (
		<div id={id} className={checkVariant({ case: hasComplexityRequirement })}>
			<Check id={`${id}-check`} className="h-5 w-5" />
			<span id={`${id}-message`}>{requirementName}</span>
		</div>
	);
}
export function PasswordStrengthChecker({
	password,
	className = "",
}: PasswordStrengthCheckerParams) {
	const comlexityRequirement = {
		letter: {
			has: /[a-zA-Z]/.test(password),
			name: "Letra",
			id: "letter",
		},
		number: {
			has: /[0-9]/.test(password),
			name: "Número",
			id: "number",
		},
		sixChar: {
			has: /^.{6,}$/.test(password),
			name: "Pelo menos 6 caractreres",
			id: "six-char",
		},
	};
	const comlexityRequirementList = Object.values(comlexityRequirement).map(
		({ has, name, id }, index) => (
			<CheckView
				hasComplexityRequirement={has}
				requirementName={name}
				id={id}
				key={index.toString()}
			/>
		),
	);
	return (
		<div className={`w-full flex flex-col gap-2 ${className}`}>
			<span className="font-semibold">A senha deve conter:</span>
			<div className="flex flex-col gap-2">{comlexityRequirementList}</div>
		</div>
	);
}
