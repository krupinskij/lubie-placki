import {
    DELETE_RECIPE_REQUEST,
    DELETE_RECIPE_SUCCESS,
    DELETE_RECIPE_ERROR,

    DELETE_RECIPE, 
    DELETE_RECIPE_DELETE
} from '../deleteRecipeConstants';

export const deleteRecipe = (token, recipe_id) => {
    return dispatch => {
        dispatch(deleteRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token 
            }
        })
        .then(resp => resp.json())
        .then(resp => {

                if(resp.status === 401 || resp.status === 403) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status !== 200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(deleteSuccess());
                return resp;
            })
            .catch(error => {
                dispatch(deleteError(error.message))
                return undefined;
            })
    }
}

export const deleteDeleteRecipeNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
}

const deleteRequest = () => {
    return {
        group: DELETE_RECIPE,
        type: DELETE_RECIPE_REQUEST
    }
}

const deleteSuccess = () => {
    return {
        group: DELETE_RECIPE,
        type: DELETE_RECIPE_SUCCESS,
        payload: {
            success: 'Pomyślnie usunięto przepis'
        }
    }
}

const deleteError = error => {
    return {
        group: DELETE_RECIPE,
        type: DELETE_RECIPE_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: DELETE_RECIPE,
        type: DELETE_RECIPE_DELETE
    }
}