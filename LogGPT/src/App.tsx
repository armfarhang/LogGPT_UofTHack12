import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Test from "./pages/Test";
import Login from "./pages/LoginPage";


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
