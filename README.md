# LogGPT_UofTHack12
Overview

LogGPT is an intelligent server assistant designed to offer a clearer perspective on the often overwhelming task of managing system logs. With a focus on simplifying the complexity of log analysis, LogGPT transforms cryptic messages into clear, actionable insights. By monitoring system logs 24/7, easily monitors server health, alerting users to potential issues such as hardware failures, disk errors, and security threats. The tool helps users see their system in a new light, making technical problems more understandable and actionable.

Inspiration

The project was born out of Armin's experience running a home server with multiple Docker containers and services. Diagnosing problems such as hardware failures, misconfigurations, and disk errors using traditional syslogs was time-consuming and overwhelming. The need for an AI-driven solution to interpret system logs and provide real-time notifications led to the creation of LogGPT.

Tech Stack

Frontend & Backend: React and Node.js for building the user interface and backend services.
Dockerization: The application is Dockerized and deployed on an Unraid server.
Secure Access: VPN for secure SSH connections and deployment, along with Cloudflare tunnels and reverse proxy to securely expose the app to the web.
AI Integration: OpenAI's GPT-3.5 Turbo to power the AI's log analysis and insights.
Communication: FastAPI for seamless communication between Docker containers.
Target Users

LogGPT is targeted at system administrators (sysadmins) who need a clearer perspective on server health and system logs. By transforming overwhelming log data into comprehensible, actionable insights, LogGPT helps sysadmins make faster, more informed decisions. It's also beneficial for amateur users who may struggle to understand the technical jargon found in system logs.

Challenges Faced

Providing access to local files on the host machine within a Dockerized environment. Exposing files and directories to Docker containers via volumes.

Key Learnings

Exposing files and directories to Docker containers through volumes. Managing code versions and organizing development using GitHub. Setting up a simple and visually appealing login page

Future Implementations

A training portal to customize how LogGPT detects issues in system logs.
Implementation of intra-container log analysis (e.g., for Docker container logs).
Development of an encrypted, secure login architecture for enhanced security.
Running a local LLM instead of a 3rd party one to add a layer of security against hacks
Big Picture:

LogGPT has the potential to expand beyond server management, offering a valuable perspective in other domains as well. It can be integrated into banking systems to help sysadmins or users detect malicious activities on their accounts, offering a wide perspective on account health and security. The tool could also be used in any Dockerized application that generates logs, helping users maintain a comprehensive perspective on application performance and security.

We are redefining how we view system logs and errors, LogGPT aims to change how we manage servers. Its potential to simplify complex data and present it in an accessible, actionable format creates a new perspective on server management that benefits both seasoned sysadmins and amateur users alike.
