import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names with proper override resolution.
 * Thin wrapper around clsx + tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/**
 * Generate initials from a display name.
 * @example getInitials("Theresa Milly") // "TM"
 */
export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
}

/**
 * Naive email format validation (use zod for full validation).
 */
export function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Format a number with a leading "+" when positive.
 */
export function formatChange(value: number): string {
	return value >= 0 ? `+${value}%` : `${value}%`;
}
