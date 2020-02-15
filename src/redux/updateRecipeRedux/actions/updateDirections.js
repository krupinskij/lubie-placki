import {
    UPDATE_DIRECTIONS_REQUEST,
    UPDATE_DIRECTIONS_SUCCESS,
    UPDATE_DIRECTIONS_ERROR
} from '../constants/updateDirectionsConstants';

export const updateDirections = (recipe_id, directions) => {
    return dispatch => {
        dispatch(updateRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/directions', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(directions)
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
        type: UPDATE_DIRECTIONS_REQUEST
    }
}

const updateSuccess = () => {
    return {
        type: UPDATE_DIRECTIONS_SUCCESS
    };
}

const updateError = error => {
    return {
        type: UPDATE_DIRECTIONS_ERROR,
        payload: {
            error
        }
    }
}