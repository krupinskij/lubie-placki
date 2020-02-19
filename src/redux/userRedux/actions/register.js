import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    
    USER, 
    REGISTER_DELETE
} from '../userConstants';

import history from '../../../helpers/history';

export const registerUser = (user) => {
    return dispatch => {
        dispatch(registerRequest())
        return fetch('http://localhost:3004/users/register', {
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
                else if (resp.status && resp.status !== 200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(registerSuccess(resp));
                localStorage.setItem('user', JSON.stringify(resp));

                history.push('/');
                return resp;
            })
            .catch(error => {
                dispatch(registerError(error.message))
                return undefined;
            })
    }
}

export const deleteRegisterUserNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
  }

const registerRequest = () => {
    return {
        group: USER,
        type: REGISTER_REQUEST
    }
}

const registerSuccess = user => {
    return {
        group: USER,
        type: REGISTER_SUCCESS,
        payload: {
            user,
            success: 'Pomyślnie zarejestrowano użytkownika'
        }
    };
}

const registerError = error => {
    return {
        group: USER,
        type: REGISTER_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: USER,
        type: REGISTER_DELETE
    }
  }