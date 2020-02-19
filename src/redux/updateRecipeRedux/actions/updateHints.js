import {
    UPDATE_HINTS_REQUEST,
    UPDATE_HINTS_SUCCESS,
    UPDATE_HINTS_ERROR,

    UPDATE_RECIPE, 
    UPDATE_HINTS_DELETE
} from '../updateRecipeConstants';

export const updateHints = (token, recipe_id, hints) => {
    return dispatch => {
        dispatch(updateRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/hints', {
            method: 'PUT',
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

                dispatch(updateSuccess(resp));
                return resp;
            })
            .catch(error => {
                dispatch(updateError(error.message));
                return undefined;
            })
    }
}

export const deleteUpdateHintsNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
  }

const updateRequest = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_HINTS_REQUEST
    }
}

const updateSuccess = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_HINTS_SUCCESS,
        payload: {
            success: 'Pomyślnie edytowano wskazówki'
        }
    };
}

const updateError = error => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_HINTS_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_HINTS_DELETE
    }
  }