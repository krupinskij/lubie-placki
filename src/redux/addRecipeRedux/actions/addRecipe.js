import {
    ADD_RECIPE_REQUEST,
    ADD_RECIPE_SUCCESS,
    ADD_RECIPE_ERROR
} from '../constants/addRecipeConstants';

export const addRecipe = (user_id, recipe) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes/' + user_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status && resp.status!==200) {
                    throw new Error("Wystąpił nieznany błąd!");
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
        type: ADD_RECIPE_REQUEST
    }
}

const addSuccess = () => {
    return {
        type: ADD_RECIPE_SUCCESS
    };
}

const addError = error => {
    return {
        type: ADD_RECIPE_ERROR,
        payload: {
            error
        }
    }
}