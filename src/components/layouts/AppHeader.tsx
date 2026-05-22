import React from "react";
import { Search, Plus, Bell } from "lucide-react";
import type { AppHeaderProps } from "../../types";

export const AppHeader: React.FC<AppHeaderProps> = ({ title }) => (
	<header
		className={
			"flex items-center gap-4 px-7 py-5 " +
			"sticky top-0 z-10"
		}
	>
		<h1 className="m-0 flex-1 text-[22px] font-bold text-dark">{title}</h1>

		{/* Search bar */}
		<div
			className={
				"flex items-center gap-2 bg-gray50 border border-gray200 " +
				"rounded-[10px] px-3.5 py-2 w-55"
			}
		>
			<Search size={16} className="text-gray400 shrink-0" />
			<input
				type="search"
				placeholder="Search"
				aria-label="Search"
				className={
					"border-none bg-transparent outline-none text-[14px] " +
					"text-gray600 font-sans w-full placeholder:text-gray400"
				}
			/>
		</div>

		{/* Add button */}
		<button
			type="button"
			aria-label="Add new"
			className={
				"w-9 h-9 rounded-[10px] border border-gray200 bg-white cursor-pointer " +
				"flex items-center justify-center " +
				"hover:bg-gray50 transition-colors duration-150"
			}
		>
			<Plus size={18} className="text-gray600" />
		</button>

		{/* Notifications */}
		<div className="relative">
			<button
				type="button"
				aria-label="Notifications"
				className={
					"w-9 h-9 rounded-[10px] border border-gray200 bg-white cursor-pointer " +
					"flex items-center justify-center " +
					"hover:bg-gray50 transition-colors duration-150"
				}
			>
				<Bell size={18} className="text-gray600" />
			</button>
			<span
				aria-label="New notification"
				className={
					"absolute top-1.5 right-1.5 w-2 h-2 rounded-full " +
					"bg-red border-2 border-white"
				}
			/>
		</div>
	</header>
);
