import {
    EDIT_REQUEST,
    EDIT_SUCCESS,
    EDIT_ERROR,
    
    USER, 
    EDIT_DELETE
} from '../userConstants';

export const editUser = (token, id, username) => {
    return dispatch => {
        dispatch(editRequest())
        return fetch('http://localhost:3004/users/' + id + '/username', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: username
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status===401 || resp.status === 403) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(editSuccess(resp));
                return resp;
            })
            .catch(error => {
                dispatch(editError(error.message))
                return undefined;
            })
    }
}

export const deleteEditUserNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
  }

const editRequest = () => {
    return {
        group: USER,
        type: EDIT_REQUEST
    }
}

const editSuccess = user => {
    return {
        group: USER,
        type: EDIT_SUCCESS,
        payload: {
            user,
            success: 'Pomyślnie edytowano użytkownika'
        }
    };
}

const editError = error => {
    return {
        group: USER,
        type: EDIT_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: USER,
        type: EDIT_DELETE
    }
  }