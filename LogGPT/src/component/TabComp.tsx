import "./TabComp.css";
import { motion } from "framer-motion";

import React from "react";
import { IoClose } from "react-icons/io5";

interface TabCompProps {
  tabId: number;
  onDelete: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

const TabComp: React.FC<TabCompProps> = ({ tabId, onDelete, onSelect, isSelected }) => {
  console.log("TabComp received tabId:", tabId);
  return (
    <motion.div
      onClick={onSelect}
      className={`tab BTN3 ${isSelected ? "selected" : ""}`}
      initial={{ opacity: 0, y: "0%" }} // Start from the bottom
      animate={{ opacity: 1, y: 0 }} // Move to its final position
      transition={{ duration: 0.4 }}
      whileTap={{ scale: 0.85 }} // Add click animation
      style={{
        backgroundColor: isSelected ? "#403420" : undefined, // Set to "wheat" if selected, otherwise no background color
        color: isSelected ? "wheat" : "wheat", // Set to "black" if selected, otherwise no text color
      }}
    >
      <div className="tabName">TAB {tabId}</div>
      <button
        className="exitTabBtn"
        onClick={(e) => {
          e.stopPropagation(); // Prevent event propagation
          console.log("Button clicked, tabId:", tabId);
          onDelete(); // Call the delete function
        }}
      >
        <IoClose size={30} />
      </button>
    </motion.div>
  );
};

export default TabComp;
