import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from '../../constants/userConstants';

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

                if (resp.status === 401) {
                    throw new Error(resp.message)
                }
                else if (resp.status && resp.status !== 200) {
                    throw new Error("Wystąpił nieznany błąd!");
                }

                dispatch(registerSuccess(resp));
                localStorage.setItem('user', JSON.stringify(resp));

                history.push("/");
                window.location.reload(false);


            })
            .catch(error => {
                dispatch(registerError(error.message))
            })
    }
}

const registerRequest = () => {
    return {
        type: REGISTER_REQUEST
    }
}

const registerSuccess = user => {
    return {
        type: REGISTER_SUCCESS,
        payload: {
            user
        }
    };
}

const registerError = error => {
    return {
        type: REGISTER_ERROR,
        payload: {
            error
        }
    }
}