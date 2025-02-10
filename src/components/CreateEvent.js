import React, { useState } from "react";

function CreateEvent() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log({ name, description, date });
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Event Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<textarea
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
			/>
			<input
				type="datetime-local"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				required
			/>
			<button type="submit">Create Event</button>
		</form>
	);
}

export default CreateEvent;
