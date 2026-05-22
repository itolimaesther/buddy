import React, { useState } from "react";
import { cn } from "../lib/utils";
import type { ButtonProps } from "../../types";

const variantBase: Record<string, string> = {
	primary: "bg-primary text-white hover:bg-primaryHover",
	outline: "bg-transparent text-dark border border-gray200 hover:bg-gray100",
	ghost: "bg-transparent text-gray600 hover:bg-gray100",
	danger: "bg-red text-white hover:bg-red-600",
};

const sizeBase: Record<string, string> = {
	sm: "text-[13px] px-4 py-2",
	md: "text-[15px] px-6 py-[13px]",
};

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	onClick,
	disabled = false,
	fullWidth = false,
	size = "md",
	icon,
	type = "button",
	className,
}) => {
	const [hovered, setHovered] = useState(false);

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			aria-disabled={disabled}
			className={cn(
				"inline-flex items-center justify-center gap-2",
				"font-semibold rounded-[10px] outline-none",
				"transition-all duration-150 ease-in-out",
				"cursor-pointer disabled:cursor-not-allowed disabled:opacity-55",
				variantBase[variant],
				sizeBase[size],
				fullWidth && "w-full",
				hovered && "hover:bg-blue-400",
				className,
			)}
		>
			{icon && <span className="shrink-0">{icon}</span>}
			{children}
		</button>
	);
};
