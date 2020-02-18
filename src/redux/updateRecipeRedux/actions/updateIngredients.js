import {
    UPDATE_INGREDIENTS_REQUEST,
    UPDATE_INGREDIENTS_SUCCESS,
    UPDATE_INGREDIENTS_ERROR,

    UPDATE_RECIPE 
} from '../updateRecipeConstants';

export const updateIngredients = (token, recipe_id, ingredients) => {
    return dispatch => {
        dispatch(updateRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/ingredients', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: JSON.stringify(ingredients)
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
        group: UPDATE_RECIPE,
        type: UPDATE_INGREDIENTS_REQUEST
    }
}

const updateSuccess = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_INGREDIENTS_SUCCESS
    };
}

const updateError = error => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_INGREDIENTS_ERROR,
        payload: {
            error
        }
    }
}