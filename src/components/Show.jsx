import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import "../App.css";
import axios from "axios";
import Navbar from "./Navbar";

function Show() {
	let {id} = useParams();
	id = id.replace(":", "");
	let [pokemonData, setPokemonData] = useState({});
	let [pokemonPrevName, setPokemonPrevName] = useState("");
	let [pokemonNextName, setPokemonNextName] = useState("");
	let [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((results) => {
			setPokemonData(results.data);
			setLoading(false);
		});
	}, [id]);

	// finding the previous pokemon name to use it in the url
	useEffect(() => {
		if (pokemonData.name && parseInt(pokemonData.id) != 1) {
			axios
				.get(
					`https://pokeapi.co/api/v2/pokemon/${parseInt(pokemonData.id) - 1}`
				)
				.then((results) => {
					setPokemonPrevName(results.data.name);
				});
		}
	}, [pokemonData]);

	// finding the next pokemon name to use it in the url
	useEffect(() => {
		if (pokemonData.name) {
			axios
				.get(
					`https://pokeapi.co/api/v2/pokemon/${parseInt(pokemonData.id) + 1}`
				)
				.then((results) => {
					setPokemonNextName(results.data.name);
				});
		}
	}, [pokemonData]);

	// useEffect(() => {
	//     axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonData.id - 1}
	// function menageNext() {
	//     axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonData.id + 1}`).then((results) => {
	//         setPokemonData(results.data);
	//         setLoading(false);
	//     })
	// }

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!pokemonData || Object.keys(pokemonData).length === 0) {
		return <div>Dati del Pokémon non disponibili.</div>;
	}

	return (
		<>
			<Navbar />
			<div className="container d-flex flex-column align-items-center">
				<h1 className="my-2">
					{pokemonData.name} N°{pokemonData.id}
				</h1>

				<img
					src={pokemonData.sprites.other?.["official-artwork"].front_default}
				/>

				<div className="images">
					<img src={pokemonData.sprites.back_default} />
					<img src={pokemonData.sprites.front_default} />
					<img src={pokemonData.sprites.front_shiny} />
					<img src={pokemonData.sprites.back_shiny} />
				</div>

				<div>
					Ability:
					{pokemonData.abilities.map((ability) => (
						<span key={ability.ability.name}> {ability.ability.name} </span>
					))}
				</div>

				{/* {pokemonData.moves.map((move) => (
                <div>{move.move.name}</div>
            ))} */}

				<div className="height my-2">Height: {pokemonData.height}cm</div>

				<div>
					Type:
					{pokemonData.types.map((type) => (
						<span key={type.type.name}> {type.type.name} </span>
					))}
				</div>

				<div>
					{/* disable the prev botton if the id is 1*/}
					{parseInt(pokemonData.id) > 1 ? (
						<button className="btn btn-outline-primary fs-4 my-3 mx-1 button-show">
							<Link to={`/show/:${pokemonPrevName}`} className="text-decoration-none button-show link">Prev</Link>
						</button>
					) : (
						<button disabled className="btn btn-outline-primary fs-4 my-3 mx-1 button-show">
							Prev
						</button>
					)}

					<button className="btn btn-outline-primary fs-4 my-3 mx-1 button-show">
						<Link to={`/show/:${pokemonNextName}`} className="text-decoration-none link">Next</Link>
					</button>
				</div>
			</div>

			{/* <button><Link to={`/show/:${pokemonData.id - 1}`}>prev</Link></button>
            <button><Link to={`/show/:${pokemonData.id + 1}`}>next</Link></button> */}

			{/* The && operator evaluates the expression on the left, and if it is true, it returns the value of the expression on the right. */}
			{/* {parseInt(pokemonData.id) > 1 && (
                <button>
                    <Link to={`/show/:${pokemonPrevName}`}>prev</Link>
                </button>
            )} */}
		</>
	);
}

export default Show;
