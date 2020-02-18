import {
    UPDATE_PHOTO_REQUEST,
    UPDATE_PHOTO_SUCCESS,
    UPDATE_PHOTO_ERROR,

    UPDATE_RECIPE 
} from '../updateRecipeConstants';

export const updatePhoto = (token, recipe_id, photo) => {
    return dispatch => {
        dispatch(updateRequest())
        return fetch('http://localhost:3004/recipes/' + recipe_id + '/photo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'image/jpeg',
                'securityTokenValue': token
            },
            body: photo
        })
            .then(resp => resp.json())
            .then(resp => {
                
                if(resp.status && resp.status!==200) {
                    throw new Error('Wystąpił nieznany błąd!');
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
        class: UPDATE_RECIPE,
        type: UPDATE_PHOTO_REQUEST
    }
}

const updateSuccess = () => {
    return {
        class: UPDATE_RECIPE,
        type: UPDATE_PHOTO_SUCCESS
    };
}

const updateError = error => {
    return {
        class: UPDATE_RECIPE,
        type: UPDATE_PHOTO_ERROR,
        payload: {
            error
        }
    }
}