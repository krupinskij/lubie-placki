import {
    ADD_INGREDIENTS_REQUEST,
    ADD_INGREDIENTS_SUCCESS,
    ADD_INGREDIENTS_ERROR,

    ADD_RECIPE, 
    ADD_INGREDIENTS_DELETE
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
                dispatch(addError(error.message));
                return undefined;
            })
    }
}

export const deleteAddIngredientsNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
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
        type: ADD_INGREDIENTS_SUCCESS,
        payload: {
            success: 'Pomyślnie dodano składniki'
        }
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

const deleteNotification = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_INGREDIENTS_DELETE
    }
}