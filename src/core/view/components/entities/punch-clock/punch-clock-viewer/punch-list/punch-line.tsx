import { Badge } from "@/view/components/ui/badge";
import { Separator } from "@/view/components/ui/separator";
import { Check } from "lucide-react";

export interface PunchLineParams {
	timePuching?: string;
	keyPunch: `entry${number}` | `out${number}`;
}
export function PunchLine({ timePuching, keyPunch }: PunchLineParams) {
	const badgeLabel = {
		entry: "E",
		out: "S",
	};
	function keySpliter() {
		const match = keyPunch.match(/^([a-zA-Z]+)(\d+)$/);
		if (!match)
			return {
				keyBadge: "",
				keyNumber: "",
			};

		const [, keyBadge, keyNumber] = match;
		return {
			keyBadge,
			keyNumber,
		};
	}
	const { keyBadge, keyNumber } = keySpliter();
	function keyFormatter() {
		const sigleBadge = badgeLabel[keyBadge as "entry" | "out"];
		return `${sigleBadge}${keyNumber}`;
	}

	if (!timePuching) {
		return (
			<div className="flex justify-between" id="next-punch">
				<div className="flex gap-3">
					<div className="border w-[20px] h-[20px] rounded-full" id="empty-circle" />
					<span className="text-muted-foreground">Próximo</span>
				</div>
				<Badge className="w-[30px] h-[20px] flex items-center justify-center bg-muted text-muted-foreground">
					{keyFormatter()}
				</Badge>
			</div>
		);
	}
	return (
		<div className="flex justify-between" id={`punch-${keyBadge}-${keyNumber}`}>
			<div className="flex gap-3">
				<div className="inline-block align-middle">
					<Check
						id="check"
						className="text-white bg-primary rounded-full p-[3px] w-[20px] h-[20px] mb-1"
					/>
					<Separator orientation="vertical" className="h-[16px] mx-2.5 mb-1" />
				</div>
				<span id="time-punching">{timePuching}</span>
			</div>
			<Badge
				className="w-[30px] h-[20px] flex items-center justify-center bg-muted text-muted-foreground"
				id="abreviation"
			>
				{keyFormatter()}
			</Badge>
		</div>
	);
}
