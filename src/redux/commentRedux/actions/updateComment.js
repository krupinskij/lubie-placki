import {
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_ERROR,

    COMMENT, 
    UPDATE_COMMENT_DELETE
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
                return resp;
            })
            .catch(error => {
                dispatch(updateError(error.message))
                return undefined;
            })
    }
}

export const deleteUpdateCommentNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
}

const updateRequest = () => {
    return {
        group: COMMENT,
        type: UPDATE_COMMENT_REQUEST
    }
}

const updateSuccess = () => {
    return {
        group: COMMENT,
        type: UPDATE_COMMENT_SUCCESS,
        payload: {
            success: 'Pomyślnie edytowano komentarz'
        }
    };
}

const updateError = error => {
    return {
        group: COMMENT,
        type: UPDATE_COMMENT_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: COMMENT,
        type: UPDATE_COMMENT_DELETE
    }
}