import { 
    ADD_DIRECTIONS_REQUEST, 
    ADD_DIRECTIONS_SUCCESS, 
    ADD_DIRECTIONS_ERROR, 

    ADD_RECIPE,
    ADD_DIRECTIONS_DELETE
} from '../addRecipeConstants';

export const addDirections = (token, recipe_id, directions) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/directions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: JSON.stringify(directions)
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

export const deleteAddDirectionsNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
}

const addRequest = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_DIRECTIONS_REQUEST
    }
}

const addSuccess = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_DIRECTIONS_SUCCESS,
        payload: {
            success: 'Pomyślnie dodano sposób wykonania'
        }
    };
}

const addError = error => {
    return {
        group: ADD_RECIPE,
        type: ADD_DIRECTIONS_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: ADD_RECIPE,
        type: ADD_DIRECTIONS_DELETE
    }
}