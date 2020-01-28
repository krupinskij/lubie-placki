import {
    EDIT_AVATAR_REQUEST,
    EDIT_AVATAR_SUCCESS,
    EDIT_AVATAR_ERROR
} from '../constants/userConstants';

export const editAvatar = (id, avatar) => {
    return dispatch => {
        dispatch(editRequest())
        return fetch("http://localhost:3004/users/" + id + "/avatar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: avatar
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status===401) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status!==200) {
                    throw new Error("Wystąpił nieznany błąd!");
                }

                dispatch(editSuccess());
            })
            .catch(error => {
                dispatch(editError(error.message))
            })
    }
}

const editRequest = () => {
    return {
        type: EDIT_AVATAR_REQUEST
    }
}

const editSuccess = () => {
    return {
        type: EDIT_AVATAR_SUCCESS
    };
}

const editError = error => {
    return {
        type: EDIT_AVATAR_ERROR,
        payload: {
            error
        }
    }
}