import {
    UPDATE_RECIPE_REQUEST,
    UPDATE_RECIPE_SUCCESS,
    UPDATE_RECIPE_ERROR,
    
    UPDATE_RECIPE 
} from '../updateRecipeConstants';

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
        class: UPDATE_RECIPE,
        type: UPDATE_RECIPE_REQUEST
    }
}

const updateSuccess = () => {
    return {
        class: UPDATE_RECIPE,
        type: UPDATE_RECIPE_SUCCESS
    };
}

const updateError = error => {
    return {
        class: UPDATE_RECIPE,
        type: UPDATE_RECIPE_ERROR,
        payload: {
            error
        }
    }
}