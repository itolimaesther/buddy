import { z } from "zod";

// ─── Signup Form Schema ────────────────────────────────────────────────────────

export const signupSchema = z.object({
	firstName: z
		.string()
		.min(1, "First name is required")
		.max(50, "First name must be under 50 characters")
		.regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),

	lastName: z
		.string()
		.min(1, "Last name is required")
		.max(50, "Last name must be under 50 characters")
		.regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),

	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid work email"),

	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(15, "Password must be under 15 characters"),
});

export type SignupSchema = z.infer<typeof signupSchema>;

// ─── OTP Schema ───────────────────────────────────────────────────────────────

export const otpSchema = z.object({
	digits: z
		.array(z.string().regex(/^\d$/, "Must be a digit"))
		.length(4, "OTP must be exactly 4 digits"),
});

export type OtpSchema = z.infer<typeof otpSchema>;

// ─── Login Schema ─────────────────────────────────────────────────────────────

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),

	password: z.string().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
