import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    
    USER, 
    LOGOUT_DELETE
} from '../userConstants';

import history from '../../../helpers/history'

export const logoutUser = token => {
    return dispatch => {
        dispatch(logoutRequest())
        return fetch('http://localhost:3004/users/logout', {
            method: 'POST',
            headers: {
                'securityTokenValue': token,
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.text())
            .then(resp => {
                
                if(resp.status===401 || resp.status === 403) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(logoutSuccess());
                localStorage.removeItem('lubie-placki-token');

                history.push('/');
                return resp;
            })
            .catch(error => {
                dispatch(logoutError(error.message))
                return undefined;
            })
    }
}

export const deleteLogoutUserNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
  }

const logoutRequest = () => {
    return {
        group: USER,
        type: LOGOUT_REQUEST
    }
}

const logoutSuccess = () => {
    return {
        group: USER,
        type: LOGOUT_SUCCESS,
        payload: {
            success: 'Pomyślnie wylogowano'
        }
    };
}

const logoutError = error => {
    return {
        group: USER,
        type: LOGOUT_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: USER,
        type: LOGOUT_DELETE
    }
  }