import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loginUser } from '../../redux/actions/loginActions'

class LoginPage extends React.Component {
    state = {
        username: "",
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
            username: this.state.username,
            password: this.state.password
        }
        this.props.loginUser(user);
    }

    render() {

        return (
            <div className="page">
                <form className="component component--wide add-recipe-form" onSubmit={this.handleSubmit}>
                    <h2 className="form__header">Zaloguj się</h2>

                    <div className="form__section">
                        <label className="form__label" htmlFor="username">Nazwa użytkownika: </label>
                        <input className="form__input" id="username" name="username" type="text" onChange={this.changeValue} />
                    </div>

                    <div className="form__section">
                        <label className="form__label" htmlFor="password">Hasło: </label>
                        <input className="form__input" id="password" name="password" type="password" onChange={this.changeValue} />
                    </div>

                    <input className="form__submit" type="submit" value="Zaloguj się" />
                    {
                        <span className="form__error">
                            {this.props.error}
                        </span>
                    }

                    <span className="form__direction">Nie masz jeszcze konta? <Link className="form__link" to="/register">Zarejestruj się!</Link></span>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        user: state.user,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (user) => dispatch(loginUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginPage))
