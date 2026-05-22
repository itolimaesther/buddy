import React from "react";
import { cn } from "../lib/utils";

interface BadgeProps {
	count?: number;
	color?: string;
	className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
	count,
	color = "var(--color-primary)",
	className,
}) => {
	if (!count) return null;

	return (
		<div
			role="status"
			aria-label={`${count} unread`}
			className={cn(
				"inline-flex items-center justify-center",
				"min-w-[18px] h-[18px] rounded-full px-[5px]",
				"text-[10px] font-bold text-white",
				className,
			)}
			style={{ background: color }}
		>
			{count > 99 ? "99+" : count}
		</div>
	);
};
