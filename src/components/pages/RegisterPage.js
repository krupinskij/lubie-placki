import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { registerUser } from '../../redux/actions/registerActions'

class RegisterPage extends React.Component {
	state = {
        username: "",
        password: "",
        repeat: ""
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
            username: this.state.username,
            password: this.state.password
        }

        this.props.registerUser(user);
        this.props.history.push("/");
    }

	render() {
		return (
			<div className="page">
                <form className="form add-recipe-form" onSubmit={this.handleSubmit}>
                    <h2 className="form__header">Zarejestruj się</h2>

                    <div className="form__section">
						<label className="form__label" htmlFor="username">Nazwa użytkownika: </label>
						<input className="form__input" id="username" name="username" type="text" onChange={this.changeValue} />
					</div>

                    <div className="form__section">
						<label className="form__label" htmlFor="password">Hasło: </label>
						<input className="form__input" id="password" name="password" type="password" onChange={this.changeValue} />
					</div>

                    <div className="form__section">
						<label className="form__label" htmlFor="repeat">Powtórz hasło: </label>
						<input className="form__input" id="repeat" name="repeat" type="password" onChange={this.changeValue} />
					</div>

                    <input className="form__submit" type="submit" value="Zarejestruj się" />

                    <span className="form__direction">Masz już konto? <Link className="form__link" to="/login">Zaloguj się!</Link></span>
                </form>
            </div>
		)
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
	  user: state.user,
	  isLogging: state.logging
	}
  }
  
  const mapDispatchToProps = (dispatch) => ({
	registerUser: (user) => dispatch(registerUser(user))
  })

export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(withRouter(RegisterPage))