import React from 'react'
import { Link } from 'react-router-dom'
import cake from '../cake.svg'

const Navbar = () => {
	return (
		<nav className="navbar">
			<header className="navbar__header">
				<img className="navbar__logo" src={cake} alt="logo"/>
				<h1 className="navbar__title">Lubię Placki</h1>
			</header>
			<ul className="navbar__list navbar__list--top">
				<li className="navbar__item"><Link className="navbar__link" to="/">Przepisy</Link></li>
				<li className="navbar__item"><Link className="navbar__link" to="/random">Losuj</Link></li>
				<li className="navbar__item"><Link className="navbar__link" to="/add">Dodaj</Link></li>
				<li className="navbar__item"><Link className="navbar__link" to="/top">Topka</Link></li>
			</ul>
			<ul className="navbar__list navbar__list--bottom">
				<li className="navbar__item"><Link className="navbar__link" to="/?type=makowiec">Makowce</Link></li>
				<li className="navbar__item"><Link className="navbar__link" to="/?type=sernik">Serniki</Link></li>
				<li className="navbar__item"><Link className="navbar__link" to="/?type=piernik">Pierniki</Link></li>
				<li className="navbar__item"><Link className="navbar__link" to="/?type=jableczniki">Jabłeczniki</Link></li>
				<li className="navbar__item"><Link className="navbar__link" to="/?type=swiateczne">Świąteczne</Link></li>
			</ul>
		</nav>
	)
}

export default Navbar;