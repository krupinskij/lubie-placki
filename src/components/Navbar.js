import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav>
			<h1>Lubie Placki</h1>
			<ul>
				<li><Link to="/">Przepisy</Link></li>
				<li><Link to="/random">Losuj</Link></li>
				<li><Link to="/add">Dodaj</Link></li>
				<li><Link to="/top">Topka</Link></li>
			</ul>
			<ul>
				<li><Link to="/?type=makowiec">Makowce</Link></li>
				<li><Link to="/?type=sernik">Serniki</Link></li>
				<li><Link to="/?type=piernik">Pierniki</Link></li>
				<li><Link to="/?type=swiateczne">Świąteczne</Link></li>
			</ul>
		</nav>
	)
}

export default Navbar;