import React, { useState, useEffect } from "react";

function Dashboard() {
	const [events, setEvents] = useState([]);
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		fetch("http://localhost:5000/api/events")
			.then((res) => res.json())
			.then((data) => {
				console.log("Fetched events:", data); // Debugging log
				setEvents(data);
				setFilteredEvents(data); // Display all events by default
			})
			.catch((error) => console.error("Error fetching events:", error));
	}, []);

	const handleCreateEvent = async () => {
		const response = await fetch("http://localhost:5000/api/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ name, description, date }),
		});
		if (response.ok) {
			alert("Event Created");
			window.location.reload();
		} else {
			alert("Event creation failed");
		}
	};

	const showUpcomingEvents = () => {
		const now = new Date();
		const upcoming = events.filter((event) => new Date(event.date) >= now);
		setFilteredEvents(upcoming);
	};

	const showPastEvents = () => {
		const now = new Date();
		const past = events.filter((event) => new Date(event.date) < now);
		setFilteredEvents(past);
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
					Event Dashboard
				</h2>

				{/* Create Event Section */}
				<div className="mb-6">
					<h3 className="text-xl font-semibold mb-4">Create Event</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<input
							type="text"
							placeholder="Event Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="p-2 border rounded-md w-full"
						/>
						<input
							type="text"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="p-2 border rounded-md w-full"
						/>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="p-2 border rounded-md w-full"
						/>
					</div>
					<button
						onClick={handleCreateEvent}
						className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
					>
						Create Event
					</button>
				</div>

				{/* Event Filter Buttons */}
				<div className="flex justify-center space-x-4 mb-6">
					<button
						onClick={() => setFilteredEvents(events)}
						className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
					>
						Show All Events
					</button>
					<button
						onClick={showUpcomingEvents}
						className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
					>
						Upcoming Events
					</button>
					<button
						onClick={showPastEvents}
						className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
					>
						Past Events
					</button>
				</div>

				{/* Event List */}
				<div>
					<h3 className="text-xl font-semibold mb-4">Events</h3>
					{filteredEvents.length > 0 ? (
						<div className="grid gap-4">
							{filteredEvents.map((event) => (
								<div
									key={event._id}
									className="bg-gray-50 p-4 rounded-lg shadow-md border-l-4 border-blue-500"
								>
									<h4 className="text-lg font-bold">{event.name}</h4>
									<p className="text-gray-600">{event.description}</p>
									<p className="text-sm text-gray-500">
										📅 {new Date(event.date).toLocaleString()}
									</p>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-500 text-center">No events found.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
