import {
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_ERROR
} from '../constants/userConstants';

import history from '../../helpers/history'

export const loginUser = (user) => {
    return dispatch => {
        dispatch(loginRequest())
        return fetch('http://localhost:3004/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(user => user.json())
            .then(user => {
                dispatch(loginSuccess(user));
                localStorage.setItem('user', JSON.stringify(user));
                history.push("/");
                window.location.reload(false);
            })
            .catch(error => {
                dispatch(loginError(error))
                alert("Źle");
            })
    }
}

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const loginSuccess = user => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user
        }
    };
}

const loginError = error => {
    return {
        type: LOGIN_ERROR,
        payload: {
            error
        }
    }
}