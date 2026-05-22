import { useState, useRef, useCallback } from "react";

const OTP_LENGTH = 4;

interface UseOtpInputReturn {
	digits: string[];
	refs: React.RefObject<HTMLInputElement | null>[];
	isFilled: boolean;
	otpValue: string;
	handleChange: (index: number, value: string) => void;
	handleKeyDown: (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => void;
	reset: () => void;
}

export function useOtpInput(): UseOtpInputReturn {
	const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));

	//    hook calls on every render.
	const ref0 = useRef<HTMLInputElement>(null);
	const ref1 = useRef<HTMLInputElement>(null);
	const ref2 = useRef<HTMLInputElement>(null);
	const ref3 = useRef<HTMLInputElement>(null);

	const refs = [
		ref0,
		ref1,
		ref2,
		ref3,
	] as React.RefObject<HTMLInputElement | null>[];

	const isFilled = digits.every((d) => d !== "");
	const otpValue = digits.join("");

	const handleChange = useCallback(
		(index: number, value: string) => {
			// Only allow a single digit
			if (!/^\d?$/.test(value)) return;

			setDigits((prev) => {
				const next = [...prev];
				next[index] = value;
				return next;
			});

			if (value && index < OTP_LENGTH - 1) {
				refs[index + 1].current?.focus();
			}
		},
		
		[],
	);

	const handleKeyDown = useCallback(
		(index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Backspace" && !digits[index] && index > 0) {
				refs[index - 1].current?.focus();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[digits],
	);

	const reset = useCallback(() => {
		setDigits(Array(OTP_LENGTH).fill(""));
		refs[0].current?.focus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		digits,
		refs,
		isFilled,
		otpValue,
		handleChange,
		handleKeyDown,
		reset,
	};
}
