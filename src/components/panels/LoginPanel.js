import React from 'react';
import { Link } from 'react-router-dom'

class LoginPanel extends React.Component {
	render() {
		return (
			<div className="navbar__account-container">
				<Link className="navbar__account" to="/login">
					<span className="navbar__login-text">Zaloguj się <br/> lub zarejestruj</span> 
					<img className="navbar__photo" src="http://localhost:3004/users/default/avatar" alt="default avatar"/>
				</Link>
			</div>
		)
	}
}

export default LoginPanel;