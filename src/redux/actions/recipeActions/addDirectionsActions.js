import {
    ADD_DIRECTIONS_REQUEST,
    ADD_DIRECTIONS_SUCCESS,
    ADD_DIRECTIONS_ERROR
} from '../../constants/recipeConstants';

export const addDirections = (recipe_id, directions) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/directions', {
            method: 'POST',
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

                dispatch(addSuccess(resp));
            })
            .catch(error => {
                dispatch(addError(error.message))
            })
    }
}

const addRequest = () => {
    return {
        type: ADD_DIRECTIONS_REQUEST
    }
}

const addSuccess = () => {
    return {
        type: ADD_DIRECTIONS_SUCCESS
    };
}

const addError = error => {
    return {
        type: ADD_DIRECTIONS_ERROR,
        payload: {
            error
        }
    }
}