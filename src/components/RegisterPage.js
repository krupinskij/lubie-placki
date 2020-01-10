import React from 'react';
import { Link } from 'react-router-dom';

class RegisterPage extends React.Component {
	state = {
        login: "",
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

        const obj = {
            login: this.state.login,
            password: this.state.password,
            repeat: this.state.repeat
        }

        console.log(obj)
    }

	render() {
		return (
			<div className="page">
                <form className="form add-recipe-form" onSubmit={this.handleSubmit}>
                    <h2 className="form__header">Zarejestruj się</h2>

                    <div className="form__section">
						<label className="form__label" htmlFor="login">Login: </label>
						<input className="form__input" id="login" name="login" type="login" onChange={this.changeValue} />
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

export default RegisterPage;