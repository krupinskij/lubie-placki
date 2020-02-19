import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_ERROR,

    COMMENT, 
    ADD_COMMENT_DELETE
} from '../commentConstants';

export const addComment = (token, recipe_id, text) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/comments/recipe/' + recipe_id , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: text
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status === 401 || resp.status === 403) {
                    throw new Error(resp.message)
                }

                if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(addSuccess());
                return resp;
            })
            .catch(error => {
                dispatch(addError(error.message))
                return undefined;
            })
    }
}

export const deleteAddCommentNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
}

const addRequest = () => {
    return {
        group: COMMENT,
        type: ADD_COMMENT_REQUEST
    }
}

const addSuccess = () => {
    return {
        group: COMMENT,
        type: ADD_COMMENT_SUCCESS,
        payload: {
            success: 'Pomyślnie dodano komentarz'
        }
    };
}

const addError = error => {
    return {
        group: COMMENT,
        type: ADD_COMMENT_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: COMMENT,
        type: ADD_COMMENT_DELETE
    }
}