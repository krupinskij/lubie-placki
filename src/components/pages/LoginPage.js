import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { loginUser } from '../../redux/actions/loginActions'

class LoginPage extends React.Component {
    state = {
        login: "",
        password: ""
    }

    changeValue = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            login: this.state.login,
            password: this.state.password
        }
console.log(user);
        this.props.loginUser(user);
    }

	render() {

		return (
			<div className="page">
                <form className="form add-recipe-form" onSubmit={this.handleSubmit}>
                    <h2 className="form__header">Zaloguj się</h2>

                    <div className="form__section">
						<label className="form__label" htmlFor="login">Login: </label>
						<input className="form__input" id="login" name="login" type="login" onChange={this.changeValue} />
					</div>

                    <div className="form__section">
						<label className="form__label" htmlFor="password">Hasło: </label>
						<input className="form__input" id="password" name="password" type="password" onChange={this.changeValue} />
					</div>

                    <input className="form__submit" type="submit" value="Zaloguj się" />

                    <span className="form__direction">Nie masz jeszcze konta? <Link className="form__link" to="/register">Zarejestruj się!</Link></span>
                </form>
            </div>
		)
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	console.log(state)
	return {
	  user: state.user,
	  isLogging: state.logging
	}
  }
  
  const mapDispatchToProps = (dispatch) => ({
	loginUser: (user) => dispatch(loginUser(user))
  })
  
  export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(LoginPage)

// export default LoginPage;