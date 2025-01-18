import "./InfoHud.css";
import React, { useEffect, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { motion } from "framer-motion";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import TuneIcon from "@mui/icons-material/Tune";
import Loading from "./Loading";

interface InfoHudProps {
	story: string;
	setStory: React.Dispatch<React.SetStateAction<string>>; // Function to update the story
}

const InfoHud: React.FC<InfoHudProps> = ({ setStory }) => {
	const [numLines, setNumLines] = useState<number>(5); // Default to last 5 lines
	const [fileContent, setFileContent] = useState<string>("");
	const [isOpen, setIsOpen] = useState(false); // To control dropdown visibility

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const text = e.target?.result as string;
				setFileContent(text);
			};
			reader.readAsText(file);
		}
	};

	const [adjustable2Width, setAdjustable2Width] = useState(35); // Initial width of adjustable2

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		const startX = e.clientX;
		const startWidth = adjustable2Width;

		const handleMouseMove = (event: { clientX: number }) => {
			const deltaX = event.clientX - startX;
			const newWidth = Math.max(
				20,
				Math.min(80, startWidth - (deltaX / window.innerWidth) * 100)
			);
			setAdjustable2Width(newWidth);
		};

		const handleMouseUp = () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	};

	const getFilteredContent = () => {
		const lines = fileContent.split("\n");
		return lines.slice(-numLines).join("\n");
	};

	useEffect(() => {
		if (fileContent) {
			setStory(getFilteredContent());
		}
	}, [fileContent, numLines]); // Update when fileContent or numLines changes

	return (
		<motion.div
			className="info_hud_main"
			style={{
				width: `${adjustable2Width}%`,
			}}
			initial={{ opacity: 0, x: "100%" }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.7 }}
		>
			<div
				className="resize-bar"
				onMouseDown={handleMouseDown}
				style={{
					position: "absolute",
					cursor: "col-resize",
					width: "5px",
					backgroundColor: "#444",
				}}
			/>
			<div className="top_header_info_hud">
				<div className="top_header_info_hud_top_right_btn">
					<input
						type="file"
						accept=".txt"
						id="fileInput"
						style={{ display: "none" }}
						onChange={handleFileUpload}
					/>
					<button
						className="upload_text_btn BTN1"
						onClick={() => document.getElementById("fileInput")?.click()}
					>
						<UploadFileIcon />
					</button>
				</div>

				<div
					className="adjustBtn BTN1 "
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					<TuneIcon style={{ marginRight: "5px" }} />
				</div>

				<div className="difModeContainer">
					<div className="liveBtn BTN2">
						<LogoDevIcon />
						<div>Live</div>
					</div>
					<div className="notifiBtn  BTN2">
						<NotificationsIcon />
						<div>Notifi</div>
					</div>
				</div>

				{isOpen && (
					<div className="line-controls ">
						<button
							onClick={() => {
								setNumLines(5);
								setIsOpen(!isOpen);
							}}
						>
							Last 5 Lines
						</button>
						<button
							onClick={() => {
								setNumLines(50);
								setIsOpen(!isOpen);
							}}
						>
							Last 50 Lines
						</button>
						<button
							onClick={() => {
								setNumLines(100);
								setIsOpen(!isOpen);
							}}
						>
							Last 100 Lines
						</button>
						<button
							onClick={() => {
								setNumLines(300);
								setIsOpen(!isOpen);
							}}
						>
							Last 300 Lines
						</button>
						<button onClick={() => setNumLines(fileContent.split("\n").length)}>
							Show All
						</button>
					</div>
				)}
			</div>

			<div className="upload_log"></div>
			<div className="log_viewer">{getFilteredContent()}</div>
			<div className="loadingContainer">
				<Loading />
			</div>
		</motion.div>
	);
};

export default InfoHud;
