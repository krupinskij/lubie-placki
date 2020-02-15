import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from '../constants/loginConstants';

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

                if(resp.status===401) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status!==200) {
                    throw new Error("Wystąpił nieznany błąd!");
                }

                dispatch(loginSuccess(resp));
                localStorage.setItem('lubie-placki-token', JSON.stringify(resp));

                history.push("/");
                window.location.reload(false);
            })
            .catch(error => {
                dispatch(loginError(error.message))
            })
    }
}

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const loginSuccess = token => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token
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