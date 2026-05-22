import React from "react";

interface MiniChartProps {
	up: boolean;
}

const UP_POINTS = "0,20 10,15 20,18 30,10 40,12 50,6 60,8 70,4";
const DOWN_POINTS = "0,8 10,10 20,6 30,14 40,12 50,16 60,14 70,18";

export const MiniChart: React.FC<MiniChartProps> = ({ up }) => (
	<svg
		width="72"
		height="24"
		viewBox="0 0 72 24"
		aria-hidden="true"
		className="shrink-0"
	>
		<polyline
			points={up ? UP_POINTS : DOWN_POINTS}
			fill="none"
			stroke="var(--color-primary)"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<circle cx="70" cy={up ? 4 : 18} r="3" fill="var(--color-primary)" />
	</svg>
);
