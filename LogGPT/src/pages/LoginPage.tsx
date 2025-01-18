import Login from "../component/Login";
import "./LoginPage.css";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
	return (
		<div className="login-page-container">
			<Login />
		</div>
	);
};

export default LoginPage;
