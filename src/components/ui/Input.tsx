import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../lib/utils";
import type { InputProps } from "../../types";

export const Input: React.FC<InputProps> = ({
	label,
	placeholder,
	type = "text",
	icon: Icon,
	value,
	onChange,
	error,
	hint,
	rightElement,
	name,
	required,
	className,
}) => {
	const [focused, setFocused] = useState(false);
	const [showPw, setShowPw] = useState(false);

	const isPassword = type === "password";
	const inputType = isPassword ? (showPw ? "text" : "password") : type;

	const borderColor = error
		? "border-red"
		: focused
			? "border-primary"
			: "border-gray200";

	return (
		<div className={cn("flex flex-col gap-1", className)}>
			{label && (
				<div className="flex items-center gap-1">
					<label className="text-[13px] font-medium text-gray700">
						{label}
					</label>
					{hint && (
						<span className="text-[11px] text-gray400" title={hint}>
							ⓘ
						</span>
					)}
				</div>
			)}

			<div
				className={cn(
					"flex items-center gap-2.5 rounded-[10px] bg-white",
					"border-[1.5px] transition-colors duration-150",
					"px-3.5",
					borderColor,
				)}
			>
				{Icon && (
					<Icon
						size={16}
						className={cn(
							"shrink-0 transition-colors duration-150",
							focused ? "text-primary" : "text-gray400",
						)}
					/>
				)}

				<input
					name={name}
					type={inputType}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					required={required}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					className={cn(
						"flex-1 border-none outline-none bg-transparent",
						"text-[14px] text-dark py-[13px]",
						"placeholder:text-gray400 font-sans",
					)}
				/>

				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPw((prev) => !prev)}
						className="bg-none border-none cursor-pointer text-gray400 p-0 flex items-center"
						aria-label={showPw ? "Hide password" : "Show password"}
					>
						{showPw ? <Eye size={16} /> : <EyeOff size={16} />}
					</button>
				)}

				{rightElement && (
					<span className="flex items-center shrink-0">{rightElement}</span>
				)}
			</div>

			{error && (
				<span role="alert" className="text-[12px] text-red">
					{error}
				</span>
			)}
		</div>
	);
};
