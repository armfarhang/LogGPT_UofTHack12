import "./InfoHud.css";
import React, { useEffect, useState, useMemo } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { motion } from "framer-motion";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import TuneIcon from "@mui/icons-material/Tune";
import Loading from "./Loading";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import Card from "./Card";


interface InfoHudProps {
  story: string;
  setStory: React.Dispatch<React.SetStateAction<string>>; // Function to update the story
}

const InfoHud: React.FC<InfoHudProps> = ({ setStory }) => {
  const [fileContent, setFileContent] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false); // To control dropdown visibility
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchingMessage, setFetchingMessage] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(14); // Initial font size
  const [showFirstButton, setShowFirstButton] = useState(true);
  const [selectedMode, setSelectedMode] = useState<string>('live');

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
  };

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
    return lines.slice(-100).map((line, index) => {
      let highlightedLine = line;
      const keywords = [
        { word: 'shiraz', color: 'red' },
        { word: 'Error', color: 'red' },
        { word: 'Warning', color: 'orange' },
        { word: 'System', color: 'blue' },
        { word: 'Array', color: 'green' },
        { word: 'Login', color: 'purple' }
      ];

      keywords.forEach(({ word, color }) => {
        const regex = new RegExp(word, 'gi');
        highlightedLine = highlightedLine.replace(regex, match => `<span style="color: ${color};">${match}</span>`);
      });

      return `<div style="margin-bottom: 10px;">${index + 1}: ${highlightedLine}</div>`;
    }).join("");
  };

  const getRawContent = () => {
    const lines = fileContent.split("\n");
    return lines.slice(-100).join("\n");
  };

  const increaseFontSize = () => setFontSize(prevSize => Math.min(prevSize + 2, 30));
  const decreaseFontSize = () => setFontSize(prevSize => Math.max(prevSize - 2, 10));

  const toggleButton = () => {
    setShowFirstButton(prevState => !prevState);
    const logViewer = document.querySelector('.log_viewer');
    if (logViewer) {
      logViewer.scrollTo({
        top: showFirstButton ? logViewer.scrollHeight : 0,
        behavior: 'smooth'
      });
    }
  };

  const parseLogs = (logs: string) => {
    const lines = logs.split("\n").slice(-100); // Only parse the last 100 lines
    const groupedLogs: { error: string[], warning: string[], login: string[] } = {
      error: [],
      warning: [],
      login: []
    };
  
    lines.forEach(line => {
      if (/error/i.test(line)) {
        groupedLogs.error.push(line);
      } else if (/warning/i.test(line)) {
        groupedLogs.warning.push(line);
      } else if (/login/i.test(line)) {
        groupedLogs.login.push(line);
      }
    });
  
    const cards = [];
    if (groupedLogs.error.length > 0) {
      cards.push(
        <Card
          key="error"
          title="Error"
          imageUrl=""
          content={groupedLogs.error}
          chosenLogLine="Error Logs"
          type={1}
        />
      );
    }
    if (groupedLogs.warning.length > 0) {
      cards.push(
        <Card
          key="warning"
          title="Warning"
          imageUrl=""
          content={groupedLogs.warning}
          chosenLogLine="Warning Logs"
          type={2}
        />
      );
    }
    if (groupedLogs.login.length > 0) {
      cards.push(
        <Card
          key="login"
          title="Login"
          imageUrl=""
          content={groupedLogs.login}
          chosenLogLine="Login Logs"
          type={3}
        />
      );
    }
  
    return cards.slice(0, 25); // Limit to 25 cards
  };
  

  const parsedCards = useMemo(() => parseLogs(fileContent), [fileContent]);

  const fetchData = async () => {
    try {
      setFetchingMessage(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay for fetching message
      const response = await axios.get('/api/message'); // Use the proxied URL
      const newContent = response.data.message;
      setFileContent(prevContent => {
        if (prevContent.includes(newContent)) {
          return prevContent; // No change if new content is already included
        }
        return prevContent + "\n" + newContent;
      });
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setFetchingMessage(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (fileContent) {
      setStory(getRawContent());
    }
  }, [fileContent]); // Update when fileContent changes

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
      <div className="top_header_info_hudNew">
        <div className="expandable_toolSet">
          <div className="normal_state">
            <div style={{display:"flex",alignItems:"center", justifyContent:"center", fontFamily:"inter", gap:"5px", fontSize:"12px"}}>
              <IoIosSettings/>
              Settings
            </div>
            
            </div>
          <div className="expanded_state">
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

            <div className="difModeContainer">
              <div
                className={`liveBtn BTN2 ${selectedMode === 'live' ? 'selected' : ''}`}
                onClick={() => handleModeChange('live')}
              >
                <LogoDevIcon />
                <div>Live</div>
              </div>
              <div
                className={`notifiBtn BTN2 ${selectedMode === 'notifi' ? 'selected' : ''}`}
                onClick={() => handleModeChange('notifi')}
              >
                <NotificationsIcon />
                <div>Notifi</div>
              </div>
            </div>
            <div
              className="adjustBtn BTN1"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <TuneIcon style={{ marginRight: "5px" }} />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="line-controls ">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Last 100 Lines
            </button>
          </div>
        )}
      </div>
      

        <div className="zoom-controls">
          <button className="BTN6" onClick={decreaseFontSize}>-</button>
          <button className="BTN6" onClick={increaseFontSize}>+</button>
        </div>
      
      

      <div className="loadingContainer" style={{ display: loading ? 'block' : 'none' }}>
        <Loading />
        <div className="loadingText">Please wait while we fetch</div>
        <div className="loadingText">the logs</div>
      </div>
      {fetchingMessage && <div className="fetchingMessage" style={{position:"absolute",top:"0"}}>
        <Stack sx={{ color: 'wheat' }} spacing={2} direction="row" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <CircularProgress color="inherit" size={30}/>
          <div style={{ color: 'wheat', marginLeft: '10px', fontFamily:"Inter", fontSize:"12px" }}>Fetching data</div>
        </Stack>  
      </div>}
      <div>
        {showFirstButton ? (
          <button className="scrollUpBtn BTN2" onClick={toggleButton}>            
            <IoIosArrowDown/>
          </button>
        ) : (
          <button className="scrollUpBtn BTN2" onClick={toggleButton}>
            <IoIosArrowUp />
          </button>
        )}
      </div>
      {error && <div>{error}</div>}
      {selectedMode === 'live' && (
        <div className="log_viewer" style={{ fontSize: `${fontSize}px` }}>
          {!loading && (
            <pre dangerouslySetInnerHTML={{ __html: getFilteredContent() }} />
          )}
        </div>
      )}

      {selectedMode === 'notifi' && (
         <div className="log_viewer" style={{ fontSize: `${fontSize}px` }}>
          {parsedCards}
        </div>
      )}
      <div className="upload_log"></div>
      
  
    </motion.div>
  );
};

export default InfoHud;