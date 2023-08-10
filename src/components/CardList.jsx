import {useState} from "react";
import Card from "./Card";

function CardList() {
	const [query, setQuery] = useState("");
	return (
		<>
			<div className="container text-center mt-5">
				<div className="input-group w-75 m-auto">
					<input 
					onChange={(e) => setQuery(e.target.value)}			
					type="Search Pokemon" 
					className="form-control rounded" 
					placeholder="Search" 
					aria-label="Search" 
					aria-describedby="search-addon" 
					/>
					<button type="button" className="btn btn-outline-primary">search</button>
				</div>

				<div className="container d-flex flex-wrap justify-content-center">
					<Card query={query} />
				</div>
			</div>

		</>
	);
}

export default CardList;
