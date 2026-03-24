import type { Coordinates } from "./entities/address";

type isoBrStates =
	| "AC"
	| "AL"
	| "AM"
	| "AP"
	| "BA"
	| "CE"
	| "DF"
	| "ES"
	| "GO"
	| "MA"
	| "MG"
	| "MS"
	| "MT"
	| "PA"
	| "PB"
	| "PE"
	| "PI"
	| "PR"
	| "RJ"
	| "RN"
	| "RO"
	| "RR"
	| "RS"
	| "SC"
	| "SE"
	| "SP"
	| "TO";

export const zeroMarkBr: Record<isoBrStates, Coordinates> = {
	AC: { lat: "-9.97499", lng: "-67.80757" },
	AL: { lat: "-9.66599", lng: "-35.73500" },
	AM: { lat: "-3.13191", lng: "-60.02341" },
	AP: { lat: "0.03894", lng: "-51.06657" },
	BA: { lat: "-12.97180", lng: "-38.50874" },
	CE: { lat: "-3.73045", lng: "-38.52167" },
	DF: { lat: "-15.78010", lng: "-47.92922" },
	ES: { lat: "-20.31550", lng: "-40.31280" },
	GO: { lat: "-16.67990", lng: "-49.25500" },
	MA: { lat: "-2.52973", lng: "-44.30280" },
	MG: { lat: "-19.92450", lng: "-43.93524" },
	MS: { lat: "-20.46971", lng: "-54.62012" },
	MT: { lat: "-15.59892", lng: "-56.09489" },
	PA: { lat: "-1.45502", lng: "-48.50385" },
	PB: { lat: "-7.11509", lng: "-34.88262" },
	PE: { lat: "-8.06060", lng: "-34.87809" },
	PI: { lat: "-5.08921", lng: "-42.80182" },
	PR: { lat: "-25.42835", lng: "-49.27325" },
	RJ: { lat: "-22.90685", lng: "-43.17290" },
	RN: { lat: "-5.79542", lng: "-35.20902" },
	RO: { lat: "-8.76116", lng: "-63.89990" },
	RR: { lat: "2.82350", lng: "-60.67530" },
	RS: { lat: "-30.03463", lng: "-51.21770" },
	SC: { lat: "-27.59538", lng: "-48.54805" },
	SE: { lat: "-10.94725", lng: "-37.07308" },
	SP: { lat: "-23.55052", lng: "-46.63331" },
	TO: { lat: "-10.18467", lng: "-48.33365" },
};
