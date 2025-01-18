import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Login } from "@mui/icons-material";
// import authConfig from './auth-config'; // Ensure this is the correct path to your authConfig file

createRoot(document.getElementById("root")!).render(
	<Auth0Provider
		domain="dev-1ax3i1s5hr1wdg5w.ca.auth0.com"
		clientId="IOmZw4JTAKtgRYPmamDG3vpZxUdged79"
		// authorizationParams={{
		//   redirect_uri: authConfig.redirectUri,
		// }}
	>
		<StrictMode>
			<App />
		</StrictMode>
	</Auth0Provider>
);
