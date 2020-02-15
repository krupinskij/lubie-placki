import React from 'react'
import { Link } from 'react-router-dom'
import cake from '../svg/cake.svg'
import 'font-awesome/css/font-awesome.min.css';

import LoginPanel from './panels/LoginPanel'
import UserPanel from './panels/UserPanel';
import SearchPanel from './panels/SearchPanel';

import { connect } from 'react-redux'

class Navbar extends React.Component {

	state = {
		display: 'none',
	}
	
	render() {
		const { token } = this.props;

		return (
			<nav className="navbar">
				<header className="navbar__header">
					<img className="navbar__logo" src={cake} alt="logo" />
					<h1 className="navbar__title">Lubię Placki</h1>
				</header>
				{token === null ? <LoginPanel /> : <UserPanel />}
				<div className="navbar__list navbar__list--top">
					<div className="navbar__item"><Link className="navbar__link" to="/">Przepisy</Link></div>
					<div className="navbar__item"><Link className="navbar__link" to="/random">Losuj</Link></div>
					<div className="navbar__item"><Link className="navbar__link" to="/add">Dodaj</Link></div>
					<div className="navbar__item"><Link className="navbar__link" to="/top">Topka</Link></div>
					<SearchPanel />
				</div>
				<div className="navbar__list navbar__list--bottom">
					<div className="navbar__item"><Link className="navbar__link" to="/?type=makowiec">Makowce</Link></div>
					<div className="navbar__item"><Link className="navbar__link" to="/?type=sernik">Serniki</Link></div>
					<div className="navbar__item"><Link className="navbar__link" to="/?type=piernik">Pierniki</Link></div>
					<div className="navbar__item"><Link className="navbar__link" to="/?type=jablecznik">Jabłeczniki</Link></div>
					<div className="navbar__item"><Link className="navbar__link" to="/?type=swiateczne">Świąteczne</Link></div>
					<div className="navbar__item"><Link className="navbar__link" to="/?type=inne">Inne</Link></div>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = state => {

	return {
		token: state.token,
	}
}

export default connect(
	mapStateToProps
)(Navbar)