import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Show from "./components/Show";

function App() {
	return (
		<>
		<Routes>
			<Route path="/" element={<Home/>}/>
			{/* set the id to a variable value "/show/{id}" */}
			<Route path="/show/:id" element={<Show/>}/>
		</Routes>
		</>
	);
}

export default App;