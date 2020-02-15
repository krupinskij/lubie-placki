import {
    ADD_TAGS_REQUEST,
    ADD_TAGS_SUCCESS,
    ADD_TAGS_ERROR
} from '../constants/addTagsConstants';

export const addTags = (token, recipe_id, tags) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: tags
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status && resp.status!==200) {
                    throw new Error("Wystąpił nieznany błąd!");
                }

                dispatch(addSuccess(resp));
            })
            .catch(error => {
                dispatch(addError(error.message))
            })
    }
}

const addRequest = () => {
    return {
        type: ADD_TAGS_REQUEST
    }
}

const addSuccess = () => {
    return {
        type: ADD_TAGS_SUCCESS
    };
}

const addError = error => {
    return {
        type: ADD_TAGS_ERROR,
        payload: {
            error
        }
    }
}