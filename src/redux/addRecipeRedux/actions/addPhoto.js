import {
    ADD_PHOTO_REQUEST,
    ADD_PHOTO_SUCCESS,
    ADD_PHOTO_ERROR
} from '../constants/addPhotoConstants';
import { ADD_RECIPE } from '../constants/addRecipeGroup';

export const addPhoto = (token, recipe_id, photo) => {
    return dispatch => {
        dispatch(addRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'image/jpeg',
                'securityTokenValue': token
            },
            body: photo
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
        class: ADD_RECIPE,
        type: ADD_PHOTO_REQUEST
    }
}

const addSuccess = () => {
    return {
        class: ADD_RECIPE,
        type: ADD_PHOTO_SUCCESS
    };
}

const addError = error => {
    return {
        class: ADD_RECIPE,
        type: ADD_PHOTO_ERROR,
        payload: {
            error
        }
    }
}