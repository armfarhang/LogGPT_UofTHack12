const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

let logPath = process.env.LOG_PATH || path.join(__dirname, "logs", "ShirazLog"); //c:Document/ShirazLog

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/message", (req, res) => {
	fs.readFile(logPath, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading syslog file:", err.message);
			return res.status(500).json({ error: "Error reading syslog file" });
		}
		res.json({ message: data });
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
