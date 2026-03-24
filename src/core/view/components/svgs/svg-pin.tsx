interface SvgPinParams {
	className?: string;
}
export function SvgPin({ className = "" }: SvgPinParams) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="24"
			viewBox="0 0 20 24"
			fill="none"
			role="img"
			aria-labelledby="svgPinTitle"
			className={className}
		>
			<title id="svgPinTitle">Map pin icon</title>
			<path
				d="M19.6004 9.6C19.6004 16.8 10.0004 24 10.0004 24C10.0004 24 0.400391 16.8 0.400391 9.6C0.400391 7.05392 1.41182 4.61212 3.21217 2.81178C5.01252 1.01143 7.45431 0 10.0004 0C12.5465 0 14.9883 1.01143 16.7886 2.81178C18.589 4.61212 19.6004 7.05392 19.6004 9.6Z"
				fill="#DC2626"
			/>
			<path
				d="M10.0004 13.2C11.9886 13.2 13.6004 11.5882 13.6004 9.6C13.6004 7.61178 11.9886 6 10.0004 6C8.01217 6 6.40039 7.61178 6.40039 9.6C6.40039 11.5882 8.01217 13.2 10.0004 13.2Z"
				fill="#DC2626"
			/>
			<path
				d="M10.0004 13.2C11.9886 13.2 13.6004 11.5882 13.6004 9.6C13.6004 7.61178 11.9886 6 10.0004 6C8.01217 6 6.40039 7.61178 6.40039 9.6C6.40039 11.5882 8.01217 13.2 10.0004 13.2Z"
				fill="#991B1B"
			/>
		</svg>
	);
}
