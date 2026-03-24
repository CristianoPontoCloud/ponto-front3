import { PunchLine, type PunchLineParams } from "./punch-line";

export function PunchList() {
	const punchs = Array.from({ length: 4 }).map(
		(_, index): PunchLineParams => ({
			keyPunch:
				index / 2 === 0 ? `entry${Math.floor(index / 2) + 1}` : `out${Math.floor(index / 2) + 1}`,
			timePuching: "00:00:00",
		}),
	);
	return (
		<div id="punch-list" className="h-full flex flex-col justify-start">
			{punchs.map((punch, index) => {
				return <PunchLine {...punch} key={index.toString()} />;
			})}
			<PunchLine keyPunch="entry3" />
		</div>
	);
}
