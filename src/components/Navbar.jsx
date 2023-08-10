import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="navbar justify-content-center">
            <Link to={'/'} className="text-decoration-none text-warning title"><h1>Pokedex</h1></Link>
        </div>
    )
}

export default Navbar;