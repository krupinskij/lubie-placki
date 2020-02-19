import {
    EDIT_AVATAR_REQUEST,
    EDIT_AVATAR_SUCCESS,
    EDIT_AVATAR_ERROR,
    
    USER, 
    EDIT_AVATAR_DELETE
} from '../userConstants';

export const editAvatar = (token, id, avatar) => {
    return dispatch => {
        dispatch(editRequest())
        return fetch('http://localhost:3004/users/' + id + '/avatar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: avatar
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status===401 || resp.status === 403) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(editSuccess());
                return resp;
            })
            .catch(error => {
                dispatch(editError(error.message))
                return undefined;
            })
    }
}

export const deleteEditAvatarNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
  }

const editRequest = () => {
    return {
        group: USER,
        type: EDIT_AVATAR_REQUEST
    }
}

const editSuccess = () => {
    return {
        group: USER,
        type: EDIT_AVATAR_SUCCESS,
        payload: {
            success: 'Pomyślnie edytowano zdjęcie użytkownika'
        }
    };
}

const editError = error => {
    return {
        group: USER,
        type: EDIT_AVATAR_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: USER,
        type: EDIT_AVATAR_DELETE
    }
  }