import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import {
	SignupMethodPage,
	SignupFormPage,
	VerifyOTPPage,
	EmailVerifiedPage,
	DashboardPage,
	MessagesPage,
	SigninFormPage
} from "./pages";

// ─── Route definitions ────────────────────────────────────────────────────────

export const router = createBrowserRouter([
	// ── Auth flow ──────────────────────────────────────────────────────────────
	{
		path: "/",
		element: <SignupMethodPage />,
	},
	{
		path: "/signup",
		element: <SignupFormPage />,
	},
	{
		path: "/signin",
		element: <SigninFormPage />,
	},
	{
		path: "/verify-otp",
		element: <VerifyOTPPage />,
	},
	{
		path: "/verified",
		element: <EmailVerifiedPage />,
	},

	// ── Protected app shell (Sidebar + Header via Outlet) ─────────────────────
	{
		path: "/app",
		element: <DashboardLayout />,
		children: [
			// Redirect /app → /app/dashboard
			{
				index: true,
				element: <Navigate to="dashboard" replace />,
			},
			{
				path: "dashboard",
				element: <DashboardPage />,
			},
			{
				path: "messages",
				element: <MessagesPage />,
			},
			{
				path: "group",
				element: <div className="p-6 text-gray500">My Group — coming soon</div>,
			},
			{
				path: "analytics",
				element: (
					<div className="p-6 text-gray500">Analytics — coming soon</div>
				),
			},
			{
				path: "pack",
				element: <div className="p-6 text-gray500">Pack — coming soon</div>,
			},
			{
				path: "settings",
				element: <div className="p-6 text-gray500">Settings — coming soon</div>,
			},
		],
	},

	// ── Catch-all fallback ────────────────────────────────────────────────────
	{
		path: "*",
		element: <Navigate to="/" replace />,
	},
]);
