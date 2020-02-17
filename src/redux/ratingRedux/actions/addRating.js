import {
    ADD_RATING_REQUEST,
    ADD_RATING_SUCCESS,
    ADD_RATING_ERROR
} from '../constants/addRatingConstants';
import { RATING } from '../constants/ratingGroup';

export const addRating = (token, recipe_id, rating) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'securityTokenValue': token 
            },
            body: rating
        })
            .then(resp => resp.json())
            .then(resp => {

                if(resp.status===401 || resp.status===403) {
                    throw new Error(resp.message)
                }
                else if(resp.status && resp.status!==200) {
                    throw new Error("Wystąpił nieznany błąd!");
                }

                dispatch(addSuccess());
                return resp.id;
            })
            .catch(error => {
                dispatch(addError(error.message))
                return -1;
            })
    }
}

const addRequest = () => {
    return {
        group: RATING,
        type: ADD_RATING_REQUEST
    }
}

const addSuccess = () => {
    return {
        group: RATING,
        type: ADD_RATING_SUCCESS
    }
}

const addError = error => {
    return {
        group: RATING,
        type: ADD_RATING_ERROR,
        payload: {
            error
        }
    }
}