import {
    ADD_HINTS_REQUEST,
    ADD_HINTS_SUCCESS,
    ADD_HINTS_ERROR,

    ADD_RECIPE, 
    ADD_HINTS_DELETE
} from '../addRecipeConstants';

export const addHints = (token, recipe_id, hints) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/hints', {
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
                dispatch(addError(error.message))
                return undefined;
            })
    }
}

export const deleteAddHintsNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
}

const addRequest = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_HINTS_REQUEST
    }
}

const addSuccess = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_HINTS_SUCCESS,
        payload: {
            success: 'Pomyślnie dodano wskazówki'
        }
    };
}

const addError = error => {
    return {
        group: ADD_RECIPE,
        type: ADD_HINTS_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_HINTS_DELETE
    }
}