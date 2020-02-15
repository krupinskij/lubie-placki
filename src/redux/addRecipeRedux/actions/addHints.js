import {
    ADD_HINTS_REQUEST,
    ADD_HINTS_SUCCESS,
    ADD_HINTS_ERROR
} from '../constants/addHintsConstants';

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
        type: ADD_HINTS_REQUEST
    }
}

const addSuccess = () => {
    return {
        type: ADD_HINTS_SUCCESS
    };
}

const addError = error => {
    return {
        type: ADD_HINTS_ERROR,
        payload: {
            error
        }
    }
}