import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    
    USER, 
    LOGIN_DELETE
} from '../userConstants';

import history from '../../../helpers/history'

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
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status===401 || resp.status === 403) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(loginSuccess(resp));
                localStorage.setItem('lubie-placki-token', JSON.stringify(resp));

                history.push('/');
                return resp;
            })
            .catch(error => {
                dispatch(loginError(error.message))
                return undefined;
            })
    }
}

export const deleteLoginUserNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
  }

const loginRequest = () => {
    return {
        group: USER,
        type: LOGIN_REQUEST
    }
}

const loginSuccess = token => {
    return {
        group: USER,
        type: LOGIN_SUCCESS,
        payload: {
            token,
            success: 'Pomyślnie zalogowano użytkownika'
        }
    };
}

const loginError = error => {
    return {
        group: USER,
        type: LOGIN_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: USER,
        type: LOGIN_DELETE
    }
  }