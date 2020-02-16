import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_ERROR,
} from '../constants/addCommentConstants'

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
                    throw new Error("Wystąpił nieznany błąd!");
                }

                dispatch(addSuccess());
            })
            .catch(error => {
                dispatch(addError(error.message))
            })
    }
}

const addRequest = () => {
    return {
        type: ADD_COMMENT_REQUEST
    }
}

const addSuccess = () => {
    return {
        type: ADD_COMMENT_SUCCESS
    };
}

const addError = error => {
    return {
        type: ADD_COMMENT_ERROR,
        payload: {
            error
        }
    }
}