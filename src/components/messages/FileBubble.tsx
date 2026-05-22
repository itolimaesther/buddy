// // import React from "react";
// import { FileText, FileImage, FileArchive, File, Download } from "lucide-react";
// import type { ChatMessage } from "../../types";

// function formatFileSize(bytes: number): string {
// 	if (bytes < 1_024) return `${bytes} B`;
// 	if (bytes < 1_024 * 1_024) return `${(bytes / 1_024).toFixed(1)} KB`;
// 	return `${(bytes / (1_024 * 1_024)).toFixed(1)} MB`;
// }

// function FileTypeIcon({
// 	mimeType = "",
// 	size = 20,
// }: {
// 	mimeType?: string;
// 	size?: number;
// }) {
// 	if (mimeType.startsWith("image/")) return <FileImage size={size} />;
// 	if (mimeType.includes("zip") || mimeType.includes("compressed"))
// 		return <FileArchive size={size} />;
// 	if (
// 		mimeType.startsWith("text/") ||
// 		mimeType.includes("pdf") ||
// 		mimeType.includes("document")
// 	)
// 		return <FileText size={size} />;
// 	return <File size={size} />;
// }
// export function FileBubble({ msg, isMe }: { msg: ChatMessage; isMe: boolean }) {
// 	return (
// 		<div
// 			className={`rounded-[14px] border p-3 max-w-[280px] ${
// 				isMe
// 					? "bg-primaryLight border-primaryBorder"
// 					: "bg-white border-gray200"
// 			}`}
// 		>
// 			<div className="flex items-center gap-3">
// 				{/* Icon */}
// 				<div
// 					className={`w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 ${
// 						isMe ? "bg-white/70 text-primary" : "bg-gray100 text-gray500"
// 					}`}
// 				>
// 					<FileTypeIcon mimeType={msg.mimeType} size={22} />
// 				</div>

// 				{/* Meta */}
// 				<div className="flex-1 min-w-0">
// 					<p className="m-0 text-[13px] font-semibold text-dark truncate">
// 						{msg.filename}
// 					</p>
// 					{msg.fileSize !== undefined && (
// 						<p className="m-0 mt-0.5 text-[11px] text-gray400">
// 							{formatFileSize(msg.fileSize)}
// 						</p>
// 					)}
// 				</div>

// 				{/* Download */}
// 				{msg.fileUrl && (
// 					<a
// 						href={msg.fileUrl}
// 						download={msg.filename}
// 						aria-label="Download file"
// 						className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-150 ${
// 							isMe
// 								? "text-primary hover:bg-white/50"
// 								: "text-gray400 hover:bg-gray100"
// 						}`}
// 					>
// 						<Download size={16} />
// 					</a>
// 				)}
// 			</div>

// 			{/* Optional caption */}
// 			{msg.text && (
// 				<p
// 					className={`m-0 mt-2 text-[13px] leading-relaxed border-t pt-2 ${
// 						isMe
// 							? "text-primary border-primaryBorder"
// 							: "text-gray600 border-gray100"
// 					}`}
// 				>
// 					{msg.text}
// 				</p>
// 			)}

// 			{/* Timestamp */}
// 			{msg.time && (
// 				<p className="m-0 mt-1.5 text-[11px] text-gray400 text-right">
// 					{msg.time}
// 				</p>
// 			)}
// 		</div>
// 	);
// }
