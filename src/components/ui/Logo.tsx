import React from "react";
import { cn } from "../lib/utils";
import logo from "../../assets/logo.svg";

interface LogoProps {
	size?: number;
	className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <img src={logo} className="w-24 h-24" alt="Buddy Logo" />
		
	</div>
);
