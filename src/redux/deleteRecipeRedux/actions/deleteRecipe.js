import {
    DELETE_RECIPE_REQUEST,
    DELETE_RECIPE_SUCCESS,
    DELETE_RECIPE_ERROR
} from '../constants/deleteRecipeConstants';
import { DELETE_RECIPE } from '../constants/deleteRecipeGroup';

import history from '../../../helpers/history';

export const deleteRecipe = (token, recipe_id) => {
    return dispatch => {
        dispatch(deleteRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token 
            }
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status===401) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status!==200) {
                    throw new Error("Wystąpił nieznany błąd!");
                }

                dispatch(deleteSuccess());

                history.push("/");
                window.location.reload(false);
            })
            .catch(error => {
                dispatch(deleteError(error.message))
            })
    }
}

const deleteRequest = () => {
    return {
        group: DELETE_RECIPE,
        type: DELETE_RECIPE_REQUEST
    }
}

const deleteSuccess = () => {
    return {
        group: DELETE_RECIPE,
        type: DELETE_RECIPE_SUCCESS
    }
}

const deleteError = error => {
    return {
        group: DELETE_RECIPE,
        type: DELETE_RECIPE_ERROR,
        payload: {
            error
        }
    }
}