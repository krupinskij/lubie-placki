import {
    ADD_TAGS_REQUEST,
    ADD_TAGS_SUCCESS,
    ADD_TAGS_ERROR,

    ADD_RECIPE, 
    ADD_TAGS_DELETE
} from '../addRecipeConstants';

export const addTags = (token, recipe_id, tags) => {
    return dispatch => {
        dispatch(addRequest())
        console.log(tags);
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'securityTokenValue': token
            },
            body: tags
        })
            .then(resp => {
                console.log(resp);
                return resp.json()
            })
            .then(resp => {

                console.log(resp);

                if(resp.status === 401 || resp.status === 403) {
                    throw new Error(resp.message);
                }

                if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(addSuccess(resp));
                return resp;
            })
            .catch(error => {
                dispatch(addError(error.message))
                return undefined;
            })
    }
}

export const deleteAddTagsNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
}

const addRequest = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_TAGS_REQUEST
    }
}

const addSuccess = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_TAGS_SUCCESS,
        payload: {
            success: 'Pomyślnie dodano słowa kluczowe'
        }
    };
}

const addError = error => {
    return {
        group: ADD_RECIPE,
        type: ADD_TAGS_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_TAGS_DELETE
    }
}