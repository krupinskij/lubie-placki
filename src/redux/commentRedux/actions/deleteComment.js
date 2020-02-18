import {
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_ERROR,

    COMMENT 
} from '../commentConstants';

export const deleteComment = (token, comment_id) => {
    return dispatch => {
        dispatch(deleteRequest())
        return fetch('http://localhost:3004/comments/' + comment_id , {
            method: 'DELETE',
            headers: {
                'securityTokenValue': token
            }
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status === 401 || resp.status === 403) {
                    throw new Error(resp.message)
                }

                if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(deleteSuccess());
            })
            .catch(error => {
                dispatch(deleteError(error.message))
            })
    }
}

const deleteRequest = () => {
    return {
        group: COMMENT,
        type: DELETE_COMMENT_REQUEST
    }
}

const deleteSuccess = () => {
    return {
        group: COMMENT,
        type: DELETE_COMMENT_SUCCESS
    };
}

const deleteError = error => {
    return {
        group: COMMENT,
        type: DELETE_COMMENT_ERROR,
        payload: {
            error
        }
    }
}