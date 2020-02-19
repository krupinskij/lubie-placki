import {
    UPDATE_RECIPE_REQUEST,
    UPDATE_RECIPE_SUCCESS,
    UPDATE_RECIPE_ERROR,
    
    UPDATE_RECIPE, 
    UPDATE_RECIPE_DELETE
} from '../updateRecipeConstants';

export const updateRecipe = (token, recipe_id, recipe) => {
    return dispatch => {
        dispatch(updateRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token
            },
            body: JSON.stringify(recipe)
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

export const deleteUpdateRecipeNotification = () => {
    return dispatch => {
        dispatch(deleteNotification());
    }
  }

const updateRequest = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_RECIPE_REQUEST
    }
}

const updateSuccess = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_RECIPE_SUCCESS,
        payload: {
            success: 'Pomyślnie edytowano przepis'
        }
    };
}

const updateError = error => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_RECIPE_ERROR,
        payload: {
            error
        }
    }
}

const deleteNotification = () => {
    return {
        group: UPDATE_RECIPE,
        type: UPDATE_RECIPE_DELETE
    }
  }