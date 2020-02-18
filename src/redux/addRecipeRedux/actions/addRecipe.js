import {
    ADD_RECIPE_REQUEST,
    ADD_RECIPE_SUCCESS,
    ADD_RECIPE_ERROR,

    ADD_RECIPE 
} from '../addRecipeConstants';

export const addRecipe = (token, recipe) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: JSON.stringify(recipe)
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(addSuccess(resp));
                return resp.id;
            })
            .catch(error => {
                dispatch(addError(error.message));
                return -1;
            })
    }
}

const addRequest = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_RECIPE_REQUEST
    }
}

const addSuccess = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_RECIPE_SUCCESS
    };
}

const addError = error => {
    return {
        group: ADD_RECIPE,
        type: ADD_RECIPE_ERROR,
        payload: {
            error
        }
    }
}