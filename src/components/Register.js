import React, { useState } from "react";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async () => {
		const response = await fetch("http://localhost:5000/api/auth/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});
		const data = await response.json();
		if (data.message === "User registered") {
			window.location.href = "/login";
		} else {
			alert("Registration failed. Try again!");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center text-gray-800">
					Register
				</h2>
				<div className="mt-4">
					<input
						type="text"
						placeholder="Full Name"
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="mt-3">
					<input
						type="email"
						placeholder="Email Address"
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
					onClick={handleRegister}
				>
					Register
				</button>
				<p className="text-center mt-4 text-gray-600">
					Already have an account?{" "}
					<a href="/login" className="text-blue-500 hover:underline">
						Login
					</a>
				</p>
			</div>
		</div>
	);
}

export default Register;
