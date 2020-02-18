import {
    ADD_INGREDIENTS_REQUEST,
    ADD_INGREDIENTS_SUCCESS,
    ADD_INGREDIENTS_ERROR,

    ADD_RECIPE 
} from '../addRecipeConstants';

export const addIngredients = (token, recipe_id, hints) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: JSON.stringify(hints)
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
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
        group: ADD_RECIPE,
        type: ADD_INGREDIENTS_REQUEST
    }
}

const addSuccess = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_INGREDIENTS_SUCCESS
    };
}

const addError = error => {
    return {
        group: ADD_RECIPE,
        type: ADD_INGREDIENTS_ERROR,
        payload: {
            error
        }
    }
}