import React from 'react';
import { Link } from 'react-router-dom'

import FA from 'react-fontawesome'

class LoginPanel extends React.Component {
	render() {
		return (
			<div className="navbar__account-container">
				<Link className="navbar__account" to="/login">
					<span className="navbar__login-text">Zaloguj się <br/> lub zarejestruj</span> 
					<FA className="navbar__login-icon" name="user-circle" />
				</Link>
			</div>
		)
	}
}

export default LoginPanel;