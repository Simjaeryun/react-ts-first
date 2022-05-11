import React from "react";
import { useState } from "react";
import styled from "styled-components";

function App() {
	const [value, setValue] = useState("");
	const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
		console.log(evt.currentTarget.value);
	};
	return (
		<div className="App">
			<form action="">
				<input
					type="text"
					placeholder="username"
					value={value}
					onChange={onChange}
				/>
				<button>Log In</button>
			</form>
		</div>
	);
}

export default App;
