import {
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_ERROR,

    COMMENT 
} from '../commentConstants';

export const updateComment = (token, comment_id, text) => {
    return dispatch => {
        dispatch(updateRequest())
        return fetch('http://localhost:3004/comments/' + comment_id , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: text
        })
            .then(resp => resp.text())
            .then(resp => {

                if(resp.status === 401 || resp.status === 403) {
                    throw new Error(resp.message)
                }

                if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(updateSuccess());
            })
            .catch(error => {
                dispatch(updateError(error.message))
            })
    }
}

const updateRequest = () => {
    return {
        class: COMMENT,
        type: UPDATE_COMMENT_REQUEST
    }
}

const updateSuccess = () => {
    return {
        class: COMMENT,
        type: UPDATE_COMMENT_SUCCESS
    };
}

const updateError = error => {
    return {
        class: COMMENT,
        type: UPDATE_COMMENT_ERROR,
        payload: {
            error
        }
    }
}