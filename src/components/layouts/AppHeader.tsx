import React from "react";
import { Search, Plus, Bell } from "lucide-react";
import type { AppHeaderProps } from "../../types";

export const AppHeader: React.FC<AppHeaderProps> = ({ title }) => (
	<header
		className={
			"flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 px-4 py-3 sm:px-7 sm:py-5 " +
			"sticky top-0 z-10 bg-gray50/95 backdrop-blur-sm border-b border-gray100 sm:border-none"
		}
	>
		{/* Page Title */}
		<h1 className="m-0 flex-1 sm:flex-initial md:flex-1 text-[18px] sm:text-[22px] font-bold text-dark truncate">
			{title}
		</h1>

		{/* Actions container layout configuration adjustment for compact views */}
		<div className="flex items-center gap-2 order-3 sm:order-2 ml-auto sm:ml-0">
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
		</div>

		<div
			className={
				"flex items-center gap-2 bg-gray50 border border-gray200 " +
				"rounded-[10px] px-3.5 py-2 w-full sm:w-55 order-2 sm:order-3"
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
	</header>
);
