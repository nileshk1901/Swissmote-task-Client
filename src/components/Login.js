import React, { useState } from "react";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		const response = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		if (data.token) {
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));
			window.location.href = "/dashboard";
		} else {
			alert("Invalid credentials");
		}
	};

	const handleGuestLogin = async () => {
		const response = await fetch("http://localhost:5000/api/auth/guest-login", {
			method: "POST",
		});
		const data = await response.json();
		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data.user));
		window.location.href = "/dashboard";
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
				<div className="mt-4">
					<input
						type="email"
						placeholder="Email"
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mt-3">
					<input
						type="password"
						placeholder="Password"
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button
					className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg mt-4 transition-all"
					onClick={handleLogin}
				>
					Login
				</button>
				<button
					className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg mt-2 transition-all"
					onClick={handleGuestLogin}
				>
					Guest Login
				</button>
				<p className="text-center mt-4 text-gray-600">
					Don't have an account?{" "}
					<a href="/register" className="text-blue-500 hover:underline">
						Register
					</a>
				</p>
			</div>
		</div>
	);
}

export default Login;
