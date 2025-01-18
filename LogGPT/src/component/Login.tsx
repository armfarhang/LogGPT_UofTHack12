import { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./Login.css";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Handle login logic here
		console.log("Username:", username);
		console.log("Password:", password);
	};

	const handleGoogleLoginSuccess = (response: any) => {
		console.log("Google login success:", response);
		// Handle Google login success logic here
	};

	const handleGoogleLoginFailure = (error: any) => {
		console.error("Google login failure:", error);
		// Handle Google login failure logic here
	};

	return (
		<div className="login-container">
			<div>
				<img src="/src/assets/logGptLogo.png" alt="LogGPT logo" className="logo" />
			</div>
			<h1>LogGPT</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<div className="google-login">
				<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
					<GoogleLogin
						onSuccess={handleGoogleLoginSuccess}
						// onFailure={handleGoogleLoginFailure}
					/>
				</GoogleOAuthProvider>
			</div>
			<div className="create-account">
				<p>
					Don't have an account? <a href="/register">Create one</a>
				</p>
			</div>
		</div>
	);
}

export default Login;
