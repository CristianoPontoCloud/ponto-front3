import { useEffect, useState } from "react";

const SMALL_BREAKPOINT = 640;
const MEDIUM_BREAKPOINT = 768;
const LARGE_BREAKPOINT = 1024;
// const XLARGE_BREAKPOINT = 1280;

interface UseBreakPointsParams {
	smSize: string;
	mdSize: string;
	lgSize: string;
	xlSize: string;
}

export function useBreakPoints({
	smSize,
	mdSize,
	lgSize,
	xlSize,
}: UseBreakPointsParams) {
	const [currentSize, setCurrentSize] = useState<string>("");

	useEffect(() => {
		const updateSize = () => {
			const width = window.innerWidth;
			if (width < SMALL_BREAKPOINT) {
				setCurrentSize(smSize);
				return;
			}
			if (width < MEDIUM_BREAKPOINT) {
				setCurrentSize(mdSize);
			}
			if (width < LARGE_BREAKPOINT) {
				setCurrentSize(lgSize);
				return;
			}
			setCurrentSize(xlSize);
		};

		window.addEventListener("resize", updateSize);
		updateSize();

		return () => window.removeEventListener("resize", updateSize);
	}, [smSize, mdSize, lgSize, xlSize]);

	return currentSize;
}
