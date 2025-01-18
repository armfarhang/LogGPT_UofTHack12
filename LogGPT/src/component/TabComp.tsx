import "./TabComp.css";
import { motion } from "framer-motion";

import React from "react";
import { IoClose } from "react-icons/io5";

const TabComp: React.FC = () => {
	return (
		<motion.div
			onClick={() => {
				console.log("dad");
			}}
			className="tab BTN3"
			initial={{ opacity: 0, y: "0%" }} // Start from the bottom
			animate={{ opacity: 1, y: 0 }} // Move to its final position
			transition={{ duration: 0.4 }}
			whileTap={{ scale: 0.85 }} // Add click animation
		>
			<div className="tabName">TAB 1</div>
			<button className="exitTabBtn">
				<IoClose size={30} />
			</button>
		</motion.div>
	);
};

export default TabComp;
