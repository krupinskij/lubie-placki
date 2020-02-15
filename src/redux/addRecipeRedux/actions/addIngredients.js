import {
    ADD_INGREDIENTS_REQUEST,
    ADD_INGREDIENTS_SUCCESS,
    ADD_INGREDIENTS_ERROR
} from '../constants/addIngredientsConstants';

export const addIngredients = (recipe_id, hints) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hints)
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
        type: ADD_INGREDIENTS_REQUEST
    }
}

const addSuccess = () => {
    return {
        type: ADD_INGREDIENTS_SUCCESS
    };
}

const addError = error => {
    return {
        type: ADD_INGREDIENTS_ERROR,
        payload: {
            error
        }
    }
}