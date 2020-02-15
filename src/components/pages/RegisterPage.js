import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { registerUser } from '../../redux/userRedux/actions/register'

import Loading from '../Loading';

import { 
    required, 
    minLength, 
    confirmPassword//,
    //uniqueUsername
} from '../../validation/requirements';
import { validate, canSubmit } from '../../validation/validator';

class RegisterPage extends React.Component {
	state = {
        username: "",
        password: "",
        confirm: "",

        usernameValid: { 
            isValid: false,
            message: ""
        },

        passwordValid: {
            isValid: false,
            message: ""
        },

        confirmValid: {
            isValid: false,
            message: ""
        },

        toSubmit: false
    }

    handleUsernameChange = event => {
        const target = event.target;
        const value = target.value;

        const valid = validate(
            required(value),
            minLength(value, 5),
            //uniqueUsername(value, value, this.state.usernameValid.usernames)
        );

        const toSubmit = canSubmit(
            valid,
            this.state.passwordValid,
            this.state.confirmValid
        )

        this.setState({
            username: value,
            usernameValid: valid,
            toSubmit
        })
    }

    handlePasswordChange = (event) => {
        const target = event.target;
        const value = target.value;

        const valid = validate(
            required(value)
        );

        const toSubmit = canSubmit(
            this.state.usernameValid,
            valid,
            this.state.confirmValid
        )

        this.setState({
            password: value,
            passwordValid: valid,
            toSubmit
        })
    }

    handleConfirmChange = (event) => {
        const target = event.target;
        const value = target.value;

        const valid = validate(
            required(value),
            confirmPassword(this.state.password, value)
        );

        const toSubmit = canSubmit(
            this.state.usernameValid,
            this.state.passwordValid,
            valid
        )

        this.setState({
            confirm: value,
            confirmValid: valid,
            toSubmit
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        if(!this.state.toSubmit) {
            const usernameValid = validate(required(this.state.username));
            const passwordValid = validate(required(this.state.password));
            const confirmValid = validate(required(this.state.confirm));

            this.setState({ usernameValid, passwordValid, confirmValid })
            return;
        }

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.registerUser(user);
    }

	render() {
		return (
			<div className="page">

                {this.props.loading.active && <Loading message={this.props.loading.message}/>}

                <form className="component component--wide add-recipe-form" onSubmit={this.handleSubmit}>
                    <h2 className="form__header">Zarejestruj się</h2>

                    <div className="form__section">
						<label className="form__label" htmlFor="username">Nazwa użytkownika: </label>
						<input className="form__input" id="username" name="username" type="text" onChange={this.handleUsernameChange} />
                        { 
                            !this.state.usernameValid.isValid && 
                            <span className="form__warning">
                                { this.state.usernameValid.message }
                            </span> 
                        }
                    </div>

                    <div className="form__section">
						<label className="form__label" htmlFor="password">Hasło: </label>
						<input className="form__input" id="password" name="password" type="password" onChange={this.handlePasswordChange}/>
                        { 
                            !this.state.passwordValid.isValid && 
                            <span className="form__warning">
                                { this.state.passwordValid.message }
                            </span> 
                        }
                    </div>

                    <div className="form__section">
						<label className="form__label" htmlFor="repeat">Powtórz hasło: </label>
						<input className="form__input" id="repeat" name="confirm" type="password" onChange={this.handleConfirmChange} />
                        { 
                            !this.state.confirmValid.isValid && 
                            <span className="form__warning">
                                { this.state.confirmValid.message }
                            </span> 
                        }
                    </div>

                    <input 
                        className={this.state.toSubmit ? "form__submit form__submit--success" : "form__submit form__submit--error" }
                        type="submit" value="Zarejestruj się" />

                    {this.props.error.active && <span className="form__error">{this.props.error.message}</span>}

                    <span className="form__direction">Masz już konto? <Link className="form__link" to="/login">Zaloguj się!</Link></span>
                </form>
            </div>
		)
	}
}

const mapStateToProps = state => {
	return {
	  token: state.token,
      loading: state.loading,
      error: state.error
	}
}
  
const mapDispatchToProps = dispatch => ({
	registerUser: user => dispatch(registerUser(user))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(withRouter(RegisterPage))