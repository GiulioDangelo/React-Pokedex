import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Card({query}) {
	let [pokedex, setPokedex] = useState([]);
	let [currentPage, setCurrentPage] = useState(
		"https://pokeapi.co/api/v2/pokemon/?limit=20"
	);
	const [nextPage, setNextPage] = useState();
	const [prevPage, setPrevPage] = useState();

	// if the search input is true,fetch trough all pokemon
	if (query) {
		currentPage = `https://pokeapi.co/api/v2/pokemon/?limit=99999`;
	}

	useEffect(() => {
		axios.get(currentPage).then((results) => {
			setPokedex(results.data.results);
			setNextPage(results.data.next);
			setPrevPage(results.data.previous);
		});
	}, [currentPage]); // By passing an empty array, the effect is only executed during the initial mounting of the component. On the other hand, if you provide a variable within 	the array, the effect will be triggered whenever that variable updates.

	function goPrevPage() {
		setCurrentPage(prevPage);
	}

	function goNextPage() {
		setCurrentPage(nextPage);
	}

	return (
		<>
			{/* use the query to filter the pokedex result */}
			{pokedex
				.filter((pokedex) => {
					return query.toLowerCase() === ""
						? pokedex
						: pokedex.name.toLowerCase().includes(query);
				})
				.map((pokemon) => (
					<div
						className="card-container m-5 d-flex flex-column align-items-center card"
						key={pokemon.name}
					>
						<PokemonDetails pokemonName={pokemon.name} />
						<div className="my-2">{pokemon.name}</div>
						<button
							type="button"
							className="mb-1 btn btn-outline-primary button-show"
						>
							<Link
								to={`/show/:${pokemon.name}`}
								className="link text-decoration-none"
							>
								Details
							</Link>
						</button>
					</div>
				))}

			<div
				className="btn-group container d-flex justify-content-center"
				role="group"
				aria-label="Basic outlined example"
			>
				<button
					onClick={goPrevPage}
					type="button"
					className="btn btn-outline-primary fs-4 my-3 mx-1 changePage"
				>
					Prev
				</button>
				<button
					onClick={goNextPage}
					type="button"
					className="btn btn-outline-primary fs-4 my-3 mx-1 changePage"
				>
					Next
				</button>
			</div>
		</>
	);
}

function PokemonDetails({pokemonName}) {
	const [pokemonDetails, setPokemonDetails] = useState(null);

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
			.then((response) => {
				setPokemonDetails(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [pokemonName]);

	if (!pokemonDetails) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<img src={pokemonDetails.sprites.front_default} className="img border" />

			<div>({pokemonDetails.types[0].type.name})</div>
		</>
	);
}

export default Card;
