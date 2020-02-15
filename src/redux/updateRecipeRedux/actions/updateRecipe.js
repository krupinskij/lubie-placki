import {
    UPDATE_RECIPE_REQUEST,
    UPDATE_RECIPE_SUCCESS,
    UPDATE_RECIPE_ERROR
} from '../constants/updateRecipeConstants';

export const updateRecipe = (token, recipe_id, recipe) => {
    return dispatch => {
        dispatch(updateRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: JSON.stringify(recipe)
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status && resp.status!==200) {
                    throw new Error("Wystąpił nieznany błąd!");
                }

                dispatch(updateSuccess(resp));
            })
            .catch(error => {
                dispatch(updateError(error.message))
            })
    }
}

const updateRequest = () => {
    return {
        type: UPDATE_RECIPE_REQUEST
    }
}

const updateSuccess = () => {
    return {
        type: UPDATE_RECIPE_SUCCESS
    };
}

const updateError = error => {
    return {
        type: UPDATE_RECIPE_ERROR,
        payload: {
            error
        }
    }
}