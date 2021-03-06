import React from 'react';

import ToLogin from '../ToLogin';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { editUser, deleteEditUserNotification } from '../../redux/userRedux/actions/edit'
import { editAvatar, deleteEditAvatarNotification } from '../../redux/userRedux/actions/editAvatar'

import {
    required
} from '../../validation/requirements';
import { validate, canSubmit } from '../../validation/validator';

class EditUserPage extends React.Component {

    state = {
        username: '',
        usernameValid: {
            isValid: true,
            message: ''
        },

        photo: '',

        toSubmit: true
    }

    componentDidMount = () => {
        if(this.props.token === null) this.props.history.push('/');
        
        const id = this.props.match.params.id;

        fetch('http://localhost:3004/users', {
            method: 'GET',
            headers: {
                'securityTokenValue': this.props.token
            }
        })
        .then(resp => resp.json())
        .then(user => {
            if(user.id !== +id) this.props.history.push('/');

            this.setState({
                username: user.username
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
            photo: '',
            toSubmit
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const username = this.state.username;
        const avatar = this.state.photo;

        const token = this.props.token;

        if(avatar === '') {
            this.props.editUser(token, username)
                .then(resp => {
                    setTimeout(this.props.deleteEditUserNotification, 3000);

                    if(resp === undefined) return;

                    window.location.reload(false);
                    this.props.history.push('/');
                });
        } else {
            Promise.all([
                this.props.editUser(token, username), 
                this.props.editAvatar(token, avatar)
            ])
                .then(resp => {
                    setTimeout(this.props.deleteEditUserNotification, 3000);
                    setTimeout(this.props.deleteEditAvatarNotification, 3000);

                    if(resp[0] === undefined || resp[1] === undefined) return;

                    window.location.reload(false);
                    this.props.history.push('/');
                });
        }

        
    }

    render() {
        if (this.props.token == null) return <ToLogin/>
        
        return (
            <div className='page'>
                <form className='component component--wide' onSubmit={this.handleSubmit}>

                    <h2 className='form__header'>Edytuj dane: </h2>

                    <div className='form__section'>
                        <label className='form__label' htmlFor='username'>Nazwa użytkownika</label>
                        <input className='form__input' id='username' name='username' type='text' value={this.state.username} onChange={this.handleUsernameChange} />
                    </div>

                    <hr className='form__separator' />

                    <div className='form__section'>
                        <label className='form__label' htmlFor='photo'>Zdjęcie ciasta: 
                            <label className='form__button form__button--add' htmlFor='photo'>Dodaj zdjęcie
								<input className='form__file' id='photo' name='photo' type='file' onChange={this.handlePhotoChange} />
							</label> 
                        </label>
                        {
                            this.state.photo === '' ?
                                <div className='form__image'>
									<img className='form__image-sample' src={`http://localhost:3004/users/${this.props.match.params.id}/avatar`} alt='sample' />
								</div>
                                :
                                <div className='form__image'>
                                    <img className='form__image-sample' src={URL.createObjectURL(this.state.photo)} alt='sample' />
                                    <button className='form__image-delete' onClick={this.handlePhotoDelete}>X</button>
                                </div>
                        }
                    </div>

                    <input
                        className={this.state.toSubmit ? 'form__submit form__submit--success' : 'form__submit form__submit--error'}
                        type='submit' value='Edytuj' />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
	return {
      token: state.token
	}
  }
  
  const mapDispatchToProps = dispatch => ({
    editUser: (token, user) => dispatch(editUser(token, user)),
    editAvatar: (token, avatar) => dispatch(editAvatar(token, avatar)),

    deleteEditUserNotification: () => dispatch(deleteEditUserNotification()),
    deleteEditAvatarNotification: () => dispatch(deleteEditAvatarNotification())
  })

export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(withRouter(EditUserPage))