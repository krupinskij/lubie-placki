import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import history from '../../helpers/history'

import { editUser } from '../../redux/userRedux/actions/edit'
import { editAvatar } from '../../redux/userRedux/actions/editAvatar'

import {
    required
} from '../../validation/requirements';
import { validate, canSubmit } from '../../validation/validator';

class EditUserPage extends React.Component {

    state = {
        username: "",
        usernameValid: {
            isValid: false,
            message: ""
        },

        photo: "",

        toSubmit: true
    }

    componentDidMount = () => {
        if(this.props.user===null) this.props.history.push("/");
        
        const id = this.props.match.params.id;

        if(this.props.user.id != id) this.props.history.push("/");

        fetch("http://localhost:3004/users/" + id)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    username: resp.username
                })
            })
    }

    handleUsernameChange = event => {
        const target = event.target;
        const value = target.value;

        const valid = validate(
            required(value)
        );

        const toSubmit = canSubmit(
            valid
        )

        this.setState({
            username: value,
            usernameValid: valid,
            toSubmit
        })
    }

    handlePhotoChange = event => {
        const target = event.target;
        const value = target.files[0];

        const toSubmit = canSubmit(
            this.state.usernameValid
        )

        this.setState({
            photo: value,
            toSubmit
        })
    }

    handlePhotoDelete = event => {

        const toSubmit = canSubmit(
            this.state.usernameValid
        )

        this.setState({
            photo: "",
            toSubmit
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const username = this.state.username;
        const avatar = this.state.photo;

        if(avatar==="") {
            Promise.all([
                this.props.editUser(this.props.user.id, username)
            ])
                .then(() => {
                    history.push("/");
                    window.location.reload(false);
                });
        } else {
            Promise.all([
                this.props.editUser(this.props.user.id, username), 
                this.props.editAvatar(this.props.user.id, avatar)
            ])
                .then(() => {
                    history.push("/");
                    window.location.reload(false);
                });
        }

        
    }

    render() {
        return (
            <div className="page">
                <form className="component component--wide" onSubmit={this.handleSubmit}>

                    <h2 className="form__header">Edytuj dane: </h2>

                    <div className="form__section">
                        <label className="form__label" htmlFor="username">Nazwa użytkownika</label>
                        <input className="form__input" id="username" name="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                    </div>

                    <hr className="form__separator" />

                    <div className="form__section">
                        <label className="form__label" htmlFor="photo">Zdjęcie ciasta: </label>
                        {
                            this.state.photo === "" ?
                                <label className="form__button" htmlFor="photo">Dodaj zdjęcie
								<input className="form__file" id="photo" name="photo" type="file" onChange={this.handlePhotoChange} />
                                </label> :
                                <div className="form__image">
                                    <img className="form__image-sample" src={URL.createObjectURL(this.state.photo)} alt="sample" />
                                    <button className="form__image-delete" onClick={this.handlePhotoDelete}>X</button>
                                </div>
                        }
                    </div>

                    <input
                        className={this.state.toSubmit ? "form__submit form__submit--success" : "form__submit form__submit--error"}
                        type="submit" value="Dodaj" />
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
    editUser: (id, user) => dispatch(editUser(id, user)),
    editAvatar: (id, avatar) => dispatch(editAvatar(id, avatar))
  })

export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(withRouter(EditUserPage))