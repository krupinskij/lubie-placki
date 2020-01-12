import {
    USER_LOGGED, 
    USER_LOGGING, 
    USER_LOGGING_ERROR
} from '../constants/loginConstants';

export const loginUser = (user) => {
    return dispatch => {
        dispatch(userLogging())
        return fetch('http://localhost:3004/users/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(user => user.json())
            .then(user => {
                dispatch(userLogged(user));
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch(error => dispatch(userLoggingError(error)))
    }
}

const userLogging = () => {
    return {
        type: USER_LOGGING
    }
}

const userLogged = user => {
    return {
        type: USER_LOGGED,
        payload: {
            user
        }
    };
}

const userLoggingError = error => {
    return {
        type: USER_LOGGING_ERROR,
        payload: {
            error
        }
    }
}