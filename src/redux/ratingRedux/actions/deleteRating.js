import {
    DELETE_RATING_REQUEST,
    DELETE_RATING_SUCCESS,
    DELETE_RATING_ERROR,

    RATING
} from '../ratingConstants';

export const deleteRating = (token, recipe_id) => {
    return dispatch => {
        dispatch(deleteRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/rating', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token 
            }
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status===401 || resp.status===403) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
                }

                dispatch(deleteSuccess());
                return 1;
            })
            .catch(error => {
                dispatch(deleteError(error.message))
                return -1;
            })
    }
}

const deleteRequest = () => {
    return {
        group: RATING,
        type: DELETE_RATING_REQUEST
    }
}

const deleteSuccess = () => {
    return {
        group: RATING,
        type: DELETE_RATING_SUCCESS
    }
}

const deleteError = error => {
    return {
        group: RATING,
        type: DELETE_RATING_ERROR,
        payload: {
            error
        }
    }
}