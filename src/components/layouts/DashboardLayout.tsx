import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { AppHeader } from "./AppHeader";

// ─── Route → page title map ───────────────────────────────────────────────────

const ROUTE_TITLES: Record<string, string> = {
	"/app/dashboard": "My Portfolio",
	"/app/messages": "Messages",
	"/app/group": "My Group",
	"/app/analytics": "Analytics",
	"/app/pack": "Pack",
	"/app/settings": "Settings",
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export const DashboardLayout: React.FC = () => {
	const { pathname } = useLocation();
	const title = ROUTE_TITLES[pathname] ?? "Dashboard";

	return (
		<div className="flex min-h-screen bg-gray50">
			{/* Sticky sidebar */}
			<Sidebar />

			{/* Main content area */}
			<div className="flex-1 flex flex-col overflow-auto min-w-0">
				<AppHeader title={title} />

				{/* Child page renders here */}
				<Outlet />
			</div>
		</div>
	);
};
