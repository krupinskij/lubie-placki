import {
    UPDATE_HINTS_REQUEST,
    UPDATE_HINTS_SUCCESS,
    UPDATE_HINTS_ERROR
} from '../constants/updateHintsConstants';

export const updateHints = (recipe_id, hints) => {
    return dispatch => {
        dispatch(updateRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/hints', {
            method: 'PUT',
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

                dispatch(updateSuccess(resp));
            })
            .catch(error => {
                dispatch(updateError(error.message))
            })
    }
}

const updateRequest = () => {
    return {
        type: UPDATE_HINTS_REQUEST
    }
}

const updateSuccess = () => {
    return {
        type: UPDATE_HINTS_SUCCESS
    };
}

const updateError = error => {
    return {
        type: UPDATE_HINTS_ERROR,
        payload: {
            error
        }
    }
}