import {
    EDIT_REQUEST,
    EDIT_SUCCESS,
    EDIT_ERROR
} from '../constants/editContants';

export const editUser = (id, username) => {
    return dispatch => {
        dispatch(editRequest())
        return fetch("http://localhost:3004/users/" + id + "/username", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: username
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status===401) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status!==200) {
                    throw new Error("Wystąpił nieznany błąd!");
                }

                dispatch(editSuccess(resp));
                localStorage.setItem('user', JSON.stringify(resp));
            })
            .catch(error => {
                dispatch(editError(error.message))
            })
    }
}

const editRequest = () => {
    return {
        type: EDIT_REQUEST
    }
}

const editSuccess = user => {
    return {
        type: EDIT_SUCCESS,
        payload: {
            user
        }
    };
}

const editError = error => {
    return {
        type: EDIT_ERROR,
        payload: {
            error
        }
    }
}