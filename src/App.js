import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CreateEvent from "./components/CreateEvent";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/create-event" element={<CreateEvent />} />
			</Routes>
		</Router>
	);
}

export default App;
