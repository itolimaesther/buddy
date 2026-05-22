import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Logo, Avatar } from "../../components/ui";
import { NAV_ITEMS } from "../../constants";
import { useAuthStore } from "../../store";
import { cn } from "../lib/utils";
import AvatarInf from "../../assets/avatar7.png"

export const Sidebar: React.FC = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const logout = useAuthStore((s) => s.logout);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<aside className="w-[240px] shrink-0 bg-white border-r border-gray100 flex flex-col h-screen sticky top-0 z-20">
			{/* Logo */}
			<div className="px-5 pt-7 pb-5">
				<Logo />
			</div>

			{/* Nav */}
			<nav
				className="flex-1 px-3 py-2 flex flex-col gap-0.5 overflow-y-auto"
				aria-label="Main navigation"
			>
				{NAV_ITEMS.map(({ id, path, label, icon: Icon }) => {
					const isActive = pathname === path || pathname.startsWith(path + "/");
					return (
						<button
							key={id}
							onClick={() => navigate(path)}
							aria-current={isActive ? "page" : undefined}
							className={cn(
								"relative flex items-center gap-3 w-full text-left",
								"px-3.5 py-[11px] rounded-[10px] border-none",
								"text-[14px] font-medium transition-all duration-150 cursor-pointer",
								isActive
									? "bg-white text-primary font-semibold shadow-2xl"
									: "bg-transparent text-gray500 hover:bg-gray50 hover:text-gray700",
							)}
						>
							{isActive && (
								<span
									aria-hidden="true"
									className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-primary rounded-r-[3px]"
								/>
							)}
							<Icon
								size={18}
								className={isActive ? "text-primary" : "text-gray400"}
							/>
							{label}
						</button>
					);
				})}
			</nav>

			{/* User + Logout */}
			<div className="px-3 pb-6 pt-4 border-t border-gray100">
				<div className="flex items-center gap-2.5 px-3 py-2 mb-2">
					<Avatar src={AvatarInf} size={40} />
					<div className="flex-1 min-w-0">
						<p className="m-0 text-[13px] font-semibold text-dark truncate">
							Theresa Milly
						</p>
						<p className="m-0 text-[11px] text-gray400">Influencer</p>
					</div>
				</div>
				<button
					type="button"
					onClick={handleLogout}
					className={
						"flex items-center gap-2 w-full justify-center px-3.5 py-2.5 rounded-[10px] " +
						"border border-primaryBorder bg-primary/30 text-primary " +
						"text-[13px] font-semibold cursor-pointer " +
						"hover:bg-white hover:text-primary transition-colors duration-150"
					}
				>
					<LogOut size={15} />
					Logout
				</button>
			</div>
		</aside>
	);
};
