import React from "react";
import { cn, getInitials } from "../lib/utils";
import type { AvatarProps } from "../../types";

export const Avatar: React.FC<AvatarProps> = ({
	src,
	name,
	size = 36,
	online,
}) => {
	const initials = name ? getInitials(name) : "?";

	const indicatorSize = Math.round(size * 0.28);
	const indicatorShift = Math.round(size * 0.04);

	return (
		<div className="relative shrink-0" style={{ width: size, height: size }}>
			{/* Avatar circle */}
			<div
				className={cn(
					"rounded-full overflow-hidden bg-gray200",
					"flex items-center justify-center",
					"font-semibold text-gray600 select-none",
				)}
				style={{
					width: size,
					height: size,
					fontSize: Math.round(size * 0.35),
				}}
			>
				{src ? (
					<img
						src={src}
						alt={name ?? "avatar"}
						className="w-full h-full object-cover"
					/>
				) : (
					initials
				)}
			</div>

			{/* Online indicator */}
			{online !== undefined && (
				<span
					aria-label={online ? "Online" : "Offline"}
					className={cn(
						"absolute rounded-full border-2 border-white",
						online ? "bg-green" : "bg-gray300",
					)}
					style={{
						width: indicatorSize,
						height: indicatorSize,
						bottom: indicatorShift,
						right: indicatorShift,
					}}
				/>
			)}
		</div>
	);
};
