import {
    UPDATE_DIRECTIONS_REQUEST,
    UPDATE_DIRECTIONS_SUCCESS,
    UPDATE_DIRECTIONS_ERROR,

    UPDATE_RECIPE, 
    UPDATE_DIRECTIONS_DELETE
} from '../updateRecipeConstants';

export const updateDirections = (token, recipe_id, directions) => {
    return dispatch => {
        dispatch(updateRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/directions', {
            method: 'PUT',
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

                dispatch(updateSuccess(resp));
                return resp;
            })
            .catch(error => {
                dispatch(updateError(error.message));
                return undefined;
            })
    }
}

export const deleteUpdateDirectionsNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
  }

const updateRequest = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_DIRECTIONS_REQUEST
    }
}

const updateSuccess = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_DIRECTIONS_SUCCESS,
        payload: {
            success: 'Pomyślnie edytowano sposób wykonania'
        }
    };
}

const updateError = error => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_DIRECTIONS_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_DIRECTIONS_DELETE
    }
  }