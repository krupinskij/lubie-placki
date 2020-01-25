import React from 'react'
import { Link } from 'react-router-dom'
import cake from '../svg/cake.svg'
import 'font-awesome/css/font-awesome.min.css';

import LoginPanel from './panels/LoginPanel'
import UserPanel from './panels/UserPanel';

import { connect } from 'react-redux'

class Navbar extends React.Component {
	render() {
	const {user} = this.props;

	return (
		<nav className="navbar">
			<header className="navbar__header">
				<img className="navbar__logo" src={cake} alt="logo"/>
				<h1 className="navbar__title">Lubię Placki</h1>
			</header>
			{user==null ? <LoginPanel/> : <UserPanel/>}
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
}

const mapStateToProps = (state /*, ownProps*/) => {
	
	return {
	  user: state.user,
	}
  }
  
  export default connect(
	mapStateToProps
  )(Navbar)